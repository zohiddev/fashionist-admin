import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import "./assets/style/style.scss"
import 'antd/dist/antd.css'
import UserProvider from './context/userContext'
import LanguageProvider from "./context/languageContext"

ReactDOM.render(
	<BrowserRouter>
		<LanguageProvider>
			<UserProvider>
				<App />
			</UserProvider>
		</LanguageProvider>
	</BrowserRouter>,
	document.getElementById("root")
)


// hi

