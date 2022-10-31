


import React, { useRef, useState } from 'react'

function Select({ options, onChange, defaultValue}) {

    const ref = useRef()
    const [select, setSelect] = useState(() => {
        return options.find(e => e.value === defaultValue) || {}
    })

    const onMouseEnter = () =>{
        ref.current.classList.add('show')
    }

    const onMouseLeave = () =>{
        ref.current.classList.remove('show')
    }

    const onSelect = (select) => (ev) =>{
        ev.preventDefault() 
        setSelect(select)
        onChange?.(select.value)
    }

  return (
    <div onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter} ref={ref} className="dropdown hovered">
        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#">{select.label}</a>
        {/* Menu */}
        <div className="dropdown-menu minw-0">
            {
                options.map(e => <a onClick={onSelect(e)} key={e.value} className="dropdown-item" href="#">{e.label}</a>)
            }
        </div>
    </div>
  )
}

export default Select