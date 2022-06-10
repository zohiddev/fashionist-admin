import axios from "axios"
import { domain } from "../utils/urls"
// const baseUrl = "https://goodway.appx.uz/dev/v1/vendor"

const $host = axios.create({
	baseURL: `${domain}/dev`,
})

const $authHost = axios.create({
	baseURL: `${domain}/dev`,
})

$authHost.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem("accessToken")

		if (accessToken) {
			config.headers["x-auth-token"] = accessToken
			config.headers.Authorization = `Bearer ${accessToken}`
		}
		return config
	},
	(error) => {
		Promise.reject(error)
	}
)

$authHost.interceptors.response.use(
	(response) => {
		return response
	},
	function (error) {
		const originalRequest = error.config
		let refreshToken = localStorage.getItem("refreshToken")
		if (
			refreshToken &&
			error.response.status === 401 &&
			!originalRequest._retry
		) {
			originalRequest._retry = true
			return $authHost
				.post(`/adminka/auth/refresh`, {
					refreshToken: refreshToken,
				})
				.then((res) => {
					if (res.status === 200) {
						localStorage.setItem(
							"accessToken",
							res.data.accessToken
						)
						console.log("Access token refreshed!")
						return $authHost(originalRequest)
					}
				})
		}
		return Promise.reject(error)
	}
)

const api = {
	login: (body) => {
		return $authHost.post(`/adminka/auth/login`, body)
	},
	refreshToken: (body) => {
		return $authHost.post(`/adminka/auth/refresh`, body)
	},
	logout: (body) => {
		return $authHost.delete(`/adminka/auth/logout`, body)
	},
	getProtected: () => {
		return $authHost.get(`/protected_resource`)
	}
}

export { api, $authHost, $host }