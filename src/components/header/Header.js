import React,{ useContext }  from 'react'
import { PageHeader, Select } from 'antd'
import { LanguageContext } from './../../context/languageContext'

const { Option } = Select

const Header = () => {
	const {setLanguage} = useContext(LanguageContext)
	const handleLangChange = (target) => {
		localStorage.setItem('language', target)
		setLanguage(target)
	}

	return(
		<div>
			<PageHeader
				className="site-page-header header"

				extra={
					<Select
						defaultValue={localStorage.getItem('language')}
						style={{ width: 120}}
						onChange={handleLangChange}
				 	>
						<Option value="uz">Uzbek</Option>
						<Option value="ru">Rus</Option>
				  	</Select>
				}
			/>
		</div>
	)
}

export default Header