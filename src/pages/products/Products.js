import React, { useState, useEffect } from "react";
import FullPageLoader from "../../utils/FullPageLoader";
import { useHistory } from "react-router-dom";
import { useDeleteRequest, useLoad, usePostRequest } from "../../hooks/request";
import {
    PRODUCTS_LIST,
    PRODUCT_DELETE,
    CATEGORIES_LIST,
    DELETE_MULTIPLE,
} from "./../../utils/urls";
import { perPageData, sortProductsData, sortIdOption } from "../../utils/data";
import {
    Table,
    Button,
    Switch,
    Image,
    PageHeader,
    Pagination,
    Row,
    Input,
    Select,
    Dropdown,
    Menu,
    Modal,
    Space,
} from "antd";

const { Search } = Input;
const { Option } = Select;
const { SubMenu } = Menu;

const initial_params = {
    page: 1,
    per_page: 10,
    sort: "id,desc",
    search: "",
    category_id: "",
};

const initialProductData = {
    images: "",
    id: null,
};

const Products = () => {
    const history = useHistory();

    const [productData, setProductData] = useState(initialProductData);
    const [params, setParams] = useState(initial_params);
    const [deleteModal, setdeleteModal] = useState(false);

    const productLoad = useLoad({ url: PRODUCTS_LIST });
    const categoryLoad = useLoad({ url: CATEGORIES_LIST });
    const productDelete = useDeleteRequest({
        url: PRODUCT_DELETE.replace("product_id", productData?.id),
    });
    const imagesDeleteRequest = usePostRequest({ url: DELETE_MULTIPLE });

    const { loading, response } = productLoad;
    const pagination = response && response?.pagination;
    const products = response && response?.products;
    const categories = categoryLoad?.response?.categories;

    async function handleDeleteProductBtn() {
        // let res = await imagesDeleteRequest.request({
        // 	images: productData?.images,
        // })
        let { success } = await productDelete.request();
        if (success) {
            productLoad.request();
            setProductData(initialProductData);
            setdeleteModal(false);
        }
    }

    function handleDeleteModal() {
        setdeleteModal(false);
        setProductData(initialProductData);
    }

    function pageTo(page) {
        setParams({
            ...params,
            page,
        });
    }

    function onSearch(search) {
        setParams({
            ...params,
            search,
        });
    }

    function perPageHandler(per_page) {
        setParams({
            ...params,
            per_page,
        });
    }

    function sortProductsHandler(sort) {
        setParams({
            ...params,
            sort: [params.sort, sort].join(","),
        });
    }

    function onCategoryClick({ key }) {
        setParams({
            ...params,
            category_id: key,
        });
    }

    function deleteProductBtn(item) {
        setProductData({
            images: item?.images?.join(","),
            id: item?.id,
        });
        setdeleteModal(true);
    }

    useEffect(() => {
        productLoad.request({ params });
    }, [params]);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "Rasm",
            dataIndex: "img",
            render: (img) => <Image width={60} src={img} />,
        },
        {
            title: "Mahsulot nomi",
            dataIndex: "name",
        },
        {
            title: "Mahsulot narxi",
            dataIndex: "price",
        },
        {
            title: "Chegirma",
            dataIndex: "discount",
        },
        {
            title: "Avvalgi narx",
            dataIndex: "oldPrice",
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (bool) => <Switch defaultChecked={bool} />,
        },
        {
            title: "Actions",
            dataIndex: "action",
            render: (item) => {
                return (
                    <>
                        <Button
                            type='text'
                            onClick={() =>
                                history.push("/product_add", { id: item?.id })
                            }
                        >
                            Tahrirlash
                        </Button>
                        <Button
                            danger
                            type='text'
                            onClick={() => deleteProductBtn(item)}
                        >
                            {" "}
                            O`chirish
                        </Button>
                    </>
                );
            },
        },
    ];

    const selectData = [
        {
            id: 1,
            placeholder: "Tavarlar soni",
            onChange: perPageHandler,
            optionsData: perPageData,
        },
        {
            id: 2,
            placeholder: "Saralash",
            onChange: sortProductsHandler,
            optionsData: sortProductsData,
        },
        {
            id: 3,
            placeholder: "ID bo'yicha saralash",
            onChange: sortProductsHandler,
            optionsData: sortIdOption,
        },
    ];

    const menu = (
        <Menu onClick={onCategoryClick}>
            <Menu.Item key=''>Kategoriyasiz</Menu.Item>
            {categories &&
                categories?.map((category) => {
                    return (
                        <SubMenu key={category?.id} title={category?.name_uz}>
                            {category?.children?.map((cat_item, n) => {
                                return (
                                    <SubMenu
                                        key={cat_item.id}
                                        title={cat_item?.name_uz}
                                    >
                                        {cat_item?.children?.map((cat_link) => {
                                            return (
                                                <Menu.Item key={cat_link?.id}>
                                                    {cat_link?.name_uz}
                                                </Menu.Item>
                                            );
                                        })}
                                    </SubMenu>
                                );
                            })}
                        </SubMenu>
                    );
                })}
        </Menu>
    );

    return (
        <section className='container'>
            <section className='content-main'>
                <PageHeader
                    className='site-page-header'
                    title='Mahsulotlar'
                    extra={[
                        <Button
                            key='2'
                            onClick={() => history.push("/product_add")}
                        >
                            Mahsulot qo`shish
                        </Button>,
                    ]}
                />

                <Modal
                    title='Mahsulotni o`chirmoqchimisz?'
                    centered
                    visible={deleteModal}
                    onOk={() => handleDeleteProductBtn()}
                    okText='Ha'
                    cancelText='Yo`q'
                    okType='danger'
                    onCancel={handleDeleteModal}
                ></Modal>

                <Space style={{ marginBottom: "20px" }}>
                    <Search
                        placeholder='Mahsulot nomini kiriting'
                        enterButton='Qidirish'
                        onSearch={onSearch}
                    />

                    <Dropdown overlay={menu} placement='bottomLeft' arrow>
                        <Button>Kategoriya bo`yicha</Button>
                    </Dropdown>

                    {selectData?.map((select) => {
                        return (
                            <Select
                                key={select?.placeholder}
                                placeholder={select?.placeholder}
                                onChange={select?.onChange}
                            >
                                {select?.optionsData?.map((item, i) => {
                                    return (
                                        <Option
                                            key={`${item?.value}`}
                                            value={item?.value}
                                        >
                                            {item?.label}
                                        </Option>
                                    );
                                })}
                            </Select>
                        );
                    })}
                </Space>

                {loading ? (
                    <FullPageLoader />
                ) : (
                    <Table
                        columns={columns}
                        dataSource={products?.map((item, i) => {
                            return {
                                key: i + 1,
                                img: item?.images[0],
                                id: item?.id,
                                name:
                                    item?.name_uz?.length > 40
                                        ? item?.name_uz?.slice(0, 20) + "..."
                                        : item?.name_uz,
                                price: `${item?.price?.toLocaleString()} so'm`,
                                discount:
                                    item?.discount === 0
                                        ? "Chegirmasiz"
                                        : item?.discount,
                                oldPrice: `${item?.previous_price.toLocaleString()} so'm`,
                                status: item?.status === 1 ? true : false,
                                action: item,
                            };
                        })}
                        pagination={false}
                    />
                )}

                <Row style={{ margin: "50px 0" }} align='end'>
                    <Pagination
                        defaultCurrent={1}
                        total={pagination?.total}
                        onChange={pageTo}
                    />
                </Row>
            </section>
        </section>
    );
};

export default Products;
