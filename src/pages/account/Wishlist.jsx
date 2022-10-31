


import { Spin } from 'antd'
import React from 'react'
import LoadingCard from '../../components/loading/LoadingCard'
import Paginate from '../../components/Paginate'
import ProductCard from '../../components/ProductCard'
import { useCurrentPage, useQuery } from '../../core/hooks'
import profileService from '../../services/profile.service'

function Wishlist() {

  const currentPage = useCurrentPage()
  const { data, paginate, loading } = useQuery(() => profileService.getWishlist(`?page=${currentPage}`), [currentPage])

  return (
    <div>
      {/* Products */}
      <div className="row">
          {
            loading ? [...Array(6)].map((e, i) => <LoadingCard key={i} />) : 
              data.map((e) => <ProductCard key={e._id} {...e.product}/>)
          }
          {
            loading ? [...Array(6)].map((e, i) => <LoadingCard key={i} />) : data.length === 0 && <h6>Chưa có sản phẩm yêu thích</h6> 
          }
      </div>
      {/* Pagination */}
      <Paginate totalPage={paginate.totalPage} />
    </div>
  )
}

export default Wishlist