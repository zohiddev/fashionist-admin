import React, { useState } from "react";
import {
    useLoad,
    usePostRequest,
    usePutRequest,
    useDeleteRequest,
} from "../../hooks/request";
import {
    Form,
    Input,
    PageHeader,
    Modal,
    message,
    Button,
    Row,
    Col,
    Upload,
    Card,
    Pagination,
} from "antd";
import ImgCrop from "antd-img-crop";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
    BRANDS_LIST,
    UPLOAD_SINGLE,
    DELETE_SINGLE,
    BRAND_ADD,
    BRAND_UPDATE,
    BRAND_DELETE,
} from "../../utils/urls";
import FullPageLoader from "./../../utils/FullPageLoader";
import { imageUpload, postData } from "../../utils/helpers";
import useLanguage from "./../../hooks/useLanguage";

const { Meta } = Card;

const brandStateInitialValue = {
    isNew: true,
    id: "",
    name_uz: "",
    name_ru: "",
    image: "",
};

const params_initial = {
    page: 1,
    per_page: 12,
};

export default function Brands() {
    const [brandState, setbrandState] = useState(brandStateInitialValue);
    const [params, setParams] = useState(params_initial);
    const [brandModal, setbrandModal] = useState(false);
    const [deleteModal, setdeleteModal] = useState(false);
    const [fileList, setFileList] = useState([]);

    const translate = useLanguage();

    const brandsListRequest = useLoad({ url: BRANDS_LIST, params: params });
    const addBrandRequest = usePostRequest({ url: BRAND_ADD });
    const updateBrandRequest = usePutRequest({
        url: BRAND_UPDATE.replace("brand_id", brandState.id),
    });
    const deleteBrandRequest = useDeleteRequest({
        url: BRAND_DELETE.replace("brand_id", brandState.id),
    });
    const addImageRequest = usePostRequest({ url: UPLOAD_SINGLE });
    const deleteImageRequest = usePostRequest({ url: DELETE_SINGLE });

    const { loading, response } = brandsListRequest;
    const brandList = response && response?.brands;
    const pagination = response && response?.pagination;

    function handleBrandModal() {
        setbrandModal(false);
        setbrandState(brandStateInitialValue);
        setFileList([]);
    }
    function handleDeleteModal() {
        setdeleteModal(false);
        setbrandState(brandStateInitialValue);
    }

    const handleBrandNameUz = ({ target }) => {
        setbrandState({ ...brandState, name_uz: target.value });
    };

    const handleBrandNameRu = ({ target }) => {
        setbrandState({ ...brandState, name_ru: target.value });
    };

    async function handleBrandAddBtn(e) {
        e.preventDefault();
        if (brandState.name_uz === "") {
            message.warning("Brand nomini kiriting");
        } else if (brandState.name_ru === "") {
            message.warning("Brand ruscha nomini kiriting");
        } else {
            let { success } = await addBrandRequest.request({
                data: postData(brandState, ["id", "isNew"]),
            });
            if (success) {
                brandsListRequest.request();
                setbrandState(brandStateInitialValue);
                setbrandModal(false);
                message.success("Brand muvaffaqiyatli qo`shildi");
            }
        }
    }

    async function handleBrandUpdateBtn(e) {
        e.preventDefault();
        if (brandState.name_uz === "") {
            message.warning("Brand nomini kiriting");
        } else if (brandState.name_ru === "") {
            message.warning("Brand ruscha nomini kiriting");
        } else {
            let { success } = await updateBrandRequest.request({
                data: postData(brandState, ["id", "isNew"]),
            });
            if (success) {
                brandsListRequest.request();
                setbrandState(brandStateInitialValue);
                setbrandModal(false);
                message.success("Brand muvaffaqiyatli yangilandi");
            }
        }
    }

    async function handleBrandDeleteBtn() {
        let { success } = await deleteBrandRequest.request({});
        if (success) {
            brandsListRequest.request();
            setbrandState(brandStateInitialValue);
            setdeleteModal(false);
            message.success("Brand muvaffaqiyatli o`chirildi");
        }
    }

    async function uploadImage(file) {
        let { onSuccess } = file;
        const data = new FormData();
        data.append("image", file.file);
        const { success, response } = await imageUpload(file.file);
        if (success) {
            if (response?.url) {
                onSuccess(response);
                setbrandState({ ...brandState, image: response?.url });
            }
        }
    }

    async function deleteImage(file) {
        console.log(file);
        const { success, response } = await deleteImageRequest.request({
            data: { image: file.response.image_name },
        });
        if (success) {
            if (response?.isOk) {
                setbrandState({ ...brandState, image: "" });
            }
        }
    }

    function openEditModal(item) {
        setbrandState({
            isNew: false,
            id: item?.id,
            name_uz: item?.name_uz,
            name_ru: item?.name_ru,
            image: item?.image,
        });
        setFileList([
            ...fileList,
            {
                uid: item?.id,
                name: item?.name_uz,
                status: "done",
                response: { image_name: item?.image },
                url: item?.image,
            },
        ]);
        setbrandModal(true);
    }

    function openDeleteModal(id) {
        setbrandState({ ...brandState, id });
        setdeleteModal(true);
    }

    function onChange({ fileList: newFileList }) {
        setFileList(newFileList);
    }

    function pageTo(page) {
        setParams({
            ...params,
            page,
        });
        brandsListRequest.request({ params });
    }

    async function onPreview(file) {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    }

    return (
        <section className='container'>
            <PageHeader
                title={translate("brands")}
                extra={[
                    <Button key='2' onClick={() => setbrandModal(true)}>
                        {translate("addBrand")}
                    </Button>,
                ]}
            />

            <Modal
                title={translate("deleteBrand")}
                centered
                visible={deleteModal}
                onOk={() => handleBrandDeleteBtn()}
                okText={translate("yes")}
                cancelText={translate("no")}
                okType='danger'
                onCancel={handleDeleteModal}
            ></Modal>

            <Modal
                title={translate("addBrand")}
                centered
                visible={brandModal}
                onOk={(e) =>
                    brandState.isNew
                        ? handleBrandAddBtn(e)
                        : handleBrandUpdateBtn(e)
                }
                onCancel={() => handleBrandModal()}
            >
                <Form
                    name='complex-form'
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                >
                    <Form.Item label={translate("brandName")}>
                        <Input
                            value={brandState.name_uz}
                            onChange={handleBrandNameUz}
                            placeholder={translate("brandNameUz")}
                        />
                    </Form.Item>

                    <Form.Item label={translate("brandName")}>
                        <Input
                            value={brandState.name_ru}
                            onChange={handleBrandNameRu}
                            placeholder={translate("brandNameRu")}
                        />
                    </Form.Item>

                    <ImgCrop rotate>
                        <Upload
                            customRequest={(file) => uploadImage(file)}
                            listType='picture-card'
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview}
                            onRemove={(file) => deleteImage(file)}
                        >
                            {fileList.length < 1 && "+ Upload"}
                        </Upload>
                    </ImgCrop>
                </Form>
            </Modal>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {loading ? (
                    <FullPageLoader />
                ) : (
                    brandList?.map((item, i) => {
                        return (
                            <Col
                                span={8}
                                key={i}
                                style={{ marginBottom: "30px" }}
                            >
                                <Card
                                    cover={
                                        <img
                                            alt='example'
                                            src={item?.image}
                                            style={{
                                                width: "70%",
                                                height: "150px",
                                                padding: "10px",
                                                objectFit: "contain",
                                                margin: "0 auto",
                                            }}
                                        />
                                    }
                                    actions={[
                                        <Button
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                border: "none",
                                                boxShadow: "unset",
                                            }}
                                            key='edit'
                                            onClick={() => {
                                                openEditModal(item);
                                            }}
                                        >
                                            <EditOutlined />
                                        </Button>,
                                        <Button
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                border: "none",
                                                boxShadow: "unset",
                                            }}
                                            key='delete'
                                            onClick={() =>
                                                openDeleteModal(item?.id)
                                            }
                                        >
                                            <DeleteOutlined />
                                        </Button>,
                                    ]}
                                >
                                    <Meta
                                        title={item?.name_uz}
                                        description={item?.name_ru}
                                    />
                                </Card>
                            </Col>
                        );
                    })
                )}
            </Row>

            <Row style={{ margin: "50px 0" }} align='end'>
                <Pagination
                    defaultCurrent={1}
                    total={pagination?.total_pages}
                    onChange={pageTo}
                />
            </Row>
        </section>
    );
}
