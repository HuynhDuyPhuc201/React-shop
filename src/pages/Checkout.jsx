import React, { useEffect, useState } from 'react'
import ProductItem from '../components/ProductItem'
import Button from '../components/Button'
import TotalWidget from '../components/TotalWidget'
import { useAsync, useForm, useQuery } from '../core/hooks'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'
import Input from '../components/Input'
import profileService from '../services/profile.service'
import { currency } from '../utils/currency'
import cartService from '../services/cart.service'
import { useDispatch } from 'react-redux'
import { getCartAction } from '../store/cartReducer'
import { generatePath, Navigate, useNavigate } from 'react-router-dom'
import { path } from '../config/path'
import { message } from 'antd'
import getCurrentDate from '../components/GetDate'

function Checkout() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cart } = useCart()
    const { user } = useAuth()

    const { excute: checkout, loading, error } = useAsync(cartService.checkout)
    const { data: address } = useQuery(() => profileService.getAddressDefault())
    const { form, setForm, register, validate} = useForm({
        fullName:[
            { required: true }
        ],
        phone:[
            { required: true },
            { regexp: 'phone' }
        ],
        email:[
            { required: true },
            { regexp: 'email' }
        ],
        district:[
            { required: true }
        ],
        province:[
            { required: true }
        ],
        address:[
            { required: true }
        ],
        date:[
            { required: false }
         ],
    })

    useEffect(() =>{
        if(address){
            setForm(address)
        }
    }, [address])

    const onSubmit = async () =>{
        setForm(
            (prevState) => ({
                ...prevState,
                date: getCurrentDate(),
              })
        )
        if(validate()){
            const res = await (checkout({
                "shippingMethod": cart.shippingMethod,
                "paymentMethod": cart.paymentMethod,
                "shippingAddress": form,
                "note": form.note,
                "date": form.date,
            }))
            
            navigate(generatePath(path.OrderComplete, { id: res.data._id }))
        }else{
            message.error('Chưa nhập địa chỉ')
        }
    }

    const onChangeShippingMethod = async (method) =>{
        await cartService.changeShippingMethod(method)
        dispatch(getCartAction())
    }

    if ( !user ){
        return <Navigate to={path.Auth} />
    }

    if ( cart.totalQuantity === 0 ){
        return <Navigate to={path.Product} />
    }

    return (
        <section className="pt-7 pb-12">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        {/* Heading */}
                        <h3 className="mb-4">Checkout</h3>
                        {/* Subheading */}
                        <p className="mb-10">
                            Already have an account?{" "}
                            <a className="font-weight-bold text-reset" href="#!">
                                Click here to login
                            </a>
                        </p>
                        <p style={{ color: 'red' }}>{error}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-7">
                        {/* Form */}
                        <form>
                            {/* Heading */}
                            <h6 className="mb-7">Billing Details</h6>
                            {/* Billing details */}
                            <div className="row mb-9">
                                <div className="col-12 col-md-12">
                                    {/* First Name */}
                                    <Input
                                        placeholder="Full name *"
                                         {...register('fullName')}
                                    />
                                </div>
                                <div className="col-12">
                                    <Input
                                        placeholder="Email Address *"
                                         {...register('email')}
                                    />
                                </div>
                                <div className="col-12">
                                    <Input
                                        placeholder="Phone *"
                                         {...register('phone')}
                                    />
                                </div>
                                <div className="col-12">
                                    <Input
                                        placeholder="Address *"
                                         {...register('address')}
                                    />
                                </div>
                                <div className="col-12">
                                    <Input
                                        placeholder="Province *"
                                         {...register('province')}
                                    />
                                </div>
                                <div className="col-12">
                                    <Input
                                        placeholder="district *"
                                         {...register('district')}
                                    />
                                </div>
                            </div>
                            {/* Heading */}
                            <h6 className="mb-7">Shipping Details</h6>
                            {/* Shipping details */}
                            <div className="table-responsive mb-6">
                                <table className="table table-bordered table-sm table-hover mb-0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="custom-control custom-radio">
                                                
                                                    <input onChange={() => onChangeShippingMethod('tieu-chuan')} checked={cart.shippingMethod === 'tieu-chuan'} className="custom-control-input" id="checkoutShippingStandard"
                                                    name="shipping" type="radio" />
                                                   
                                                    <label className="custom-control-label text-body text-nowrap"
                                                        htmlFor="checkoutShippingStandard">
                                                        Tiêu chuẩn
                                                    </label>
                                                </div>
                                            </td>
                                            <td>Delivery in 5 - 7 working days</td>
                                            <td>{currency(14000)} vnđ</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="custom-control custom-radio">
                                                    <input onChange={() => onChangeShippingMethod('giao-hang-nhanh')} checked={cart.shippingMethod === 'giao-hang-nhanh'} className="custom-control-input" id="checkoutShippingExpress"
                                                        name="shipping" type="radio" />
                                                    <label className="custom-control-label text-body text-nowrap"
                                                        htmlFor="checkoutShippingExpress">
                                                        Giao hàng nhanh
                                                    </label>
                                                </div>
                                            </td>
                                            <td>Delivery in 3 - 5 working days</td>
                                            <td>{currency(35000)} vnđ</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Address */}
                            <div className="mb-9">
                               
                                {/* Collapse */}
                                <div className="collapse" id="checkoutShippingAddressCollapse">
                                    <div className="row mt-6">
                                        <div className="col-12">
                                            {/* Country */}
                                            <div className="form-group">
                                                <label htmlFor="checkoutShippingAddressCountry">
                                                    Country *
                                                </label>
                                                <input className="form-control form-control-sm"
                                                    id="checkoutShippingAddressCountry" type="text" placeholder="Country" />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            {/* Address Line 1 */}
                                            <div className="form-group">
                                                <label htmlFor="checkoutShippingAddressLineOne">
                                                    Address Line 1 *
                                                </label>
                                                <input className="form-control form-control-sm"
                                                    id="checkoutShippingAddressLineOne" type="text"
                                                    placeholder="Address Line 1" />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            {/* Address Line 2 */}
                                            <div className="form-group">
                                                <label htmlFor="checkoutShippingAddressLineTwo">
                                                    Address Line 2
                                                </label>
                                                <input className="form-control form-control-sm"
                                                    id="checkoutShippingAddressLineTwo" type="text"
                                                    placeholder="Address Line 2 (optional)" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Heading */}
                            <h6 className="mb-7">Payment</h6>
                            {/* List group */}
                            <div className="list-group list-group-sm mb-7">
                                <div className="list-group-item">
                                    {/* Radio */}
                                    <div className="custom-control custom-radio">
                                        {/* Input */}
                                        <input className="custom-control-input" id="checkoutPaymentCard" name="payment"
                                            type="radio" data-toggle="collapse" data-action="show"
                                            data-target="#checkoutPaymentCardCollapse" />
                                        {/* Label */}
                                        <label className="custom-control-label font-size-sm text-body text-nowrap"
                                            htmlFor="checkoutPaymentCard">
                                            Credit Card{" "}
                                            <img className="ml-2" src="/img/brands/color/cards.svg" alt="..." />
                                        </label>
                                    </div>
                                </div>
                                <div className="list-group-item collapse py-0" id="checkoutPaymentCardCollapse">
                                    {/* Form */}
                                    <div className="form-row py-5">
                                        <div className="col-12">
                                            <div className="form-group mb-4">
                                                <label className="sr-only" htmlFor="checkoutPaymentCardNumber">
                                                    Card Number
                                                </label>
                                                <input className="form-control form-control-sm" id="checkoutPaymentCardNumber"
                                                    type="text" placeholder="Card Number *" required="" />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group mb-4">
                                                <label className="sr-only" htmlFor="checkoutPaymentCardName">
                                                    Name on Card
                                                </label>
                                                <input className="form-control form-control-sm" id="checkoutPaymentCardName"
                                                    type="text" placeholder="Name on Card *" required="" />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="form-group mb-md-0">
                                                <label className="sr-only" htmlFor="checkoutPaymentMonth">
                                                    Month
                                                </label>
                                                <select className="custom-select custom-select-sm" id="checkoutPaymentMonth">
                                                    <option>January</option>
                                                    <option>February</option>
                                                    <option>March</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="form-group mb-md-0">
                                                <label className="sr-only" htmlFor="checkoutPaymentCardYear">
                                                    Year
                                                </label>
                                                <select className="custom-select custom-select-sm" id="checkoutPaymentCardYear">
                                                    <option>2017</option>
                                                    <option>2018</option>
                                                    <option>2019</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="input-group input-group-merge">
                                                <input className="form-control form-control-sm" id="checkoutPaymentCardCVV"
                                                    type="text" placeholder="CVV *" required="" />
                                                <div className="input-group-append">
                                                    <span className="input-group-text" data-toggle="popover"
                                                        data-placement="top" data-trigger="hover"
                                                        data-content="The CVV Number on your credit card or debit card is a 3 digit number on VISA, MasterCard and Discover branded credit and debit cards.">
                                                        <i className="fe fe-help-circle" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-group-item">
                                    {/* Radio */}
                                    <div className="custom-control custom-radio">
                                        {/* Input */}
                                        <input className="custom-control-input" id="checkoutPaymentPaypal" name="payment"
                                            type="radio" data-toggle="collapse" data-action="hide"
                                            data-target="#checkoutPaymentCardCollapse" />
                                        {/* Label */}
                                        <label className="custom-control-label font-size-sm text-body text-nowrap"
                                            htmlFor="checkoutPaymentPaypal">
                                            <img src="/img/brands/color/paypal.svg" alt="..." />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {/* Notes */}
                            <textarea {...register('note')} className="form-control form-control-sm mb-9 mb-md-0 font-size-xs" rows={5}
                                placeholder="Order Notes (optional)" defaultValue={""} />
                            </form>
                    </div>
                    <div className="col-12 col-md-5 col-lg-4 offset-lg-1">
                        {/* Heading */}
                        <h6 className="mb-7">Order Items ({cart.totalQuantity})</h6>
                        {/* Divider */}
                        <hr className="my-7" />
                        {/* List group */}
                        <ul className="list-group list-group-lg list-group-flush-y list-group-flush-x mb-7">
                            {
                                cart?.listItems ? cart?.listItems.map(e => <ProductItem key={e.product.id} {...e}/>) : ''
                            }
                        </ul>
                        {/* Card */}

                        <TotalWidget cart={cart} showShipping className="mb-7 bg-light"/>

                        {/* Disclaimer */}
                        <p className="mb-7 font-size-xs text-gray-500">
                        Your personal data will be used to process your order, support your
                        experience throughout this website, and for other purposes described
                        in our privacy policy.
                        </p>
                        {/* Button */}
                        <Button loading={loading} onClick={onSubmit} className="btn btn-block btn-dark">Place Order</Button>
                    </div>
                </div>
            </div>

        </section>


    )
}

export default Checkout