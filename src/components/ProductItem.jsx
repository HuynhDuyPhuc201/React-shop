

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeCartAction, updateQuantityCartAction } from '../store/cartReducer'
import { currency } from '../utils/currency'
import InputQuantity from './InputQuantity'



function ProductItem({ product, quantity, allowAction}) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const img1 = product.images?.[0]?.thumbnail_url

    const removeProductItem = () =>{
        dispatch(removeCartAction({
            id: product.id,
        }))
    }
    
    const onRemove = (e) =>{
        e.preventDefault()
        removeProductItem()
    }

    const updateQuantity = (quantity) =>{
        setLoading(true)
        dispatch(updateQuantityCartAction({
            id: product.id,
            quantity,
            finally: () =>{
                setLoading(false)
            }
        }))
        if(quantity === 0) return removeProductItem()
    }

  return (
    <li className="list-group-item">
        <div className="row align-items-center">
            <div className="col-4">
            {/* Image */}
            <a href="./product.html">
                <img className="img-fluid" src={img1} alt="..." />
            </a>
            </div>
            <div className="col-8">
            {/* Title */}
            <p className="font-size-sm font-weight-bold mb-6">
                <a className="text-body" href="./product.html">{ product.name }</a> <br />
                <span className="text-muted">{currency(product.real_price)} vnđ</span>
            </p>
            {/*Footer */}
            {
                allowAction && (
                    <div className="d-flex align-items-center">
                        <InputQuantity 
                            onDecrement = {() => updateQuantity( quantity - 1 )}
                            onIncrement = {() => updateQuantity( quantity + 1 )}
                            value={quantity}
                            loading={loading}
                        />
                        
                        <a onClick={onRemove} className="font-size-xs text-gray-400 ml-auto" href="#!">
                            <i className="fe fe-x" /> Remove
                        </a>
                    </div>
                )
            }
                
            </div>
        </div>
    </li>
  )
}

export default ProductItem