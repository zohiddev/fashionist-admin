import Dashbord from "../../pages/dashbord/Dashbord"
import Products from "../../pages/products/Products"
import Orders from "../../pages/orders/Orders"
import ProductAdd from "../../pages/product_add/ProductAdd"
import Categories from './../../pages/category/Categories'
import Attributes from './../../pages/products/Attributes'
import Brands from './../../pages/brands/Brands'
import Pages from './../../pages/pages'
import Banner from './../../pages/banner'

export const publicRoutes = [
	{
		path: "/",
		component: Dashbord,
	},
	{
		path: "/products",
		component: Products,
	},
	{
		path: "/orders",
		component: Orders,
	},
	{
		path: "/attributes",
		component: Attributes,
	},
	{
		path: "/product_add",
		component: ProductAdd,
	},
	{
		path: "/category",
		component: Categories,
	},
	{
		path: "/brands",
		component: Brands,
	},
	{
		path: "/pages",
		component: Pages,
	},
	{
		path: "/events",
		component: Banner,
	},
]
