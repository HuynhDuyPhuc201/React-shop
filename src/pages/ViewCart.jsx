import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import Button from '../components/Button'
import ViewCartItem from '../components/ViewCartItem'
import { useAsync } from '../core/hooks'
import { useCart } from '../hooks/useCart'
import cartService from '../services/cart.service'
import { getCartAction } from '../store/cartReducer'
import { currency } from '../utils/currency'
import { path } from '../../src/config/path'
import TotalWidget from '../components/TotalWidget'

function ViewCart() {

    const { cart } = useCart()
    const [promotion, setPromotion] = useState('')
    const { excute: addPromotion, error, setError, loading} = useAsync(cartService.addPromotion)
    const { excute: removePromotion } = useAsync(cartService.removePromotion)
    const dispatch = useDispatch()

    useEffect( () =>{
        if(cart.promotionCode){
            setPromotion(cart.promotionCode)
        }else{
            setPromotion('')
        }
    }, [cart.promotionCode])

    const onAddPromotion = async (e) =>{
        e.preventDefault();
        if(promotion.trim()){
            await addPromotion({ promotionCode : promotion })
            dispatch(getCartAction())
        }else{
            await removePromotion({ promotionCode : promotion })
            dispatch(getCartAction())
        }
    }

    if ( cart?.totalQuantity === 0 ){
        return <Navigate to={path.Product} />
    }

    return (
        <section className="pt-7 pb-12">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* Heading */}
                        <h3 className="mb-10 text-center">Shopping Cart</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-7">
                        {/* List group */}
                        <ul className="list-group list-group-lg list-group-flush-x mb-6">
                            {
                                cart?.listItems?.map(e => <ViewCartItem key={e.product.id} {...e} />)
                            }
                        </ul>
                        {/* Footer */}
                        <div className="row align-items-end justify-content-between mb-10 mb-md-0">
                            <div className="col-12 col-md-7">
                                {/* Coupon */}
                                <form className="mb-7 mb-md-0" onSubmit={onAddPromotion}>
                                    <label className="font-size-sm font-weight-bold" htmlFor="cartCouponCode">
                                        Coupon code:
                                    </label>
                                    {error && <p style={{ color: 'red' }}>{error}</p>}
                                    <div className="row form-row">
                                        <div className="col">
                                            {/* Input */}
                                            <input value={promotion} onChange={(e) => setPromotion(e.target.value)} className="form-control form-control-sm" id="cartCouponCode" type="text"
                                                placeholder="GIAM25, GIAM50,..." />
                                        </div>
                                        <div className="col-auto">
                                            {/* Button */}
                                            <Button loading={loading} className="btn btn-sm btn-dark" type="submit">
                                                Apply
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-5 col-lg-4 offset-lg-1">
                        {/* Total */}
                        <TotalWidget cart={cart} className="mb-7 bg-light"> 
                            <li className="list-group-item font-size-sm text-center text-gray-500">
                                Shipping cost calculated at Checkout *
                            </li>
                        </TotalWidget>
                        {/* Button */}
                        <Link className="btn btn-block btn-dark mb-2" to={path.Checkout}>
                            Proceed to Checkout
                        </Link>
                        {/* Link */}
                        <Link className="btn btn-link btn-sm px-0 text-body" to={path.Product}>
                            <i className="fe fe-arrow-left mr-2" /> Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ViewCart