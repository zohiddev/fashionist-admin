import React, { useContext, useState } from "react"
import { api } from "../../http"
// import { useDispatch } from "react-redux"
// import { setUserAC } from "../../store/reducers/userReducer"
import { useHistory } from "react-router-dom"
import { PageHeader, Select, Row, Card, Form, Button, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { UserContext } from './../../context/userContext'

const {Option} = Select

function Login() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [verify, setVerify] = useState(false)
	const {user, setUser} = useContext(UserContext)
	// const dispatch = useDispatch()
	const history = useHistory()

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (username.length !== 0 && password.length !== 0) {
			try {
				let res
				res = await api.login({ username, password })
				if (res.data.isOk) {
					let { accessToken, refreshToken, user_id, username} = res.data
					localStorage.setItem("accessToken", accessToken)
					localStorage.setItem("refreshToken", refreshToken)
					// localStorage.setItem("user", JSON.stringify({user_id, username}))
					setUser(true)
					history.push("/")
				} else {
					alert(res.data.message)
					setUsername("")
					setPassword("")
					setVerify(true)
				}
			} catch (error) {
				console.error(error)
				// setAppState({ ...appState, loading: false });
				alert(error.response?.data?.error || "Error")
			}
		} else {
			setVerify(true)
		}
	}

	return (
		<>
			<PageHeader
				className="header header-full"
				style={{width: '100vw'}}
				extra={
					<Select
						defaultValue="Uzbek"
						style={{ width: 120}}
					>
						<Option value="uz">Uzbek</Option>
						<Option value="ru">Rus</Option>
				  </Select>
				}
			/>

			<Row style={{justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
				<Card
					title="Kirish"
					style={{
						width: 300,
					}}
				>
				 <Form
						name="normal_login"
						className="login-form"
						initialValues={{
							remember: true,
						}}
					>
						<Form.Item
							name="Login"
							rules={[
								{
									required: true,
									message: 'Iltimos loginni kiriting!',
								},
							]}
						>
							<Input
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								prefix={<UserOutlined className="site-form-item-icon" />}
								placeholder="Login"
							/>
						</Form.Item>
						<Form.Item
							name="Parol"
							rules={[
								{
									required: true,
									message: 'Iltimos parolni kiriting!',
								},
							]}
						>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="Parol"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Item>
						<Form.Item>
							<Button
								style={{width: '100%'}}
								type="primary"
								htmlType="submit"
								className="login-form-button"
								onClick={handleSubmit}
							>
								Kirish
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</Row>
		</>
	)
}

export default Login
