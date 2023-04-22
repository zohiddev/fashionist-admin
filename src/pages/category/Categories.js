import React, { useState } from "react";
import {
    useDeleteRequest,
    useLoad,
    usePutRequest,
    usePostRequest,
} from "../../hooks/request";
import FullPageLoader from "./../../utils/FullPageLoader";
import {
    CATEGORIES_LIST,
    CATEGORY_ADD,
    CATEGORY_DELETE,
    CATEGORY_UPDATE,
    UPLOAD_SINGLE,
    DELETE_SINGLE,
} from "./../../utils/urls";
import {
    PageHeader,
    Row,
    Col,
    Collapse,
    Upload,
    Button,
    List,
    Modal,
    Form,
    Input,
    Cascader,
    message,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    UploadOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import { postData, slugify, getParentParentId } from "../../utils/helpers";
import useLanguage from "./../../hooks/useLanguage";
import { useContext } from "react";
import { LanguageContext } from "./../../context/languageContext";
import { useDeleteModal } from "../../hooks/useDeleteModal";

const { Panel } = Collapse;
const { confirm } = Modal;
const initial_data = {
    isNew: true,
    name_uz: "",
    name_ru: "",
    slug: "",
    catImage: "",
    parent_id: "",
};

const Categories = () => {
    const [data, setData] = useState(initial_data);
    const [categoryId, setCategoryID] = useState(null);
    const [modalActive, setModalActive] = useState(false);
    const [categoriesDefaultValue, setCategoriesDefaultValue] = useState([]);

    const translate = useLanguage();
    const { language } = useContext(LanguageContext);

    const categoryList = useLoad({ url: CATEGORIES_LIST });
    const addCategoriesRequest = usePostRequest({ url: CATEGORY_ADD });
    const { showDeleteConfirm } = useDeleteModal();
    // const updateCategoryReq = usePutRequest({url: CATEGORY_UPDATE.replace('category_id', categoryId)})
    const addImageRequest = usePostRequest({ url: UPLOAD_SINGLE });
    const deleteImageRequest = usePostRequest({ url: DELETE_SINGLE });

    const changeName_uz = ({ target }) => {
        setData({
            ...data,
            name_uz: target.value,
            slug: slugify(target.value),
        });
    };
    const changeName_ru = ({ target }) => {
        setData({ ...data, name_ru: target.value });
    };
    const changeParentId = (value) => {
        setData({ ...data, parent_id: value[value.length - 1] });
    };
    const handleClose = () => {
        setModalActive(false);
        setData(initial_data);
        setCategoriesDefaultValue([]);
    };

    async function handleAddCategoryBtn(e) {
        e.preventDefault();
        if (
            data.name_uz !== "" &&
            data.name_ru !== "" &&
            data.parent_id !== ""
        ) {
            let { success } = await addCategoriesRequest.request({
                data: postData(data, ["isNew"]),
            });
            if (success) {
                categoryList.request();
                setData(initial_data);
                setModalActive(false);
                message.success("Kategoriya muvaffaqiyatli qo`shildi");
            }
        } else {
            message.warning("Iltimos maydonni to`ldiring !");
        }
    }

    // async function handleUpdateCategoryBtn(e) {
    // 	e.preventDefault()
    // 	if(data.name_uz !== '' && data.name_ru !== ''){
    // 		let {success} = await updateCategoryReq.request({data:{name_uz: data.name_uz, name_ru: data.name_ru}})
    // 		if(success){
    // 			categoryList.request()
    // 			setData(initial_data)
    // 			setCategoryID(null)
    // 		}
    // 	}else{
    // 		message.warning('Iltimos maydonni to`ldiring !')
    // 	}

    // }

    async function uploadImage(file) {
        let { onSuccess } = file;
        const data = new FormData();
        data.append("image", file.file);
        const { success, response } = await addImageRequest.request({ data });
        if (success) {
            if (response?.isOk) {
                onSuccess(response);
                setData({ ...data, catImage: response?.image_name });
            }
        }
    }

    async function deleteImage(file) {
        const { success, response } = await deleteImageRequest.request({
            image: file.response.image_name,
        });
        if (success) {
            if (response?.isOk) {
                setData({ ...data, catImage: "" });
            }
        }
    }

    function beforeUpload(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const img = document.createElement("img");
                img.src = reader.result;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    ctx.fillStyle = "red";
                    ctx.textBaseline = "middle";
                    ctx.font = "33px Arial";
                    // ctx.fillText('Ant Design', 20, 20)
                    canvas.toBlob(resolve);
                };
            };
        });
    }

    function openUpdateModal(item) {
        setModalActive(true);
        setCategoriesDefaultValue(getParentParentId(categories, item.id));
        setData({
            isNew: false,
            name_uz: item.name_uz,
            name_ru: item.name_ru,
            slug: item.slug,
            catImage: item.image,
            parent_id: item.parent_id,
        });
    }

    function GenExtra({ item }) {
        return (
            <div>
                <Button
                    onClick={(event) => {
                        // event.stopPropagation()
                        openUpdateModal(item);
                    }}
                    style={{
                        marginRight: "10px",
                        display: "inline-flex",
                        alignItems: "center",
                    }}
                >
                    <span>{translate("edit")}</span>
                    <EditOutlined />
                </Button>
                <Button
                    danger
                    onClick={() =>
                        showDeleteConfirm(
                            CATEGORY_DELETE(item?.id),
                            categoryList.request
                        )
                    }
                >
                    <span>{translate("delete")}</span>
                    <DeleteOutlined />
                </Button>
            </div>
        );
    }

    const { loading, response } = categoryList;
    const categories = response && response?.categories;

    return (
        <>
            {loading ? (
                <FullPageLoader />
            ) : (
                <div className='container'>
                    <PageHeader
                        className='site-page-header'
                        title={translate("categorys")}
                        extra={[
                            <Button
                                key='2'
                                onClick={() => setModalActive(true)}
                            >
                                {translate("addCategory")}
                            </Button>,
                        ]}
                    />

                    <Row>
                        <Col span={24}>
                            {categories?.map((item) => {
                                return (
                                    <Collapse
                                        accordion
                                        key={item?.id}
                                        expandIconPosition='right'
                                    >
                                        <Panel
                                            header={item[`name_${language}`]}
                                            key={item?.id}
                                            extra={<GenExtra item={item} />}
                                        >
                                            {item?.children?.map((subItem) => {
                                                return (
                                                    <Collapse
                                                        accordion
                                                        key={subItem?.id}
                                                        expandIconPosition='right'
                                                    >
                                                        <Panel
                                                            header={
                                                                subItem[
                                                                    `name_${language}`
                                                                ]
                                                            }
                                                            key={subItem?.id}
                                                            extra={
                                                                <GenExtra
                                                                    item={
                                                                        subItem
                                                                    }
                                                                />
                                                            }
                                                        >
                                                            <List
                                                                bordered
                                                                dataSource={
                                                                    subItem?.children
                                                                }
                                                                renderItem={(
                                                                    el
                                                                ) => (
                                                                    <List.Item>
                                                                        {
                                                                            <>
                                                                                <p>
                                                                                    {
                                                                                        el[
                                                                                            `name_${language}`
                                                                                        ]
                                                                                    }
                                                                                </p>
                                                                                <GenExtra
                                                                                    item={
                                                                                        el
                                                                                    }
                                                                                />
                                                                            </>
                                                                        }
                                                                    </List.Item>
                                                                )}
                                                            />
                                                        </Panel>
                                                    </Collapse>
                                                );
                                            })}
                                        </Panel>
                                    </Collapse>
                                );
                            })}
                        </Col>
                    </Row>

                    <Modal
                        title={translate("addCategory")}
                        centered
                        visible={modalActive}
                        onOk={(e) => handleAddCategoryBtn(e)}
                        onCancel={() => handleClose()}
                    >
                        <Form
                            wrapperCol={{
                                span: 14,
                            }}
                            layout='vertical'
                        >
                            <Form.Item
                                label={`${translate("categoryNameUz")}:`}
                            >
                                <Input
                                    onChange={changeName_uz}
                                    value={data.name_uz}
                                    placeholder={`${translate(
                                        "categoryNameUz"
                                    )}`}
                                />
                            </Form.Item>
                            <Form.Item
                                label={`${translate("categoryNameRu")}:`}
                            >
                                <Input
                                    onChange={changeName_ru}
                                    value={data.name_ru}
                                    placeholder={`${translate(
                                        "categoryNameRu"
                                    )}`}
                                />
                            </Form.Item>
                            <Form.Item label='Kategoriya rasmini yuklang:'>
                                <Upload
                                    customRequest={(file) => uploadImage(file)}
                                    beforeUpload={(file) => beforeUpload(file)}
                                    listType='picture'
                                    onRemove={(file) => deleteImage(file)}
                                >
                                    <Button icon={<UploadOutlined />}>
                                        Yuklash
                                    </Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item label='Kategoriya joylashuvi'>
                                {categoriesDefaultValue && (
                                    <Cascader
                                        options={categories?.map((item) => {
                                            return {
                                                value: item.id,
                                                label: item[`name_${language}`],
                                                children:
                                                    item.children &&
                                                    item.children.map(
                                                        (subitem) => {
                                                            return {
                                                                value: subitem.id,
                                                                label: subitem[
                                                                    `name_${language}`
                                                                ],
                                                                children:
                                                                    subitem.children &&
                                                                    subitem.children.map(
                                                                        (
                                                                            sublink
                                                                        ) => {
                                                                            return {
                                                                                value: sublink.id,
                                                                                label: sublink[
                                                                                    `name_${language}`
                                                                                ],
                                                                            };
                                                                        }
                                                                    ),
                                                            };
                                                        }
                                                    ),
                                            };
                                        })}
                                        onChange={changeParentId}
                                        defaultValue={categoriesDefaultValue}
                                        changeOnSelect
                                    />
                                )}
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            )}
        </>
    );
};

export default Categories;
