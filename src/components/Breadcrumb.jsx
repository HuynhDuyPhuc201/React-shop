

import React from 'react'
import { Link } from 'react-router-dom'
import { path } from '../config/path'

function Breadcrumb({name}) {
  return (
    <>
        <ol className="breadcrumb mb-md-0 font-size-xs text-gray-400">
            <li className="breadcrumb-item">
            <Link className="text-gray-400" to={path.Home}>Home</Link>
            </li>
            <li className="breadcrumb-item active">{name}</li>  
        </ol>
  </>
  )
}

export default Breadcrumb