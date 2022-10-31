

import React from 'react'
import { cn } from '../core/utils'
import { useCart } from '../hooks/useCart'
import { currency } from '../utils/currency'

function TotalWidget({ cart, children, showShipping, className }) {

    // const { cart } = useCart()
    
    const total = cart.total - cart.shipping

  return (
    <div className={cn('card', className)}>
        <div className="card-body">
            <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                <li className="list-group-item d-flex">
                    <span>Subtotal</span>{" "}
                    <span className="ml-auto font-size-sm">{currency(cart.subTotal)} vnđ</span>
                </li>
                {
                     cart.promotionPrice ? <li className="list-group-item d-flex">
                     <span>Promotion</span>{" "}
                     <span className="ml-auto font-size-sm">{currency(cart.promotionPrice)} vnđ</span>
                 </li> : ''
                }
                <li className="list-group-item d-flex">
                    <span>Tax</span>{" "}
                    <span className="ml-auto font-size-sm">{currency(cart.tax)} vnđ</span>
                </li>
                {
                    showShipping && <li className="list-group-item d-flex">
                                        <span>Ship</span>{" "}
                                        <span className="ml-auto font-size-sm">{currency(cart.shipping)} vnđ</span>
                                    </li> 
                }
                <li className="list-group-item d-flex font-size-lg font-weight-bold">
                    <span>Total</span>{" "}
                    {
                        showShipping ? <span className="ml-auto font-size-sm">{currency(cart.total)} vnđ</span> :
                        <span className="ml-auto font-size-sm">{currency(total)} vnđ</span>
                    }
                </li>
                {children}
            </ul>
        </div>
    </div>
  )
}

export default TotalWidget