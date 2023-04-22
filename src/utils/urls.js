const user =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));

// Categries

export const CATEGORIES_LIST = `/adminka/category/list`;
export const CATEGORY_ADD = `/adminka/category/add`;
export const CATEGORY_DELETE = (id) => `/adminka/category/${id}`;
export const CATEGORY_UPDATE = `adminka/category/edit/category_id`;

// Products

export const PRODUCTS_LIST = `/adminka/product/list`;
export const PRODUCT_IN_ID = `adminka/product/view/product_id`;
export const PRODUCT_ADD = `/adminka/product/add`;
export const PRODUCT_DELETE = `/adminka/product/product_id`;
export const PRODUCT_UPDATE = `/adminka/product/product_id`;

// Options

export const OPTIONS_LIST = `/adminka/attribute/list`;
export const OPTION_ADD = `/adminka/attribute/add`;
export const OPTION_DELETE = `/adminka/attribute/delete/option_id`;
export const OPTION_UPDATE = `/adminka/attribute/update/option_id`;
export const OPTION_ROW_ADD = `/adminka/attribute/add-value/option_id`;
export const OPTION_ROW_DELETE = `/adminka/attribute/delete-value/option_id`;
export const OPTION_ROW_UPDATE = `/adminka/attribute/update-value/option_id`;

// Brands

export const BRANDS_LIST = `/adminka/brand/list`;
export const BRAND_ADD = `/adminka/brand/add`;
export const BRAND_DELETE = `/adminka/brand/delete/brand_id`;
export const BRAND_UPDATE = `/adminka/brand/update/brand_id`;

// Pages

export const PAGES_LIST = `/adminka/page/list`;
export const PAGE_ADD = `/adminka/page/add`;
export const PAGE_DELETE = `/adminka/page/delete/page_id`;
export const PAGE_UPDATE = `/adminka/page/edit/page_id`;
export const CHECK_SLUG = `/adminka/page/check-slug/slugg`;

// Banners

export const BANNER_LIST = `/adminka/events/list`;
export const BANNER_ADD = `/adminka/events/add`;
export const BANNER_DELETE = `/adminka/events/delete/banner_id`;
export const BANNER_UPDATE = `/adminka/events/banner_id`;

// Orders

export const ORDERS_LIST = `/adminka/order/list`;
export const ORDER_IN_ID = `/adminka/order/order_id`;
export const ORDER_STATUS = `/adminka/order/status/order_id`;

// Media

export const UPLOAD_SINGLE = "/media/upload_single/user";
export const UPLOAD_MULTIPLE = "/media/upload_multiple/user";
export const DELETE_SINGLE = "/media/delete";
export const DELETE_MULTIPLE = "/media/delete_multiple";

export const domain = "https://ecommerce.main-gate.appx.uz";
