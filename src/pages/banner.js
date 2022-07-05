import React, { useState } from 'react'
import {
	Button,
	Drawer,
	Form,
	Input,
	PageHeader,
	Space,
	Table,
	message,
	Modal,
	Image,
	Select,
	Upload,
} from 'antd'
import {
	useDeleteRequest,
	useLoad,
	usePostRequest,
	usePutRequest,
} from '../hooks/request'
import {
	BANNER_ADD,
	BANNER_DELETE,
	BANNER_LIST,
	BANNER_UPDATE,
	DELETE_SINGLE,
	UPLOAD_SINGLE,
} from '../utils/urls'
import FullPageLoader from './../utils/FullPageLoader'
import { postData, shortTitle, slugify } from '../utils/helpers'
import { bannerAddedElementsName } from './../utils/data'
import useLanguage from './../hooks/useLanguage'
import { LanguageContext } from './../context/languageContext'
import { useContext } from 'react'

const { Option } = Select

const initialBannerState = {
	isNew: true,
	id: null,
	title_uz: '',
	title_ru: '',
	position: null,
	slug: '',
	url: '',
	image: null,
}

export default function Banner() {
	const [bannerState, setBannerState] = useState(initialBannerState)
	const [bannerVisible, setBannerVisible] = useState(false)
	const [bannerAddModal, setBannerAddModal] = useState(false)
	const [deleteModal, setDeleteModal] = useState(false)
	const [fileList, setFileList] = useState([])

	const translate = useLanguage()
	const { language } = useContext(LanguageContext)

	const bannerLoadRequest = useLoad({ url: BANNER_LIST })
	const addBannerRequest = usePostRequest({ url: BANNER_ADD })
	const updateBannerRequest = usePutRequest({
		url: BANNER_UPDATE.replace('banner_id', bannerState?.id),
	})
	const deleteBannerRequest = useDeleteRequest({
		url: BANNER_DELETE.replace('banner_id', bannerState?.id),
	})
	const addImageRequest = usePostRequest({ url: UPLOAD_SINGLE })
	const deleteImageRequest = usePostRequest({ url: DELETE_SINGLE })

	const { loading, response } = bannerLoadRequest
	const banners = response && response?.events

	async function handlePageAddBtn(e) {
		e.preventDefault()
		const post_data = postData(bannerState, ['isNew', 'id'])
		console.log(post_data)
		for (let item in post_data) {
			if (post_data[item] === initialBannerState[item]) {
				return message.warning(
					`Banner ${bannerAddedElementsName[item]} kiriting!`
				)
			}
		}
		if (bannerState?.isNew) {
			var { success, response } = await addBannerRequest.request({
				data: post_data,
			})
		} else {
			var { success, response } = await updateBannerRequest.request({
				data: post_data,
			})
		}
		if (success) {
			if (response?.isOk) {
				bannerLoadRequest.request()
				setBannerState(initialBannerState)
				setBannerAddModal(false)
				message.success('Banner muvaffaqiyatli qo`shildi')
			}
		}
	}

	async function handleDeletePageBtn() {
		let { success } = await deleteBannerRequest.request()
		if (success) {
			bannerLoadRequest.request()
			setBannerState(initialBannerState)
			setDeleteModal(false)
		}
	}

	async function uploadImage(file) {
		let { onSuccess } = file
		const data = new FormData()
		data.append('image', file.file)
		const { success, response } = await addImageRequest.request({ data })
		if (success) {
			if (response?.isOk) {
				onSuccess(response)
				setBannerState({ ...bannerState, image: response?.image_name })
			}
		}
	}

	async function deleteImage(file) {
		console.log(file)
		const { success, response } = await deleteImageRequest.request({
			data: { image: file.response.image_name },
		})
		if (success) {
			if (response?.isOk) {
				setBannerState({ ...bannerState, image: '' })
			}
		}
	}

	function onCloseViewPage() {
		setBannerVisible(false)
		setBannerState(initialBannerState)
	}

	function onClosePageAddModal() {
		setBannerAddModal(false)
		setBannerState(initialBannerState)
		setFileList([])
	}

	function onChange({ fileList: newFileList }) {
		setFileList(newFileList)
	}

	async function onPreview(file) {
		let src = file.url
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader()
				reader.readAsDataURL(file.originFileObj)
				reader.onload = () => resolve(reader.result)
			})
		}
		const image = new Image()
		image.src = src
		const imgWindow = window.open(src)
		imgWindow.document.write(image.outerHTML)
	}

	function handleChange({ target }) {
		if (target.name === 'title_uz') {
			setBannerState({
				...bannerState,
				[target.name]: target.value,
				slug: slugify(target.value),
			})
		} else {
			setBannerState({
				...bannerState,
				[target.name]: target.value,
			})
		}
	}

	function viewPage(item) {
		setBannerVisible(true)
		setBannerState({
			isNew: false,
			id: item?.id,
			positon: item?.positon,
			image: item?.image,
			slug: item?.slug,
			title_ru: item?.title_ru,
			title_uz: item?.title_uz,
		})
	}

	function handleDeleteModal() {
		setDeleteModal(false)
		setBannerState(initialBannerState)
	}

	function deletePageBtn(id) {
		setDeleteModal(true)
		setBannerState({
			...initialBannerState,
			id: id,
		})
	}

	function updatePageBtn(item) {
		setBannerState({
			isNew: false,
			id: item?.id,
			position: item?.position,
			url: item?.url,
			image: item?.image,
			slug: item?.slug,
			title_ru: item?.title_ru,
			title_uz: item?.title_uz,
		})
		setFileList([
			// ...fileList,
			{
				uid: item?.id,
				name: item?.title_uz,
				status: 'done',
				response: { image_name: item?.image },
				url: item?.image,
			},
		])
		setBannerAddModal(true)
	}

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: translate('img'),
			dataIndex: 'img',
			render: (img) => <Image width={200} src={img} />,
		},
		{
			title: translate('bannerName'),
			dataIndex: 'name',
		},
		{
			title: translate('bannerPosition'),
			dataIndex: 'position',
		},
		{
			title: 'Actions',
			dataIndex: 'action',
			render: (item) => {
				return (
					<>
						<Button type='text' onClick={() => updatePageBtn(item)}>
							{translate('edit')}
						</Button>
						<Button
							danger
							type='text'
							onClick={() => deletePageBtn(item?.id)}
						>
							{translate('delete')}
						</Button>
						<Button
							type='text'
							onClick={(e) => {
								viewPage(item)
							}}
						>
							{translate('viewBanner')}
						</Button>
					</>
				)
			},
		},
	]

	return (
		<section className='container'>
			<PageHeader
				title={translate('events')}
				extra={[
					<Button key='2' onClick={() => setBannerAddModal(true)}>
						{translate('addBanner')}
					</Button>,
				]}
			/>

			<Drawer
				title={`Bannerni ko'rish`}
				placement='right'
				size='large'
				onClose={onCloseViewPage}
				visible={bannerVisible}
				extra={
					<Space>
						<Button onClick={onCloseViewPage}>Cancel</Button>
						<a
							target='_blank'
							href={`https://sdb.uz/page/${bannerState?.slug}`}
							rel='noreferrer'
						>
							Sayt orqali ko`rish
						</a>
					</Space>
				}
			>
				<div>
					<h1>{bannerState?.title_uz}</h1>

					<div>
						<Image width={'100%'} src={bannerState?.image} />
					</div>
				</div>
			</Drawer>

			<Drawer
				title={translate('addBanner')}
				placement='right'
				size='large'
				onClose={onClosePageAddModal}
				forceRender={true}
				visible={bannerAddModal}
				extra={
					<Space>
						<Button onClick={onClosePageAddModal}>
							{translate('cancel')}
						</Button>
						<Button onClick={(e) => handlePageAddBtn(e)}>
							{translate('save')}
						</Button>
					</Space>
				}
			>
				<Form
					name='complex-form'
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
				>
					<Form.Item label={translate('bannerName')}>
						<Input
							value={bannerState.title_uz}
							name='title_uz'
							onChange={handleChange}
							placeholder='Banner nominini o`zbekcha kiriting'
						/>
					</Form.Item>

					<Form.Item label={translate('bannerName')}>
						<Input
							value={bannerState.title_ru}
							name='title_ru'
							onChange={handleChange}
							placeholder='Banner nominini ruscha kiriting'
						/>
					</Form.Item>

					<Form.Item label='Banner pozitsiyasini kiriting'>
						<Select
							placeholder='Attributni tanlang'
							optionFilterProp='children'
							defaultValue={bannerState?.position}
							onChange={(e) =>
								handleChange({
									target: { name: 'position', value: e },
								})
							}
						>
							<Option value='hero'> Asosiy </Option>
							<Option value='lower'> Pastki </Option>
						</Select>
					</Form.Item>

					<Form.Item label='Banner URL'>
						<Input
							value={bannerState.url}
							name='url'
							onChange={handleChange}
							placeholder='Banner URL ni kiriting'
						/>
					</Form.Item>

					<Upload
						customRequest={(file) => uploadImage(file)}
						listType='picture-card'
						onChange={onChange}
						fileList={fileList}
						onPreview={onPreview}
						onRemove={(file) => deleteImage(file)}
					>
						{fileList.length < 1 && '+ Upload'}
					</Upload>
				</Form>
			</Drawer>

			<Modal
				title='Bannerni o`chirmoqchimisz?'
				centered
				visible={deleteModal}
				onOk={() => handleDeletePageBtn()}
				okText={translate('yes')}
				cancelText={translate('no')}
				okType='danger'
				onCancel={handleDeleteModal}
			></Modal>

			{loading ? (
				<FullPageLoader />
			) : (
				<Table
					columns={columns}
					dataSource={banners?.map((item, i) => {
						return {
							key: i,
							id: item?.id,
							img: item?.image,
							name: shortTitle(item[`title_${language}`]),
							position:
								item?.position === 'lower'
									? 'pastki'
									: 'asosiy',
							action: item,
						}
					})}
					pagination={false}
				/>
			)}
		</section>
	)
}
