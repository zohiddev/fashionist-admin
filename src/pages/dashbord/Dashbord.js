import React,{ useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getInfos } from '../../store/reducers/dashboardReducer'
// import FullPageLoader from '../../utils/FullPageLoader'

const Dashbord = () => {

	// const dispatch = useDispatch()
	// const loading = useSelector(state => state?.dashboard?.loading)
	// const infos = useSelector(state => state?.dashboard?.infos)
	// const lang = useSelector(state => state?.lang?.lang)

	// useEffect(() => {
	// 	dispatch(getInfos())
	// },[dispatch])

	return(
	// <>
	// 	{
	// 		loading ?
	// 			<FullPageLoader/>
	// 			:
	// 			<div className="content-main" >
	// 				<div className='aiz-main-content'>
	// 					<div className='px-15px px-lg-25px'>
	// 						<div className="row">
	// 							<div className="col-xl-3 col-md-6">
	// 								<div className="shadow-xl rounded-lg pt-5 px-4 mb-5 d-flex justify-content-between align-items-end" style={{backgroundColor: "#0dcaf0"}}>
	// 									<div className="pb-5">
	// 										<div className="fw-500">{lang === 'uz' ? 'Jami mijozlar':'Всего клиентов'}</div>
	// 										<div className="h2 fw-700">{infos?.totalUsers}</div>
	// 									</div>
	// 									<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64.001" viewBox="0 0 64 64.001">
	// 										<g id="Group_8872" data-name="Group 8872" transform="translate(330 100)" opacity="0.5">
	// 											<path id="Union_27" data-name="Union 27" d="M48,34V25h2v9ZM0,34V25A24.993,24.993,0,0,1,42.678,7.322,24.924,24.924,0,0,1,50,25H48A23,23,0,1,0,2,25v9Z" transform="translate(-330 -70)" fill="#fff"></path>
	// 											<path id="Subtraction_44" data-name="Subtraction 44" d="M68,38H66V29A23.046,23.046,0,0,0,47.136,6.369a29.165,29.165,0,0,0-3.414-2.36A24.98,24.98,0,0,1,68,29h0v9Z" transform="translate(-334 -74)" fill="#fff"></path>
	// 											<path id="Subtraction_38" data-name="Subtraction 38" d="M13,26A13,13,0,0,1,3.808,3.808,13,13,0,1,1,22.192,22.192,12.915,12.915,0,0,1,13,26ZM13,2A11,11,0,1,0,24,13,11.012,11.012,0,0,0,13,2Z" transform="translate(-318 -100)" fill="#fff"></path>
	// 											<path id="Subtraction_43" data-name="Subtraction 43" d="M31,30a13.156,13.156,0,0,1-2.717-.283A17.155,17.155,0,0,0,30,27.955c.329.03.665.045,1,.045A11,11,0,1,0,31,6c-.333,0-.669.015-1,.045a17.153,17.153,0,0,0-1.718-1.762A13.148,13.148,0,0,1,31,4a13,13,0,0,1,9.193,22.193A12.915,12.915,0,0,1,31,30Z" transform="translate(-322 -104)" fill="#fff"></path>
	// 										</g>
	// 									</svg>
	// 								</div>
	// 							</div>
	// 							<div className="col-xl-3 col-md-6">
	// 								<div className="shadow-xl rounded-lg pt-5 px-4 mb-5 d-flex justify-content-between align-items-end" style={{backgroundColor: "#4caf50"}}>
	// 									<div className="pb-5">
	// 										<div className="fw-500">{lang === 'uz' ? 'Jami mahsulotlar' : 'Всего продуктов'}</div>
	// 										<div className="h2 fw-700">{infos?.totalProducts}</div>
	// 									</div>
	// 									<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64.001" viewBox="0 0 64 64.001">
	// 										<path id="Union_29" data-name="Union 29" d="M64,64H0V0H64V64h0ZM2,62H62V2H2ZM25,23V21H37V2h2V23Zm0-2V2h2V21Z" fill="#fff" opacity="0.5"></path>
	// 									</svg>
	// 								</div>
	// 							</div>
	// 							<div className="col-xl-3 col-md-6">
	// 								<div className="shadow-xl rounded-lg pt-5 px-4 mb-5 d-flex justify-content-between align-items-end" style={{backgroundColor: "#fb8c00"}}>
	// 									<div className="pb-5">
	// 										<div className="fw-500">{lang === 'uz' ? 'Jami buyurtmalar' : 'Всего заказов'}</div>
	// 										<div className="h2 fw-700">{infos?.totalOrders}</div>
	// 									</div>
	// 									<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
	// 										<path id="Union_30" data-name="Union 30" d="M56,62a6.011,6.011,0,0,0,5.657-4H28.747a8.014,8.014,0,0,1-2.461,4H56v2H22q-.252,0-.5-.016Q21.252,64,21,64v-.062A8.012,8.012,0,0,1,14,56h2a6.008,6.008,0,0,0,5.5,5.98A6.008,6.008,0,0,0,27,56H64a8.009,8.009,0,0,1-8,8Zm-8-6V8h0a6.008,6.008,0,0,0-6-6h0V0a8.009,8.009,0,0,1,8,8V56ZM14,56V8H0A8.009,8.009,0,0,1,8,0H42V2H13.286A7.984,7.984,0,0,1,16,8V56ZM13.657,6A6.011,6.011,0,0,0,8,2H8A6.011,6.011,0,0,0,2.343,6ZM28,49V47H44v2Zm0-4V43H44v2Zm-8,0V43h4v2Zm8-6V37H44v2Zm0-4V33H44v2Zm-8,0V33h4v2Zm8-6V27H44v2Zm0-4V23H44v2Zm-8,0V23h4v2Zm8-6V17H44v2Zm0-4V13H44v2Zm-8,0V13h4v2Z" fill="#fff" opacity="0.5"></path>
	// 									</svg>
	// 								</div>
	// 							</div>
	// 							<div className="col-xl-3 col-md-6">
	// 								<div className="shadow-xl rounded-lg pt-5 px-4 mb-5 d-flex justify-content-between align-items-end" style={{backgroundColor: "#cddc39"}}>
	// 									<div className="pb-5">
	// 										<div className="fw-500">{lang === 'uz' ? 'Jami savdo' : 'Тотальная распродажа'}</div>
	// 										<div className="h2 fw-700">
	// 											{infos?.totalSales?.toLocaleString()} UZS
	// 										</div>
	// 									</div>
	// 									<svg xmlns="http://www.w3.org/2000/svg" width="64.002" height="64" viewBox="0 0 64.002 64">
	// 										<g id="Group_8873" data-name="Group 8873" transform="translate(-1801.1 -206)" opacity="0.5">
	// 											<path id="Path_18946" data-name="Path 18946" d="M29.022,34.545a10.117,10.117,0,0,0-1.18-5.14,11.161,11.161,0,0,0-3.985-3.739,44.893,44.893,0,0,0-8.3-3.606,35.052,35.052,0,0,1-8.09-3.694,11.715,11.715,0,0,1-3.848-4.19A12.449,12.449,0,0,1,2.376,8.36,11.576,11.576,0,0,1,6.036-.585,14.312,14.312,0,0,1,15.579-4.16v-6.4h1.881v6.4q6.294.342,9.715,4.19T30.6,10.515H28.749a13.168,13.168,0,0,0-3.3-9.355,11.723,11.723,0,0,0-9.013-3.54A12.837,12.837,0,0,0,7.558.6a9.839,9.839,0,0,0-3.335,7.7,10.722,10.722,0,0,0,1.112,5.3,10.348,10.348,0,0,0,3.694,3.54,37.464,37.464,0,0,0,7.269,3.2,61.714,61.714,0,0,1,7.183,2.856,15.758,15.758,0,0,1,4.139,2.89,10.806,10.806,0,0,1,2.446,3.66,12.813,12.813,0,0,1,.8,4.755,11.6,11.6,0,0,1-3.54,8.808,14.468,14.468,0,0,1-9.492,3.711v6.431H15.956v-6.4Q8.7,46.774,4.736,42.925T.768,32.339H2.615q0,6.038,3.78,9.45T16.674,45.2a12.91,12.91,0,0,0,8.859-3.073A9.71,9.71,0,0,0,29.022,34.545Z" transform="translate(1834.232 216.556)" fill="#fff"></path>
	// 											<path id="Path_18947" data-name="Path 18947" d="M29.022,34.545a10.117,10.117,0,0,0-1.18-5.14,11.161,11.161,0,0,0-3.985-3.739,44.893,44.893,0,0,0-8.3-3.606,35.052,35.052,0,0,1-8.09-3.694,11.715,11.715,0,0,1-3.848-4.19A12.449,12.449,0,0,1,2.376,8.36,11.576,11.576,0,0,1,6.036-.585,14.312,14.312,0,0,1,15.579-4.16v-6.4h1.881v6.4q6.294.342,9.715,4.19T30.6,10.515H28.749a13.168,13.168,0,0,0-3.3-9.355,11.723,11.723,0,0,0-9.013-3.54A12.837,12.837,0,0,0,7.558.6a9.839,9.839,0,0,0-3.335,7.7,10.722,10.722,0,0,0,1.112,5.3,10.348,10.348,0,0,0,3.694,3.54,37.464,37.464,0,0,0,7.269,3.2,61.714,61.714,0,0,1,7.183,2.856,15.758,15.758,0,0,1,4.139,2.89,10.806,10.806,0,0,1,2.446,3.66,12.813,12.813,0,0,1,.8,4.755,11.6,11.6,0,0,1-3.54,8.808,14.468,14.468,0,0,1-9.492,3.711v6.431H15.956v-6.4Q8.7,46.774,4.736,42.925T.768,32.339H2.615q0,6.038,3.78,9.45T16.674,45.2a12.91,12.91,0,0,0,8.859-3.073A9.71,9.71,0,0,0,29.022,34.545Z" transform="translate(1800.332 216.556)" fill="#fff"></path>
	// 										</g>
	// 									</svg>
	// 								</div>
	// 							</div>
	// 						</div>

	// 						<div className="row mb-3">
	// 							<div className="col-xl-3 col-md-6">
	// 								<div className="row">
	// 									<div className="col-12">
	// 										<div className="rounded-lg p-3 d-flex align-items-center border mb-4 bg-light">
	// 											<div className="flex-grow-1 py-5px">
	// 												<div className="fs-20 fw-700 opacity-90">{infos?.totalCategory}</div>
	// 												<div className="opacity-60">{lang === 'uz' ? 'Barcha kategoriyalar' : 'Все категории'}</div>
	// 											</div>
	// 											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	// 												<path id="Path_18951" data-name="Path 18951" d="M20.358,12.949A3.691,3.691,0,0,1,24,16.656h0v3.627A3.7,3.7,0,0,1,20.358,24H16.805a3.692,3.692,0,0,1-3.631-3.718h0V16.656a3.669,3.669,0,0,1,3.631-3.706h3.553Zm-15.257,0a.974.974,0,0,1,.935.464,1.018,1.018,0,0,1,0,1.062.974.974,0,0,1-.935.464H3.642a1.71,1.71,0,0,0-1.693,1.717h0v3.581a1.744,1.744,0,0,0,1.693,1.717H7.217a1.664,1.664,0,0,0,1.2-.5,1.735,1.735,0,0,0,.5-1.218h0V14.859l-.015-.134a1.007,1.007,0,0,1,.454-.893.963.963,0,0,1,1.1.033,1.011,1.011,0,0,1,.38,1.051h0v5.355a3.68,3.68,0,0,1-3.642,3.718H3.642A3.759,3.759,0,0,1,0,20.271H0V16.656a3.746,3.746,0,0,1,1.067-2.625,3.593,3.593,0,0,1,2.574-1.082H5.1Zm15.257,1.99H16.805a1.7,1.7,0,0,0-1.682,1.717h0v3.627a1.724,1.724,0,0,0,.489,1.217,1.653,1.653,0,0,0,1.192.5h3.553a1.653,1.653,0,0,0,1.192-.5,1.724,1.724,0,0,0,.489-1.217h0V16.656a1.735,1.735,0,0,0-.493-1.214,1.664,1.664,0,0,0-1.189-.5ZM20.358,0a3.759,3.759,0,0,1,3.631,3.718h0V7.333a3.748,3.748,0,0,1-1.032,2.634A3.6,3.6,0,0,1,20.4,11.085h-1.47a1,1,0,0,1,0-1.99h1.425a1.676,1.676,0,0,0,1.2-.518,1.747,1.747,0,0,0,.484-1.233h0V3.718A1.722,1.722,0,0,0,20.358,2H16.805a1.7,1.7,0,0,0-1.682,1.717h0V9.141l-.012.125a1,1,0,0,1-.991.853.96.96,0,0,1-.683-.31,1,1,0,0,1-.264-.713h0V3.718A3.746,3.746,0,0,1,14.234,1.09,3.593,3.593,0,0,1,16.805,0h3.553ZM7.194,0a3.692,3.692,0,0,1,3.642,3.718h0V7.344A3.746,3.746,0,0,1,9.769,9.969a3.593,3.593,0,0,1-2.574,1.082H3.642A3.691,3.691,0,0,1,0,7.344H0V3.718A3.7,3.7,0,0,1,3.642,0H7.194Zm0,2H3.642a1.663,1.663,0,0,0-1.211.491,1.735,1.735,0,0,0-.5,1.226h0V7.344a1.736,1.736,0,0,0,.492,1.248,1.664,1.664,0,0,0,1.223.5H7.194a1.676,1.676,0,0,0,1.2-.518,1.747,1.747,0,0,0,.484-1.233h0V3.718A1.711,1.711,0,0,0,7.194,2Z" fill="#7bc4c4"></path>
	// 											</svg>
	// 										</div>
	// 									</div>
	// 									<div className="col-12">
	// 										<div className="rounded-lg p-3 d-flex align-items-center border mb-4 bg-light">
	// 											<div className="flex-grow-1 py-5px">
	// 												<div className="fs-20 fw-700 opacity-90">{infos?.totalBrands}</div>
	// 												<div className="opacity-60">{lang === 'uz' ? 'Barcha brendlar' : 'Все бренды'}</div>
	// 											</div>
	// 											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="23.999" viewBox="0 0 24 23.999">
	// 												<g id="Group_8915" data-name="Group 8915" transform="translate(-640 -606)">
	// 													<path id="Union_34" data-name="Union 34" d="M-618-600c0-.012,0-.023,0-.035A4,4,0,0,0-622-604h-17a1,1,0,0,1-1-1,1,1,0,0,1,1-1h17a6.007,6.007,0,0,1,6,6h0a1,1,0,0,1-1,1A1,1,0,0,1-618-600Z" transform="translate(1280 1212)" fill="#ff6f61"></path>
	// 													<path id="Union_36" data-name="Union 36" d="M22,6c0-.012,0-.023,0-.035A4,4,0,0,0,18,2H1A1,1,0,0,1,1,0H18a6.007,6.007,0,0,1,6,6h0a1,1,0,1,1-2,0Z" transform="translate(664 629.999) rotate(180)" fill="#ff6f61"></path>
	// 													<path id="Subtraction_79" data-name="Subtraction 79" d="M6,12a6,6,0,1,1,6-6A6.007,6.007,0,0,1,6,12ZM6,2a4,4,0,1,0,4,4A4.005,4.005,0,0,0,6,2Z" transform="translate(646 612)" fill="#ff6f61"></path>
	// 												</g>
	// 											</svg>
	// 										</div>
	// 									</div>
	// 								</div>
	// 							</div>
	// 							<div className="col-xl-3 col-md-6">
	// 								<div className="border rounded-lg px-4 pt-4 pb-3">
	// 									<div className="fs-16 fw-700 mb-2">{lang === 'uz' ? 'Eng yaxshi kategoriyalar' : 'Лучшие категории'}</div>
	// 									<ul className="list-group list-group-raw">
	// 										{
	// 											infos?.topCategories?.map(item => {
	// 												return (
	// 													<li key={item?.id} className="list-group-item d-flex align-items-center justify-content-between px-0 py-5px mt-1">

	// 														<div className="minw-0 flex-grow-1 text-truncate-2 mx-3 list-group-item-name">
	// 															<a href={`https://sdb-nestjs.vercel.app/products/${item?.slug}`} target='_blank' rel="noreferrer">
	// 																{lang === 'uz' ? item?.name_uz : item?.name_ru}
	// 															</a>
	// 														</div>
	// 														<div className="ml-auto mr-0 fw-600 text-danger list-group-item-price">
	// 															{item?.views}
	// 														</div>
	// 													</li>
	// 												)
	// 											})
	// 										}
	// 									</ul>
	// 								</div>
	// 							</div>
	// 							<div className="col-xl-3 col-md-6">
	// 								<div className="border rounded-lg px-4 pt-4 pb-3">
	// 									<div className="fs-16 fw-700 mb-2">Top Brands</div>
	// 									<ul className="list-group list-group-raw">
	// 										{
	// 											infos?.topBrands?.map((item, ind) => {
	// 												return (
	// 													<li key={ind} className="list-group-item d-flex align-items-center px-0 py-5px mt-1">

	// 														<div className="minw-0 flex-grow-1 text-truncate-2 mx-3 list-group-item-name">
	// 															<a href={`https://sdb-nestjs.vercel.app/products/products?brand=${item?.id}`} target='_blank' rel="noreferrer">
	// 																{lang === 'uz' ? item?.name_uz : item?.name_ru}
	// 															</a>
	// 														</div>
	// 														<div className="ml-auto mr-0 fw-600 text-danger list-group-item-price">
	// 															{item?.views}
	// 														</div>
	// 													</li>
	// 												)
	// 											})
	// 										}

	// 									</ul>
	// 								</div>
	// 							</div>
	// 							<div className="col-xl-3 col-md-6">
	// 								<div className="border rounded-lg px-4 pt-4 pb-3">
	// 									<div className="fs-16 fw-700 mb-2">Top Brands</div>
	// 									<ul className="list-group list-group-raw">
	// 										{
	// 											infos?.topProducts?.map((item, ind) => {
	// 												return (
	// 													<li key={ind} className="list-group-item d-flex align-items-center px-0 py-5px mt-1">
	// 														<span className="d-flex align-items-center size-50px">
	// 															<img src={item?.image}  alt={item?.name_uz}  className="mw-100 mh-100 rounded lazyloaded"  />
	// 														</span>
	// 														<div className="minw-0 flex-grow-1 text-truncate-2 mx-3 list-group-item-name">
	// 															<a href={`https://sdb-nestjs.vercel.app/product/${item?.slug}`} target='_blank' rel="noreferrer">
	// 																{lang === 'uz' ? item?.name_uz?.substr(0,20) + '...' : item?.name_ru?.substr(0,20) + '...'}
	// 															</a>
	// 														</div>
	// 														<div className="ml-auto mr-0 fw-600 text-danger list-group-item-price">
	// 															{item?.views}
	// 														</div>
	// 													</li>
	// 												)
	// 											})
	// 										}

	// 									</ul>
	// 								</div>
	// 							</div>
	// 						</div>

	// 						{/* <div>
	// 							<div className="fs-16 fw-700 mb-3">{lang === 'uz' ? 'Eng yaxshi mahsulotlar' : 'Лучшие продукты'}</div>
	// 							<div className="slick-slide slick-active" data-slick-index="5" aria-hidden="false"><div><div className="carousel-box row row-cols-5 g-2">
	// 								{
	// 									infos?.topProducts?.map((item,ind) => {
	// 										return (
	// 											<div key={ind} className="aiz-card-box border rounded mb-2 mr-1 bg-white">
	// 												<div className="position-relative">
	// 													<a href={`https://sdb-nestjs.vercel.app/product/${item?.slug}`} className="d-block" target="_blank" tabIndex="0">
	// 														<img className="img-fit mx-auto h-210px lazyloaded" src={item?.image}  alt={item?.name_uz} style={{width: '100%',objectFit: 'contain'}}/>
	// 													</a>
	// 												</div>
	// 												<div className="p-md-3 p-2 text-left">
	// 													<div className="fs-15">
	// 														<span className="fw-700 text-primary">{item?.price?.toLocaleString()} UZS</span>
	// 													</div>
	// 													<h3 className="fw-600 fs-13 text-truncate-2 lh-1-4 mb-0">
	// 														<a href={`https://sdb-nestjs.vercel.app/product/${item?.slug}`} className="d-block text-reset" target="_blank" tabIndex="0">
	// 															{lang === 'uz' ? item?.name_uz?.substr(0,20) + '...' : item?.name_ru?.substr(0,20) + '...'}
	// 														</a>
	// 													</h3>
	// 												</div>
	// 											</div>
	// 										)
	// 									})
	// 								}

	// 							</div></div></div>
	// 						</div> */}
	// 					</div>
	// 				</div>
	// 			</div>
	// 	}
	// </>

		<div>
dashboard
		</div>
	)
}




export default Dashbord