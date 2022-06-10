import React,{useEffect, useContext} from "react"
import Sidebar from "./components/sidebar/Sidebar"
import Header from "./components/header/Header"
import { api } from "./http"
import { Redirect, Route } from "react-router-dom"
import { publicRoutes } from "./components/routes/routes"
import Login from "./pages/login/Login"
import { UserContext } from './context/userContext'

function isTokenExpired(token) {
	const expiry = JSON.parse(window.atob(token.split(".")[1])).exp
	return Math.floor(new Date().getTime() / 1000) >= expiry
}

function parseJwt (token) {
	var base64Url = token.split('.')[1]
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
	var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
	}).join(''))

	return JSON.parse(jsonPayload)
};

function App (){

	const {user, setUser} = useContext(UserContext)


	async function INIT () {
		const refreshToken = localStorage.getItem("refreshToken")
		console.log(isTokenExpired(refreshToken))

		if (refreshToken) {

			try {
				if (isTokenExpired(localStorage.getItem("accessToken"))) {
					console.log(true)
					const res = await api.refreshToken({ refreshToken })
					if(res.data.isOk){
						localStorage.setItem("accessToken", res.data.accessToken)
						console.log(res.data)
						setUser(true)
					} else {
						setUser(false)
					}
				} else {
					setUser(true)
				}
			} catch (error) {
				console.error(error)
				alert(error)
				setUser(false)
			}
		} else {
		}
	}

	useEffect(() => {
		INIT()
	}, [])

	return(
		user ? (
			<div className="homeComponent">
				<Sidebar/>
				<Header/>
				<div className="page_wrapper" >
					{publicRoutes.map((item) => (
						<Route
							key={item.path}
							path={item.path}
							component={item.component}
							exact
						/>
					))}
				</div>
			</div>
		) : (
			<>
				<Route
					path={'/login'}
					component={Login}
					exact
				/>
				<Redirect to={'/login'} />
			</>
		)
	)
}

export default App