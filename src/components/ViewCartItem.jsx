import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeCartAction, updateQuantityCartAction } from '../store/cartReducer'
import { currency } from '../utils/currency'
import InputQuantity from './InputQuantity'

function ViewProductItem({ product, quantity }) {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const removeProductItem = (ev) =>{
        ev.preventDefault()
        dispatch(removeCartAction({
            id: product.id,
        }))
    }
    
    const onInDecrement = (note) =>{
        setLoading(true)
        dispatch(updateQuantityCartAction({
            id: product.id,
            quantity: note,
            finally: () =>{
                setLoading(false)
            }
        }))
       
        if(quantity === 0) return removeProductItem()
    }

    return (
        <li className="list-group-item">
            <div className="row align-items-center">
                <div className="col-3">
                    {/* Image */}
                    <a href="product.html">
                        <img src={product.images?.[0]?.thumbnail_url} alt="..." className="img-fluid" />
                    </a>
                </div>
                <div className="col">
                    {/* Title */}
                    <div className="d-flex mb-2 font-weight-bold">
                        <a className="text-body" href="product.html">
                            {product.name}
                        </a>{" "}
                        <span className="ml-auto">{currency(product.real_price)} vnđ</span>
                    </div>
                    {/*Footer */}
                    <div className="d-flex align-items-center">
                        {/* Select */}
                        <InputQuantity
                            value={quantity} 
                            onDecrement = {() => {onInDecrement(quantity - 1)}}
                            onIncrement = {() => {onInDecrement(quantity + 1)}}
                            loading={loading}
                        />
                        {/* Remove */}
                        <a onClick={removeProductItem} className="font-size-xs text-gray-400 ml-auto" href="#!">
                            <i className="fe fe-x" /> Remove
                        </a>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default ViewProductItem