import React,{useState} from 'react'
import FullPageLoader from './../../utils/FullPageLoader'
import {useDeleteRequest, useLoad,usePostRequest, usePutRequest} from './../../hooks/request'
import { OPTIONS_LIST,
		 OPTION_ADD,
		 OPTION_UPDATE,
		 OPTION_DELETE,
	OPTION_ROW_ADD,
	OPTION_ROW_UPDATE,
	OPTION_ROW_DELETE
} from '../../utils/urls'
import {
	Form,
	Input,
	PageHeader,
	Modal,
	Button,
	Collapse,
	Select,
	List,
	message
} from 'antd'
import { EditOutlined,DeleteOutlined } from '@ant-design/icons'
import { postData, slugify } from '../../utils/helpers'

const {Option} = Select
const {Panel} = Collapse

const attributeStateInitialValue = {
	isNew: true,
	id: null,
	name_uz:'',
	name_ru:'',
	slug: '',
	is_filterable: 0
}

const attributeValueStateInitialValue = {
	isNew: true,
	value_uz:'',
	value_ru:'',
	option_id: null
}

const Attributes = () => {

	const [attributeState, setAttributeState] = useState(attributeStateInitialValue)
	const [attributeValueState, setAttributeValueState] = useState(attributeValueStateInitialValue)
	const [attributeModal, setAttributeModal] = useState(false)
	const [attributeValueModal, setAttributeValueModal] = useState(false)
	const [deleteModal, setDeleteModal] = useState(false)

	const attributesRequest = useLoad({url: OPTIONS_LIST})
	const addAttributeRequest = usePostRequest({url: OPTION_ADD})
	const updateAttributeRequest = usePutRequest({url: OPTION_UPDATE.replace('option_id', attributeState.id)})
	const deleteAttributeRequest = useDeleteRequest({url: OPTION_DELETE.replace('option_id', attributeState.id)})
	const addAttributeValueRequest = usePostRequest({url: OPTION_ROW_ADD.replace('option_id', attributeValueState.option_id)})
	const updateAttributeValueRequest = usePutRequest({url: OPTION_ROW_UPDATE.replace('option_id', attributeValueState.option_id)})
	const deleteAttributeValueRequest = useDeleteRequest({url: OPTION_ROW_DELETE.replace('option_id', attributeValueState.option_id)})

	const {loading, response} = attributesRequest
	const attributes = response && response?.attributes

	const handleAttributeModal = () => {setAttributeModal(false); setAttributeState(attributeStateInitialValue)}
	const handleAttributeValueModal = () => {setAttributeValueModal(false); setAttributeState(attributeStateInitialValue)}
	const handleDeleteModal = () => {setAttributeState(attributeStateInitialValue); setAttributeValueState(attributeStateInitialValue); setDeleteModal(false)}

	const options = attributes?.map(item => {
		return {value: item.id, label: item.name_uz}
	})

	const handleAttributeNameUz = ({target}) => {
		setAttributeState({...attributeState,name_uz: target.value, slug: slugify(target.value)})
	}

	const handleAttributeNameRu = ({target}) => {
		setAttributeState({...attributeState,name_ru: target.value})
	}

	const handleAttributeValueUz = ({target}) => {
		setAttributeValueState({...attributeValueState,value_uz: target.value})
	}

	const handleAttributeValueRu = ({target}) => {
		setAttributeValueState({...attributeValueState,value_ru: target.value})
	}

	const handleSelect = (value) => {
		setAttributeValueState({...attributeValueState, option_id: value})
	}

	async function handleAttributeAddBtn(e){
		e.preventDefault()
		if(attributeState.name_uz === ''){
			message.warning('Attribute nomini kiriting')
		} else if(attributeState.name_ru === ''){
			message.warning('Attribute ruscha nomini kiriting')
		}else{
			let {success} = await addAttributeRequest.request({data: postData(attributeState, ['id', 'isNew'])})
			if(success){
				attributesRequest.request()
				setAttributeState(attributeStateInitialValue)
				setAttributeModal(false)
				message.success('Attribute muvaffaqiyatli qo`shildi')
			}
		}
	}

	async function handleAttributeUpdateBtn (e) {
		e.preventDefault()
		if(attributeState.name_uz === ''){
			message.warning('Attribute nomini kiriting')
		} else if(attributeState.name_ru === ''){
			message.warning('Attribute ruscha nomini kiriting')
		}else{
			let {success} = await updateAttributeRequest.request({data:  postData(attributeState, ['id', 'isNew'])})
			if(success){
				attributesRequest.request()
				setAttributeState(attributeStateInitialValue)
				setAttributeModal(false)
				message.success('Attribute muvaffaqiyatli yangilandi')
			}

		}
	}

	async function handleAttributeDeleteBtn(){
		console.log(deleteAttributeRequest)
		let {success} = await deleteAttributeRequest.request({})
		if(success){
			attributesRequest.request()
			setAttributeState(attributeStateInitialValue)
			setDeleteModal(false)
			message.success('Attribute muvaffaqiyatli o`chirildi')
		}
	}

	async function handleAttributeValueAddBtn(e) {
		e.preventDefault()
		if(attributeValueState.name_uz === ''){
			message.warning('Attribute nomini kiriting')

		} else if(attributeValueState.name_ru === ''){
			message.warning('Attribute nomini kiriting')

		} else if(attributeValueState.option_id === null){
			message.warning('Attribute tanlang')

		}else{
			let {success} = await addAttributeValueRequest.request({data: postData(attributeValueState, ['option_id', 'isNew'])})
			if(success){
				attributesRequest.request()
				setAttributeValueState(attributeValueStateInitialValue)
				setAttributeValueModal(false)
				message.success('Attribute muvaffaqiyatli qo`shildi')

			}

		}
	}

	async function handleAttributeValuUpdateBtn (e) {
		e.preventDefault()
		if(attributeValueState.value_uz === ''){
			message.warning('Attribute nomini kiriting')

		} else if(attributeValueState.value_ru === ''){
			message.warning('Attribute nomini kiriting')

		} else if(attributeValueState.option_id === null){
			message.warning('Attribute tanlang')

		}else{
			let {success} = await updateAttributeValueRequest.request({data: postData(attributeValueState, ['option_id', 'isNew'])})
			if(success){
				attributesRequest.request()
				setAttributeValueState(attributeValueStateInitialValue)
				setAttributeValueModal(false)
				message.success('Attribute muvaffaqiyatli yangilandi')
			}

		}
	}


	async function handleAttributeValueDeleteBtn (id) {
		let {success} = await deleteAttributeValueRequest.request({data: {option_row_id: id}})
		if(success){
			attributesRequest.request()
			setAttributeValueState(attributeValueStateInitialValue)
			setDeleteModal(false)
			message.success('Attribute muvaffaqiyatli o`chirildi')
		}

	}

	function openUpdateModal(item){
		if(item.attributeValues){
			setAttributeModal(true)
			setAttributeState({
				...item,
				isNew: false,

			})
		}else{
			setAttributeValueModal(true)
			setAttributeValueState({
				isNew: false,
				value_uz: item.value_uz,
				value_ru: item.value_ru,
				option_id: item.attribute_id
			})
		}
	}

	function openDeleteModal (item){
		if(item.attributeValues){
			 setAttributeState({
				...item,
				isNew: false,
			})
			setDeleteModal(true)
		}else{
			setAttributeValueState({
				isNew: false,
				value_uz: item.value_uz,
				value_ru: item.value_ru,
				option_id: item.id
			})
			setDeleteModal(true)
		}
	}

	function GenExtra({item}){
		return(
			<div>
				<Button
					onClick={event => {
						openUpdateModal(item)
					}}
					style={{marginRight: '10px',display: 'inline-flex', alignItems: 'center'}}
				>
					<span>Tahrirlash</span>
					<EditOutlined />
				</Button>
				<Button
					danger
					onClick={() => openDeleteModal(item)}
				>
					<span>O`chirish</span>
					<DeleteOutlined />
				</Button>
			</div>
	  )
	}

	return(

		<section className="container">
			<PageHeader
				title="Attributlar"
				extra={[
					<Button
						key="2"
						onClick={() => setAttributeModal(true)}
					>
										Attribute qo`shish
					</Button>,
					<Button
						key="3"
						onClick={() => setAttributeValueModal(true)}
					>
									Attribute Value qo`shish
					</Button>]}

			/>

			<Modal
				title="Attribute o`chirmoqchimisz?"
				centered
				visible={deleteModal}
				onOk={() => attributeState.isNew ? handleAttributeValueDeleteBtn() : handleAttributeDeleteBtn()}
				okText="Ha"
				cancelText="Yo`q"
				okType="danger"
				onCancel={handleDeleteModal}
			>
			</Modal>

			<Modal
				title="Attribute qo`shish"
				centered
				visible={attributeModal}
				onOk={(e) => { attributeState.isNew ? handleAttributeAddBtn(e) : handleAttributeUpdateBtn(e) }}
				onCancel={() => handleAttributeModal()}
			>
				<Form
					name="complex-form"
					labelCol={{ span: 24}}
					wrapperCol={{ span: 24 }}
					size='middle'
				>
					<Form.Item label="Attributning nomi">
						<Input
							placeholder="Attribute nomini o`zbekcha kiriting"
							value={attributeState.name_uz}
							onChange={handleAttributeNameUz}
						/>
					</Form.Item>

					<Form.Item label="Attributning nomi">
						<Input
							value={attributeState.name_ru}
							onChange={handleAttributeNameRu}
							placeholder="Attribute nomini ruscha kiriting"
						/>
					</Form.Item>
				</Form>

			</Modal>

			<Modal
				title="Attribute qo`shish"
				centered
				visible={attributeValueModal}
				onOk={(e) => attributeValueState.isNew ?  handleAttributeValueAddBtn(e) : handleAttributeValuUpdateBtn(e)}
				onCancel={() => handleAttributeValueModal()}
			>
				<Form name="complex-form"  labelCol={{ span: 24}} wrapperCol={{ span: 24 }}>
					<Form.Item label="Attribut tanlang">
						<Select
							placeholder='Attribut tanlang'
							onChange={handleSelect}
							defaultValue={attributeValueState.option_id}
						>
							{
								options?.map((item, i) =>{
									return(
										<Option
											key={i}
											value={item?.value}
										>{item?.label}</Option>
									)
								})
							}
						</Select>
					</Form.Item>
					<Form.Item label="Attributning nomi">
						<Input
							value={attributeValueState.value_uz}
							onChange={handleAttributeValueUz}
							placeholder="Attribute nomini o`zbekcha kiriting" />
					</Form.Item>

					<Form.Item label="Attributning nomi">
						<Input
							value={attributeValueState.value_ru}
							onChange={handleAttributeValueRu}
							placeholder="Attribute nomini ruscha kiriting" />
					</Form.Item>
				</Form>
			</Modal>

			{
				loading ? <FullPageLoader /> :

							attributes?.map(item => {
								return(
									<Collapse
										accordion
										key={item?.id}
										expandIconPosition='right'
									>
										<Panel
											header={item?.name_uz}
											key={item?.id}
											extra={<GenExtra item={item}/>}
										>

											<List
												bordered
												dataSource={item?.attributeValues}
												renderItem={el => (
													<List.Item>
														{
															<>
																<p>{el?.value_uz}</p>
																<GenExtra item={el}/>
															</>
														}
													</List.Item>
												)}
											/>

										</Panel>
									</Collapse>
								)
							})
			}


		</section>

	)
}

export default Attributes
