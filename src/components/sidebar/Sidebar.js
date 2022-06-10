import React from "react"
// import {useSelector} from 'react-redux'
import { Link, NavLink  } from "react-router-dom"
import { Menu} from 'antd'
import { sidebarData } from './../../utils/data'
import useLanguage from './../../hooks/useLanguage'


function Sidebar() {

	const translate = useLanguage()

	return (
		<>
			<aside className="sidebar">
				<div className="aside-top" style={{padding: '20px'}}>
					<Link to="/" className="brand-wrap">
						<img src="./SDB_logo_1.png" height="46" className="logo" alt="logo"/>
					</Link>
				</div>

				<Menu
					mode="inline"
					theme="light"
				>
					{
						sidebarData?.map((item) => {
							if(item?.link?.length > 0){
								return (
									<Menu.SubMenu key={item?.id} title={translate(item?.title)} icon={item?.icon}>
										{
											item?.link?.map((el) => {
												return(
													<Menu.Item key={el?.id} icon={el?.icon}>
														<NavLink to={el?.exact} exact>
															<span>{translate(el?.title)}</span>
														</NavLink>
													</Menu.Item>
												)
											})
										}
									</Menu.SubMenu>
								)
							}else{
								return(
									<Menu.Item key={item?.id} icon={item?.icon}>
										<NavLink to={item?.path} exact>
											{/* {item?.icon} */}
											{translate(item?.title)}
										</NavLink>
									</Menu.Item>
								)
							}
						})
					}
				</Menu>
			</aside>
		</>
	)
}

export default Sidebar



