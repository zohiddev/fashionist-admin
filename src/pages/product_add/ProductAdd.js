import React, { useState } from "react";
import {
    PageHeader,
    Tabs,
    Button,
    Input,
    Form,
    InputNumber,
    Switch,
    Upload,
    Modal,
    Cascader,
    Select,
    Row,
    Col,
    message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { usePostRequest, useLoad, usePutRequest } from "./../../hooks/request";
import {
    UPLOAD_MULTIPLE,
    DELETE_SINGLE,
    CATEGORIES_LIST,
    BRANDS_LIST,
    OPTIONS_LIST,
    PRODUCT_ADD,
    PRODUCT_UPDATE,
    PRODUCT_IN_ID,
} from "./../../utils/urls";
import { imageUpload, postData, slugify } from "./../../utils/helpers";
import { productAddedElementsName } from "../../utils/data";
import { useLocation, useHistory } from "react-router-dom";
import { useEffect } from "react";
import FullPageLoader from "../../utils/FullPageLoader";
import { $authHost } from "../../http";

const { TabPane } = Tabs;
const { Option } = Select;
const initialData = {
    isNew: true,
    id: null,
    name_uz: "",
    name_ru: "",
    slug: "",
    price: 0,
    previous_price: 0,
    discount: 0,
    quantity: 0,
    description_uz: "",
    description_ru: "",
    is_recommended: 0,
    is_discounted: 0,
    images: "",
    parent_category: null,
    middle_category: null,
    child_category: null,
    attributes: "[]",
    category_id: null,
    brand_id: null,
};
const imageStateInitialData = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
};

const attributesInitalState = {
    selectedAttributesID: [],
    selectedAttributesValueID: [],
    selectedAttributes: [],
    postAttributeValues: [],
};

