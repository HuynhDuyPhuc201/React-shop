

import { Link, useNavigate } from 'react-router-dom'
import { currency } from '../utils/currency'
import { useMainContext } from '../hooks/usePage';
import { message, Spin } from 'antd';
import { useAsync } from '../core/hooks';
import profileService from '../services/profile.service';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { path } from '../config/path';
import { addCartAction } from '../store/cartReducer';
import { useProductCard } from '../hooks/useProductCard';

function ProductCard({ _id, name, images, price, real_price, id, categories, data }) {

    const img1 = images?.[0]?.thumbnail_url
    const img2 = images?.[0]?.thumbnail_url || img1

    const { setOpenPopupModal, setDataView } = useMainContext()

    const { loading: addWishlistLoading } = useAsync(profileService.addWishlist)

    const { addProduct, onAddWishList, loading } = useProductCard(data)


    const handlePopup = () =>{
        setOpenPopupModal(true);
        setDataView(data)
    }

  return (
    <>
        <div className="col-6 col-md-4">
            <div className="card mb-7">
            <div className="badge badge-white card-badge card-badge-left text-uppercase">
                New
            </div>
            
            <div className="card-img">
                <Link className="card-img-hover" to={`/product/${id}`}>
                    <img className="card-img-top card-img-back" src={img1} alt="..." />
                    <img className="card-img-top card-img-front" src={img1} alt="..." />
                </Link>
                <div className="card-actions">
                <span className="card-action" onClick={handlePopup}>
                    <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="modal" data-target="#modalProduct">
                    <i className="fe fe-eye" />
                    </button>
                </span>
                <span className="card-action">
                    {
                        loading ? <Spin /> : <button onClick={addProduct} className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                                                <i className="fe fe-shopping-cart" />
                                            </button>
                    }
                    
                </span>
                <span className="card-action">
                    {
                        addWishlistLoading ? <Spin /> : <button onClick={onAddWishList} className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                                                            <i className="fe fe-heart" />
                                                        </button>
                    }
                </span>
                </div>
            </div>
            {/* Body */}
            <div className="card-body px-0">
                {/* Category */}
                <div className="font-size-xs">
                    <a className="text-muted" href="shop.html">{categories}</a>
                </div>
                {/* Title */}
                <div className="font-weight-bold">
                <a className="text-body" href="product.html">
                    {name}
                </a>
                </div>
                {/* Price */}
                <div className="font-weight-bold">
                    <span className="font-size-xs text-gray-350 text-decoration-line-through">{currency(price)}</span>
                    <span className="text-primary" style={{paddingLeft: 5}}>{currency(real_price)}</span>
                </div>
            </div>
            </div>
        </div>

    </>
  )
}

export default ProductCard