import React from 'react'
import { useContext } from 'react'
import { languages } from '../utils/translate'
import { LanguageContext } from './../context/languageContext'

function useLanguage(){
	const {language} = useContext(LanguageContext)
	return (text) => languages[language][text] || text
}


export default useLanguage