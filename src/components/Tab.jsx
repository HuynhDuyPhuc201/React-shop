import { createContext, useContext, useState } from "react";
import { useSearch } from "../core/hooks";
import { cn } from "../core/utils";


const Context = createContext({})

export const Tab = ({ children, defaultValue = 0, name = "tab"}) =>{
    const _defaultValue = useSearch(name)
    const [indexActive, setIndexActive] = useState(_defaultValue || defaultValue)

    return(
        <Context.Provider value={{indexActive, setIndexActive}}>
            {children}
        </Context.Provider>
    )
}

const useTab = () => useContext(Context)

Tab.Title = ({ children, index }) =>{
    const {indexActive, setIndexActive} = useTab()
    const onClick = (e) =>{
        e.preventDefault()
        setIndexActive(index)
    }
    return (
        <a onClick={onClick} className={cn('nav-link', {active: indexActive === index})}>
            {children}
        </a>
    )
}
Tab.Content = ({ children, index }) =>{
    const {indexActive} = useTab()
    return (
        <div className={cn('tab-pane', {
            'fade show active': index === indexActive
        })}>
            {children}
        </div>
    )
}