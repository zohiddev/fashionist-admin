import React, {useState} from 'react'
import { Button,
	Drawer,
	Form,
	Input,
	PageHeader,
	Space,
	Table,
	message,
	Modal
} from 'antd'
import { useGetRequest, useLoad } from '../hooks/request'
import { CHECK_SLUG, PAGES_LIST, PAGE_DELETE, PAGE_UPDATE } from '../utils/urls'
import FullPageLoader from './../utils/FullPageLoader'
import ReactQuill  from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { postData } from '../utils/helpers'
import { usePostRequest } from './../hooks/request'
import { PAGE_ADD } from './../utils/urls'
import { pageAddedElementsName } from './../utils/data'
import useLanguage from './../hooks/useLanguage'
import { useContext } from 'react'
import { LanguageContext } from './../context/languageContext'

const initialPageState = {
	isNew: true,
	id: null,
	content_uz: "",
	content_ru: "",
	slug: "",
	title_ru: "",
	title_uz: ""
}

export default function Pages() {
	const [pageState, setPageState] = useState(initialPageState)
	const [pageVisible, setPageVisible] = useState(false)
	const [pageAddModal, setPageAddModal] = useState(false)
	const [deleteModal, setDeleteModal] = useState(false)

	const translate = useLanguage()
	const {language} = useContext(LanguageContext)

	const pageLoadRequest = useLoad({url: PAGES_LIST})
	const addPageRequest = usePostRequest({url: PAGE_ADD})
	const updatePageRequest = usePostRequest({url: PAGE_UPDATE.replace('page_id', pageState?.id)})
	const deletePageRequest = usePostRequest({url: PAGE_DELETE.replace('page_id', pageState?.id)})
	const checkSlugRequest = useGetRequest({url: CHECK_SLUG.replace('slugg', pageState?.slug)})

	const {loading, response} = pageLoadRequest
	const pagination = response && response?.pagination
	const pages = response && response?.pages


	async function handlePageAddBtn(e){
		e.preventDefault()
		const post_data = postData(pageState, ['isNew', 'id'])
		for(let item in post_data){
			if(post_data[item] === initialPageState[item]){
				return message.warning(`${translate('page')} ${translate(pageAddedElementsName[item])} ${translate('enter')}!`)
			}
		}

		let slugRes = await checkSlugRequest.request()
		if(slugRes.success){
			if(slugRes?.response?.isOk && !pageState?.isNew){
				let {success, response} = await updatePageRequest.request({data: post_data})
				if(success){
					if(response?.isOk){
						pageLoadRequest.request()
						setPageState(initialPageState)
						setPageAddModal(false)
						message.success(`${translate('page')} ${translate('success')} ${translate('update')}`)
					}
				}
			}else if(!slugRes?.response?.isOk && pageState?.isNew){
				return message.warning(translate('changeUrl'))
			}else{
				let {success, response} = await addPageRequest.request({data: post_data})
				if(success){
					if(response?.isOk){
						pageLoadRequest.request()
						setPageState(initialPageState)
						setPageAddModal(false)
						message.success(`${translate('page')} ${translate('success')} ${translate('add')}`)
					}
				}
			}
		}
	}

	async function handleDeletePageBtn(){
		let {success} = await deletePageRequest.request()
		if(success){
			pageLoadRequest.request()
			setPageState(initialPageState)
			setDeleteModal(false)
			message.success(`${translate('page')} ${translate('success')} ${translate('delete')}`)
		}
	}

	function onCloseViewPage() {
		setPageVisible(false)
		setPageState(initialPageState)
	}

	function onClosePageAddModal() {
		setPageAddModal(false)
		setPageState(initialPageState)
	}

	function handleChange({target}){
		setPageState({
			...pageState,
			[target.name]: target.value
		})
	}

	function viewPage(item){
		setPageVisible(true)
		setPageState({
			isNew: false,
			id: item?.id,
			content_uz: item?.content_uz,
			content_ru: item?.content_ru,
			slug: item?.slug,
			title_ru: item?.title_ru,
			title_uz: item?.title_uz
		})
	}

	function handleDeleteModal(){
		setDeleteModal(false)
		setPageState(initialPageState)
	}

	function deletePageBtn(id){
		setDeleteModal(true)
		setPageState({
			...initialPageState,
			id: id
		})
	}

	function updatePageBtn(item){
		console.log(item)
		setPageState({
			isNew: false,
			id: item?.id,
			content_uz: item?.content_uz,
			content_ru: item?.content_ru,
			slug: item?.slug,
			title_ru: item?.title_ru,
			title_uz: item?.title_uz
		})
		setPageAddModal(true)
	}

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: `${translate('page')} ${translate('name')}`,
			dataIndex: 'name',
		},
		{
			title: `${translate('page')} ${translate('description')}`,
			dataIndex: 'desc',
		},
		{
			title: 'Actions',
			dataIndex: 'action',
			render: (item) =>{
				return(
					<>
						<Button type="text" onClick={() => updatePageBtn(item)}>{translate('edit')}</Button>
						<Button danger type="text" onClick={() => deletePageBtn(item?.id)}>{translate('delete')}</Button>
						<Button  type="text" onClick={(e) => {viewPage(item)}}>{translate('viewPage')}</Button>
					</>
				)
			}
		},
	]

	console.log(pageState)

	return (
		<section className="container">
			<PageHeader
				title="Sahifalar"
				extra={[
					<Button
						key="2"
						onClick={() => setPageAddModal(true)}
					>
						Sahifa qo`shish
					</Button>]}
			/>

			<Drawer
				title={`Sahifani ko'rish`}
				placement="right"
				size='large'
				onClose={onCloseViewPage}
				visible={pageVisible}
				extra={
					<Space>
						<Button onClick={onCloseViewPage}>Cancel</Button>
						<a target='_blank' href={`https://sdb.uz/page/${pageState?.slug}`} rel="noreferrer">
              				Sayt orqali ko`rish
						</a>
					</Space>
				}
			>
				<div>
					<h1>
						{pageState?.title_uz}
					</h1>

					<div dangerouslySetInnerHTML={{__html: pageState?.content_uz}}></div>
				</div>
			</Drawer>

			<Drawer
				title={`Sahifani qo'shish`}
				placement="right"
				size='large'
				onClose={onClosePageAddModal}
				visible={pageAddModal}
				extra={
					<Space>
						<Button onClick={onClosePageAddModal}>Bekor qilish</Button>
						<Button onClick={(e) => handlePageAddBtn(e)}>Saqlash</Button>
					</Space>
				}
			>
				<Form name="complex-form"  labelCol={{ span: 24}} wrapperCol={{ span: 24 }}>
					<Form.Item label="Sahifa sarlavhasi">
						<Input
							value={pageState.title_uz}
							name='title_uz'
							onChange={handleChange}
							placeholder="Sahifa sarlavhasini o`zbekcha kiriting" />
					</Form.Item>

					<Form.Item label="Sahifa sarlavhasi">
						<Input
							value={pageState.title_ru}
							name='title_ru'
							onChange={handleChange}
							placeholder="Sahifa sarlavhasini ruscha kiriting" />
					</Form.Item>

					<Form.Item label="Sahifa URL">
						<Input
							value={pageState.slug}
							name='slug'
							onChange={handleChange}
							placeholder="Sahifa URL ni kiriting" />
					</Form.Item>

					<Form.Item label="Sahifa ma'lumotini o`zbekcha kiriting :">
						<ReactQuill
							theme="snow"
							value={pageState.content_uz}
							name='content_uz'
							onChange={(e) => handleChange({target:{name:'content_uz', value:e}})}
						/>
					</Form.Item>

					<Form.Item label="Sahifa ma'lumotini ruscha kiriting :">
						<ReactQuill
							theme="snow"
							value={pageState.content_ru}
							name='content_ru'
							onChange={(e) => handleChange({target:{name:'content_ru', value:e}})}
						/>
					</Form.Item>
				</Form>
			</Drawer>

			<Modal
				title="Sahifani o`chirmoqchimisz?"
				centered
				visible={deleteModal}
				onOk={() => handleDeletePageBtn()}
				okText="Ha"
				cancelText="Yo`q"
				okType="danger"
				onCancel={handleDeleteModal}
			>
			</Modal>

			{
				loading ? <FullPageLoader/> :

					<Table
						columns={columns}
						dataSource={pages?.map((item, i) => {
							return{
								key: i,
								id: item?.id,
								name: item[`title_${language}`]?.length > 20 ? item[`title_${language}`]?.slice(0, 20) + '...' : item[`title_${language}`],
								desc: item[`content_${language}`]?.length > 20 ? item[`content_${language}`]?.slice(0, 20) + '...' : item[`content_${language}`],
								action: item
							}
						})}
						pagination={false}
					/>
			}

		</section>
	)
}
