import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";


const Context = createContext()

export const TranslateProvider = ({ children, translate, locales = 'en' }) => {

    const [_translate, setTranslate] = useState(translate)

    const [lang, setLang] = useLocalStorage('lang', locales)
    const t = (k) =>{
        return _translate?.[lang]?.[k] || k
    }

    const selectLocale = (locale) =>{
        setLang(locale)
    }

    return (
        <Context.Provider value={{ t, locale: lang, selectLocale }}>
            {children}
        </Context.Provider>
    )
}

export const useTranslate = () => useContext(Context)