import { createContext, useContext, useState } from "react"
import { useSelector } from "react-redux"



const Context = createContext()

import React from 'react'
import { useForm } from "../core/hooks";

function PageProvider({children}) {

    const [openPopupModal, setOpenPopupModal] = useState(false);
    const [dataView, setDataView] = useState({});

    const { form, setForm } = useForm({})

  return (
    <Context.Provider value={{openPopupModal, setOpenPopupModal,dataView, setDataView, setForm, form }}>
        {children}
    </Context.Provider>
  )
}

export default PageProvider

export const useMainContext = () => useContext(Context)
 
export const usePage = () => useSelector(store => store.page)
