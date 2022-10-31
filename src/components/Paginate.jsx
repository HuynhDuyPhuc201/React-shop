

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCurrentPage } from '../core/hooks'
import { cn } from '../core/utils'

function Paginate({totalPage}) {
    
    const { pathname, search } = useLocation()
    const currentPage = useCurrentPage()

    /** 
     * Render default page = 1
     * 
     * lấy thông tin page từ search URL và render ra page hiện tại
     */

    const renderPage = () =>{
        let start = currentPage - 2
        let end = currentPage + 2

        if(start < 1){
            start = 1
            end = 5
        }
        if(end > totalPage){
            end = totalPage
            start = end - 4

            if(start < 1) start = 1
        }

        const list = []

        for(let i = start; i<= end; i++){

            const searchParam = new URLSearchParams(search)
            searchParam.set('page', i)
            const path = `${pathname}?${searchParam.toString()}`
            list.push((
                <li key={i} className={cn('page-item', { active: currentPage === i })}>
                    <Link className="page-link" to={path}>{i}</Link>
                </li>
            ))
        }
        return list
    }

    if(totalPage <=1) return null

  return (
    <nav className="d-flex justify-content-center justify-content-md-end">
        <ul className="pagination pagination-sm text-gray-400">
        <li className="page-item">
            <a className="page-link page-link-arrow" href="#">
            <i className="fa fa-caret-left" />
            </a>
        </li>
        {renderPage()}
        <li className="page-item">
            <a className="page-link page-link-arrow" href="#">
            <i className="fa fa-caret-right" />
            </a>
        </li>
        </ul>
    </nav>
  )
}

export default Paginate