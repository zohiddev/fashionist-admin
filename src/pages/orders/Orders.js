import React, {useContext, useState} from "react"
import { Avatar, Button, Card, Col, Divider, Drawer, Image, PageHeader, Row, Space, Table } from "antd"
import {CalendarOutlined,UserOutlined,CarOutlined,EnvironmentOutlined } from '@ant-design/icons'
import { paymentStatus,orderStatus } from './../../utils/data'
import FullPageLoader from "../../utils/FullPageLoader"
import { DateFormat } from "../../utils/helpers"
import { ORDERS_LIST } from "../../utils/urls"
import { useLoad } from "../../hooks/request"
import Text from "antd/lib/typography/Text"
import useLanguage from './../../hooks/useLanguage'
import { LanguageContext } from './../../context/languageContext'

const initialOrderState = {
	orderId: null
}

const OrdersNew = () =>  {
	const [orderVisible, setOrderVisible] = useState(false)
	const [orderState, setOrderState] = useState(initialOrderState)

	const ordersLoadRequest = useLoad({url: ORDERS_LIST})

	const {loading, response} = ordersLoadRequest
	const orders = response?.orders
	const translate = useLanguage()
	const {language} = useContext(LanguageContext)

	function onCloseViewPage() {
		setOrderVisible(false)
		setOrderState(initialOrderState)
	}

	function viewOrder(item){
		setOrderState(item)
		setOrderVisible(true)
	}

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: translate('consumerName'),
			dataIndex: 'name',
		},
		{
			title: translate('consumerAddress'),
			dataIndex: 'address',
		},
		{
			title: translate('allPrice'),
			dataIndex: 'price',
		},
		{
			title: translate('status'),
			dataIndex: 'status',
		},
		{
			title: translate('date'),
			dataIndex: 'date',
		},
		{
			title: 'Actions',
			dataIndex: 'action',
			render: (item) =>{
				return(
					<>
						<Button  type="text" onClick={(e) => {viewOrder(item)}}>{translate('viewOrder')}</Button>
					</>
				)
			}
		},
	]

	const productColumns = [
		{
			title: translate('product'),
			dataIndex: 'product',
			render: (item) => {
				console.log(item)
				return(
					<div>
						<Image
							width={60}
							src={item?.images[0]}
		  				/>
						<Text>{item['name_' + language]}</Text>
					</div>
				)
			}
		},
		{
			title: translate('unitPrice'),
			dataIndex: 'price',
		},
		{
			title: translate('quantity'),
			dataIndex: 'amount',
		},
		{
			title: translate('allPrice'),
			dataIndex: 'totalPrice'
		}
	]

	return (
		<section className="container">
			<PageHeader
				title={translate('orders')}
			/>

			<Drawer
				title={translate('viewOrder')}
				placement="right"
				onClose={onCloseViewPage}
				width={'80%'}
				visible={orderVisible}
				extra={
					<Space>
						<Button onClick={onCloseViewPage}>{translate('cancel')}</Button>
					</Space>
				}
			>
				<div>
					<PageHeader
						className="site-page-header orderDrawerPageHeader"
						title={<span style={{display: 'flex', alignItems: 'center'}}><CalendarOutlined /> &nbsp; 20.05.2022</span>}
						subTitle={`${translate('orderId')}: ${orderState?.id}`}
					/>

					<Row style={{justifyContent: 'space-between'}}>
						<Col span={6}>
							<Card
								title={
									<div className="orderDrawerPageHeaderTitle" >
										<Avatar
											icon={<UserOutlined />}
											className='orderDrawerPageHeaderAvatar'
										/>
										{translate('consumer')}
									</div>}
								bordered={false}
							>
								<div className="orderDrawerBlock">
									<Text strong>{translate('consumerName')}: &nbsp;</Text>
									<Text>{orderState?.full_name}</Text>
								</div>
								<div className="orderDrawerBlock">
									<Text strong>{translate('consumerNumber')}: &nbsp;</Text>
									<Text>{orderState?.delivery_phone}</Text>
								</div>
							</Card>
						</Col>
						<Col span={6}>
							<Card
								title={
									<div className="orderDrawerPageHeaderTitle" >
										<Avatar
											icon={<CarOutlined />}
											className='orderDrawerPageHeaderAvatar'
										/>
										{translate('orderInfo')}
									</div>}
								bordered={false}
							>
								<div className="orderDrawerBlock">
									<Text strong>{translate('paymnentMethod')}: &nbsp;</Text>
									<Text>{paymentStatus[orderState?.payment_method]}</Text>
								</div>
								<div className="orderDrawerBlock">
									<Text strong>{translate('status')}: &nbsp;</Text>
									<Text>{orderStatus[orderState?.status]}</Text>
								</div>
							</Card>
						</Col>
						<Col span={6}>
							<Card
								title={
									<div className="orderDrawerPageHeaderTitle" >
										<Avatar
											icon={<EnvironmentOutlined />}
											className='orderDrawerPageHeaderAvatar'

										/>
										{translate('consumerAddress')}
									</div>}
								bordered={false}
							>
								<div className="orderDrawerBlock">
									<Text style={{textAlign: 'center'}}>{orderState?.delivery_address}</Text>
								</div>
							</Card>
						</Col>
					</Row>

					<Divider>{translate('products')}</Divider>

					<Table
						columns={productColumns}
						dataSource={orderState?.order_items?.map((item, i) => {
							return{
								key: i,
								product: item,
								address: item?.delivery_address,
								price: item?.price?.toLocaleString(),
								amount: item?.qty,
								totalPrice: (item?.price * item?.qty).toLocaleString(),
							}
						})}

						pagination={false}
					/>
				</div>
			</Drawer>


			{
				loading ? <FullPageLoader/> :

					<Table
						columns={columns}
						dataSource={orders?.map((item, i) => {
							return{
								key: i,
								id: item?.id,
								name: item?.full_name,
								address: item?.delivery_address,
								price: item?.total_price?.toLocaleString(),
								status: item?.status,
								date: DateFormat(item?.created_at),
								action: item
							}
						})}
						pagination={false}
					/>
			}

			{/* <Row style={{margin: '50px 0'}} align="end">
				<Pagination
					defaultCurrent={1}
					total={pagination?.total_pages}
					onChange={pageTo}
				/>
			</Row> */}
		</section>
	)
}


export default OrdersNew