const ProductAdd = () => {
    const [productData, setProductData] = useState(initialData);
    const [oldPriceActive, setOldPriceActive] = useState(true);
    const [imageState, setImageState] = useState(imageStateInitialData);
    const [attributeState, setAttributeState] = useState(attributesInitalState);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const history = useHistory();

    const addImageRequest = usePostRequest({ url: UPLOAD_MULTIPLE });
    const deleteImageRequest = usePostRequest({ url: DELETE_SINGLE });
    const categoriesListRequest = useLoad({ url: CATEGORIES_LIST });
    const brandListRequest = useLoad({ url: BRANDS_LIST });
    const attributesRequest = useLoad({ url: OPTIONS_LIST });
    const productAddRequest = usePostRequest({ url: PRODUCT_ADD });
    const productUpdateRequest = usePutRequest({
        url: PRODUCT_UPDATE.replace("product_id", productData?.id),
    });

    const categories = categoriesListRequest?.response?.categories;
    const brands = brandListRequest?.response?.brands;
    const attributes = attributesRequest?.response?.attributes;

    useEffect(() => {
        if (location?.state?.id !== undefined) {
            setLoading(true);
            $authHost
                .get(PRODUCT_IN_ID.replace("product_id", location?.state?.id))
                .then((response) => {
                    if (response?.data?.product) {
                        let product = response?.data?.product;
                        setProductData({
                            isNew: false,
                            id: product?.id,
                            name_uz: product?.name_ru,
                            name_ru: product?.name_ru,
                            slug: product?.slug,
                            price: product?.price,
                            previous_price: product?.previous_price,
                            discount: product?.discount,
                            quantity: product?.quantity,
                            description_uz: product?.description_uz,
                            description_ru: product?.description_ru,
                            is_recommended: product?.is_recommended,
                            is_discounted: product?.is_discounted,
                            images: product?.images?.join(","),
                            parent_category: null,
                            middle_category: null,
                            child_category: null,
                            attributes: JSON.stringify(product?.attributes),
                            category_id: product?.category?.id,
                            brand_id: product?.brand?.id,
                        });
                        setImageState({
                            ...imageState,
                            fileList: product?.images?.map((item) => {
                                return { url: item };
                            }),
                        });
                        setAttributeState({
                            ...attributeState,
                            selectedAttributesID: product?.attributes?.map(
                                (item) => item?.attribute_id
                            ),
                            selectedAttributesValueID: product?.attributes?.map(
                                (item) => item?.value_id
                            ),
                            postAttributeValues: product?.attributes?.map(
                                (item) => {
                                    return {
                                        attribute_id: item?.attribute_id,
                                        value_id: item?.value_id,
                                    };
                                }
                            ),
                        });
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                });
        }
    }, [location]);

    useEffect(() => {
        setAttributeState({
            ...attributeState,
            selectedAttributes: attributes?.filter((item) =>
                attributeState?.selectedAttributesID?.includes(item.id)
            ),
        });
    }, [loading]);

    function handleChange({ target }) {
        if (target.name === "name_uz") {
            setProductData({
                ...productData,
                [target.name]: target.value,
                slug: slugify(target.value),
            });
        } else {
            setProductData({
                ...productData,
                [target.name]: target.value,
            });
        }
    }

    async function brandSearch(el) {
        brandListRequest.request({ params: { search: el, per_page: 5 } });
    }

    async function uploadImage(file) {
        let { onSuccess } = file;
        const data = new FormData();
        data.append("image", file.file);
        const { success, response } = await imageUpload(file.file);
        if (success) {
            if (response?.url) {
                onSuccess(response);
                let a =
                    productData.images === ""
                        ? []
                        : productData.images.split(",");
                console.log(a);
                setProductData({
                    ...productData,
                    images: [...a, response?.url].join(","),
                });
                // setImageState({...imageState, fileList: [...imageState.fileList,  {url: response?.images[0]}]})
            }
        }
    }

    async function deleteImage(file) {
        console.log(file);
        const { success, response } = await deleteImageRequest.request({
            data: { image: file.url },
        });
        if (success) {
            if (response?.isOk) {
                setProductData({
                    ...productData,
                    images: productData.images
                        .split(",")
                        .filter((el) => el !== file.url)
                        .join(","),
                });
            }
        }
    }

    async function addProduct() {
        const post_data = postData(productData, [
            "isNew",
            "id",
            "parent_category",
            "middle_category",
            "child_category",
        ]);
        for (let item in postData(productData, [
            "previous_price",
            "discount",
            "quantity",
            "is_recommended",
            "is_discounted",
        ])) {
            if (post_data[item] === initialData[item]) {
                return message.warning(
                    `Mahsulot ${productAddedElementsName[item]} kiriting!`
                );
            }
        }

        let { success } = await productAddRequest.request({ data: post_data });
        if (success) {
            setProductData(initialData);
            message.success("Mahsulot muvaffaqiyatli qo`shildi");
            history.push("/products");
        }
    }

    async function updateProduct() {
        const post_data = postData(productData, [
            "isNew",
            "id",
            "parent_category",
            "middle_category",
            "child_category",
        ]);
        for (let item in postData(productData, [
            "previous_price",
            "discount",
            "quantity",
            "is_recommended",
            "is_discounted",
        ])) {
            if (post_data[item] === initialData[item]) {
                return message.warning(
                    `Mahsulot ${productAddedElementsName[item]} kiriting!`
                );
            }
        }

        let { success } = await productUpdateRequest.request({
            data: post_data,
        });
        if (success) {
            setProductData(initialData);
            message.success("Mahsulot muvaffaqiyatli yangilandi");
            history.push("/products");
        }
    }

    async function handlePreview(file) {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setImageState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle:
                file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
        });
    }

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    function handleCancel() {
        setImageState({ previewVisible: false });
    }

    function handleImageChange({ fileList }) {
        setImageState({ fileList });
    }

    function changeCategory(arr) {
        handleChange({ target: { name: "parent_category", value: arr[0] } });
        handleChange({ target: { name: "middle_category", value: arr[1] } });
        handleChange({ target: { name: "child_category", value: arr[2] } });
        handleChange({
            target: { name: "category_id", value: arr[arr.length - 1] },
        });
    }

    function changeAttributesSelect(arr) {
        setAttributeState({
            ...attributeState,
            selectedAttributesID: arr,
            selectedAttributes: attributes.filter((item) =>
                arr.includes(item.id)
            ),
        });
    }

    function changeAttributeValue(e, mode) {
        let a = attributeState.postAttributeValues;
        let b = attributeState.selectedAttributesID;
        let c = attributeState.selectedAttributes;
        if (mode === "delete") {
            a = a.filter((item) => item.attribute_id !== e);
            b = b.filter((item) => item !== e);
            c = attributes.filter((item) => b.includes(item.id));
        } else {
            let b = JSON.parse(e);
            for (const item of a) {
                if (item.attribute_id === b.attribute_id) {
                    a = a.filter(
                        (item) => item.attribute_id !== b.attribute_id
                    );
                }
            }
            a[a.length] = b;
        }

        setAttributeState({
            ...attributeState,
            postAttributeValues: a,
            selectedAttributesID: b,
            selectedAttributes: c,
        });
        handleChange({
            target: { name: "attributes", value: JSON.stringify(a) },
        });
    }

    return (
        <section className='container'>
            <PageHeader
                title='Mahsulot qo`shish'
                extra={[
                    <Button
                        key='2'
                        onClick={() =>
                            productData?.isNew ? addProduct() : updateProduct()
                        }
                    >
                        Saqlash
                    </Button>,
                ]}
            />
            {loading ? (
                <FullPageLoader />
            ) : (
                <Form layout='vertical'>
                    <Tabs tabPosition='left'>
                        <TabPane tab='Nomi va tavsifi' key='1'>
                            <Tabs>
                                <TabPane tab='Uz' key='uz'>
                                    <Form.Item label='Mahsulot nomini kiriting :'>
                                        <Input
                                            value={productData.name_uz}
                                            name='name_uz'
                                            onChange={(e) => handleChange(e)}
                                            placeholder='Mahsulot nomini o`zbekcha kiriting'
                                        />
                                    </Form.Item>

                                    <Form.Item label='Mahsulot tavsifini o`zbekcha kiriting :'>
                                        <ReactQuill
                                            theme='snow'
                                            value={productData.description_uz}
                                            name='description_uz'
                                            onChange={(e) =>
                                                handleChange({
                                                    target: {
                                                        name: "description_uz",
                                                        value: e,
                                                    },
                                                })
                                            }
                                        />
                                    </Form.Item>
                                </TabPane>
                                <TabPane tab='Ru' key='ru'>
                                    <Form.Item label='Mahsulot nomini kiriting :'>
                                        <Input
                                            value={productData.name_ru}
                                            name='name_ru'
                                            onChange={(e) => handleChange(e)}
                                            placeholder='Mahsulot nomini ruscha kiriting'
                                        />
                                    </Form.Item>

                                    <Form.Item label='Mahsulot tavsifini ruscha kiriting :'>
                                        <ReactQuill
                                            theme='snow'
                                            value={productData.description_ru}
                                            name='description_ru'
                                            onChange={(e) =>
                                                handleChange({
                                                    target: {
                                                        name: "description_ru",
                                                        value: e,
                                                    },
                                                })
                                            }
                                        />
                                    </Form.Item>
                                </TabPane>
                            </Tabs>
                        </TabPane>
                        <TabPane tab='Kategoriyasi' key='2'>
                            <Form.Item label='Kategoriyani kiriting :'>
                                <Cascader
                                    placeholder='Kategoriyani tanlang'
                                    options={categories?.map((item) => {
                                        return {
                                            value: item.id,
                                            label: item.name_uz,
                                            children:
                                                item.children &&
                                                item.children.map((subitem) => {
                                                    return {
                                                        value: subitem.id,
                                                        label: subitem.name_uz,
                                                        children:
                                                            subitem.children &&
                                                            subitem.children.map(
                                                                (sublink) => {
                                                                    return {
                                                                        value: sublink.id,
                                                                        label: sublink.name_uz,
                                                                    };
                                                                }
                                                            ),
                                                    };
                                                }),
                                        };
                                    })}
                                    onChange={(e) => changeCategory(e)}
                                    // defaultValue={categoriesDefaultValue}
                                    changeOnSelect
                                />
                            </Form.Item>

                            <Form.Item label='Brandni kiriting :'>
                                <Select
                                    showSearch
                                    placeholder='Brandni tanlang'
                                    defaultValue={productData?.brand_id}
                                    optionFilterProp='children'
                                    onChange={(e) =>
                                        handleChange({
                                            target: {
                                                name: "brand_id",
                                                value: e,
                                            },
                                        })
                                    }
                                    onSearch={(e) => brandSearch(e)}
                                >
                                    {brands?.map((item) => {
                                        return (
                                            <Option
                                                value={item?.id}
                                                key={item?.id}
                                            >
                                                {item?.name_uz}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </TabPane>
                        <TabPane tab='Narxi' key='3'>
                            <Form.Item label='Mahsulot narxini kiriting :'>
                                <InputNumber
                                    value={productData.price}
                                    name='price'
                                    onChange={(e) =>
                                        handleChange({
                                            target: { name: "price", value: e },
                                        })
                                    }
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                            <Form.Item label='Mahsulot sonini kiriting :'>
                                <InputNumber
                                    value={productData.quantity}
                                    name='quantity'
                                    onChange={(e) =>
                                        handleChange({
                                            target: {
                                                name: "quantity",
                                                value: e,
                                            },
                                        })
                                    }
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                            <Form.Item label='Solishtirish uchun narx kiritasizmi ?'>
                                <Switch
                                    checkedChildren='Ha'
                                    unCheckedChildren='Yo`q'
                                    onChange={() => {
                                        setOldPriceActive(!oldPriceActive);
                                    }}
                                />
                            </Form.Item>
                            <Form.Item label='Solishtirish uchun narx kiriting :'>
                                <InputNumber
                                    value={productData.previous_price}
                                    name='previous_price'
                                    onChange={(e) =>
                                        handleChange({
                                            target: {
                                                name: "previous_price",
                                                value: e,
                                            },
                                        })
                                    }
                                    disabled={oldPriceActive}
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </TabPane>
                        <TabPane tab='Rasmi' key='4'>
                            <Upload
                                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                                customRequest={(file) => uploadImage(file)}
                                listType='picture-card'
                                fileList={imageState?.fileList}
                                // fileList={fileList}
                                // onPreview={(e) => handlePreview(e)}
                                onChange={(e) => handleImageChange(e)}
                                onRemove={(e) => deleteImage(e)}
                            >
                                {
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>
                                            Upload
                                        </div>
                                    </div>
                                }
                            </Upload>
                            <Modal
                                visible={imageState.previewVisible}
                                title={imageState.previewTitle}
                                footer={null}
                                onCancel={handleCancel}
                            >
                                <img
                                    alt='example'
                                    style={{ width: "100%" }}
                                    src={imageState.previewImage}
                                />
                            </Modal>
                        </TabPane>
                        <TabPane tab='Attributlari' key='5'>
                            <Form.Item label='Attributni kiriting :'>
                                <Select
                                    showSearch
                                    mode='multiple'
                                    placeholder='Attributni tanlang'
                                    optionFilterProp='children'
                                    onDeselect={(e) =>
                                        changeAttributeValue(e, "delete")
                                    }
                                    defaultValue={
                                        attributeState.selectedAttributesID
                                    }
                                    onChange={(e) => changeAttributesSelect(e)}
                                >
                                    {attributes?.map((item) => {
                                        return (
                                            <Option
                                                value={item?.id}
                                                key={item?.id}
                                            >
                                                {item?.name_uz}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                            <Row gutter={16}>
                                {attributeState?.selectedAttributes?.map(
                                    (item, i) => {
                                        return (
                                            <Col key={item?.id} span={6}>
                                                <Form.Item
                                                    label={item?.name_uz}
                                                >
                                                    <Select
                                                        showSearch
                                                        placeholder='Attributni tanlang'
                                                        defaultValue={JSON.stringify(
                                                            attributeState
                                                                ?.postAttributeValues[
                                                                i
                                                            ]
                                                        )}
                                                        optionFilterProp='children'
                                                        onChange={(e) =>
                                                            changeAttributeValue(
                                                                e,
                                                                "add"
                                                            )
                                                        }
                                                    >
                                                        {item?.attributeValues?.map(
                                                            (value, i) => {
                                                                return (
                                                                    <Option
                                                                        value={JSON.stringify(
                                                                            {
                                                                                attribute_id:
                                                                                    item?.id,
                                                                                value_id:
                                                                                    value?.id,
                                                                            }
                                                                        )}
                                                                        key={
                                                                            value?.id
                                                                        }
                                                                    >
                                                                        {
                                                                            value?.value_uz
                                                                        }
                                                                    </Option>
                                                                );
                                                            }
                                                        )}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        );
                                    }
                                )}
                            </Row>
                        </TabPane>
                    </Tabs>
                </Form>
            )}
        </section>
    );
};

export default ProductAdd;
