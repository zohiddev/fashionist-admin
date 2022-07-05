import React from 'react'
import {
	AppstoreOutlined,
	HomeOutlined,
	AppstoreAddOutlined,
	ShoppingOutlined,
	ApartmentOutlined,
	FileOutlined,
	PictureOutlined,
	ClusterOutlined,
	BoldOutlined,
} from '@ant-design/icons'

export const perPageData = [
	{
		value: 12,
		label: '12',
	},
	{
		value: 24,
		label: '24',
	},
	{
		value: 36,
		label: '36',
	},
	{
		value: 48,
		label: '48',
	},
]

export const sortProductsData = [
	{ value: 'id', label: "Id bo'yicha" },
	{ value: 'name_uz', label: "Nomi  bo'ycha" },
	{ value: 'quantity', label: "Soni bo'yicha" },
	{ value: 'price', label: "Narxi bo'yicha" },
	{ value: 'discount', label: " Chegirma bo'yicha " },
	{ value: 'status', label: "Status bo'yicha" },
]

export const sortIdOption = [
	{ value: 'asc', label: "O'sish bo'yicha" },
	{ value: 'desc', label: "Kamayish bo'yicha" },
]

export const productAddedElementsName = {
	name_uz: "Nomini o'zbekcha",
	name_ru: 'Nomini ruscha',
	price: 'Narxini',
	description_uz: "Tavsifini o'zbekcha",
	description_ru: 'Tavsifini ruscha',
	images: 'Rasm',
	attributes: 'Attribut',
	category_id: 'Kategoriya',
	brand_id: 'Brand',
}

export const pageAddedElementsName = {
	content_uz: 'content_uz',
	content_ru: 'content_ru',
	slug: 'url',
	title_ru: 'title_ru',
	title_uz: 'title_uz',
}

export const bannerAddedElementsName = {
	position: 'pozitsiyasini',
	image: 'rasmini',
	url: 'url',
	title_ru: 'title_ru',
	title_uz: 'title_uz',
}

export const paymentStatus = {
	0: 'Naqd',
	1: 'Payme',
	2: 'Click',
	3: 'Apelsin',
}

export const orderStatus = {
	0: 'Kutilmoqda',
	1: 'Jarayonda',
	2: 'Yo`lda',
	3: 'Yetkazib berildi',
	4: 'Bekor qilingan',
}

export const sidebarData = [
	// {
	// 	id: 1,
	// 	title:  "main",
	// 	icon: <HomeOutlined />,
	// 	path: "/",
	// 	active:"",
	// 	link:[]

	// },
	{
		id: 2,
		title: 'products',
		icon: <AppstoreOutlined />,
		path: '/products',
		active: 'products',
		link: [
			{
				id: 3,
				title: 'products',
				icon: <AppstoreOutlined />,
				exact: '/products',
			},
			{
				id: 4,
				title: 'attributes',
				icon: <ApartmentOutlined />,
				exact: '/attributes',
			},
			{
				id: 5,
				title: 'product',
				icon: <AppstoreAddOutlined />,
				exact: '/product_add',
			},
		],
	},
	{
		id: 6,
		title: 'orders',
		icon: <ShoppingOutlined />,
		path: '/orders',
		active: 'orders',
		link: [],
	},
	{
		id: 7,
		title: 'category',
		icon: <ClusterOutlined />,
		path: '/category',
		active: 'category',
		link: [],
	},
	{
		id: 8,
		title: 'pages',
		icon: <FileOutlined />,
		path: '/pages',
		active: 'pages',
		link: [],
	},
	{
		id: 9,
		title: 'brands',
		icon: <BoldOutlined />,
		path: '/brands',
		active: 'brands',
		link: [],
	},
	{
		id: 10,
		title: 'events',
		icon: <PictureOutlined />,
		path: '/events',
		active: 'events',
		link: [],
	},
]

// const orderStatus = {
// 	0: lang === 'uz' ? 'Kutilmoqda' : 'В ожидании',
// 	1: lang === 'uz' ? 'Jarayonda' : 'В Процессе',
// 	2: lang === 'uz' ? 'Yo`lda' : 'В дороге',
// 	3: lang === 'uz' ? 'Yetkazib berildi' : 'Доставлено',
// 	4: lang === 'uz' ? 'Bekor qilingan' : 'Отменено',
// }

// const orderStatusColor = {
// 	0: "secondary",
// 	1: "primary",
// 	2: "success",
// 	3: "success",
// 	4: "danger",
// }
