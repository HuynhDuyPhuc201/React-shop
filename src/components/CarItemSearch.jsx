

import React from 'react'
import { Link } from 'react-router-dom'
import { currency } from '../utils/currency'

function CarItemSearch({data, handleCloseDrawer}) {
  return (
    <>
        <div className="col-4 col-md-3">
            {/* Image */}
            <img className="img-fluid" src={data.images?.[0]?.thumbnail_url} alt="..." />
        </div>
        <div className="col position-static">
            {/* Text */}
            <p className="mb-0 font-weight-bold">
            <Link className="stretched-link text-body" to={`/product/${data.id}`} onClick={handleCloseDrawer}>{data.name}</Link> <br />
            <span className="text-muted">{currency(data.real_price)} vnd</span>
            </p>
        </div>
    </>
  )
}

export default CarItemSearch