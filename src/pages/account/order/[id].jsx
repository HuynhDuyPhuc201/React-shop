

import { Skeleton } from 'antd';
import React from 'react'
import { Navigate, useParams } from 'react-router-dom';
import getCurrentDate from '../../../components/GetDate';
import ProductItem from '../../../components/ProductItem';
import TotalWidget from '../../../components/TotalWidget';
import { path } from '../../../config/path';
import { useQuery } from '../../../core/hooks';
import orderService from '../../../services/order.service';
import profileService from '../../../services/profile.service';
import { currency } from '../../../utils/currency';

function MyOrderDetail() {

    const { id } = useParams()
    const { data, loading, error } = useQuery(() => orderService.getDetail(id))
    const { data: address } = useQuery(() => profileService.getAddressDefault())

    if(error)   return <Navigate to={path.Account.MyOrder} />
    if(loading) return [...Array(3)].map((e, i) => <Skeleton key={i}/>)

    return (
        <>
            {/* Order */}
            <div className="card card-lg mb-5 border">
                <div className="card-body pb-0">
                {/* Info */}
                <div className="card card-sm">
                    <div className="card-body bg-light">
                    <div className="row">
                        <div className="col-6 col-lg-3">
                        {/* Heading */}
                        <h6 className="heading-xxxs text-muted">Order No:</h6>
                        {/* Text */}
                        <p className="mb-lg-0 font-size-sm font-weight-bold">
                            {data._id}
                        </p>
                        </div>
                        <div className="col-6 col-lg-3">
                        {/* Heading */}
                        <h6 className="heading-xxxs text-muted">Order date:</h6>
                        {/* Text */}
                        <p className="mb-lg-0 font-size-sm font-weight-bold">
                            <time dateTime={data.shippingAddress.date}>
                            {
                                data.shippingAddress.date
                            }
                            </time>
                        </p>
                        </div>
                        <div className="col-6 col-lg-3">
                        {/* Heading */}
                        <h6 className="heading-xxxs text-muted">Status:</h6>
                        {/* Text */}
                            <p className="mb-0 font-size-sm font-weight-bold">
                                Awaiting Delivery
                            </p>
                        </div>
                        <div className="col-6 col-lg-3">
                        {/* Heading */}
                        <h6 className="heading-xxxs text-muted">Order Amount:</h6>
                        {/* Text */}
                        <p className="mb-0 font-size-sm font-weight-bold">
                            {currency(data.total)} vnđ
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="card-footer">
                {/* Heading */}
                <h6 className="mb-7">Order Items ({data.totalQuantity})</h6>
                {/* Divider */}
                <hr className="my-5" />
                {/* List group */}
                    <ul className="list-group list-group-lg list-group-flush-y list-group-flush-x">
                        {
                            data.listItems.map(e => <ProductItem key={e.product._id} {...e}/>)
                        }
                    </ul>
                </div>
            </div>
            <TotalWidget
                className="card-lg mb-5 border"
                cart={data}
                showShipping
            />
                        
            {/* Details */}
            <div className="card card-lg border">
                <div className="card-body">
                {/* Heading */}
                <h6 className="mb-7">Billing &amp; Shipping Details</h6>
                {/* Content */}
                <div className="row">
                    <div className="col-12 col-md-4">
                    {/* Heading */}
                    <p className="mb-4 font-weight-bold">
                        Billing Address:
                    </p>
                    <p className="mb-7 mb-md-0 text-gray-500">
                        { address.fullName || data.shippingAddress.fullName }<br />
                        { address.email || data.shippingAddress.email}<br />
                        { address.phone || data.shippingAddress.phone}<br />
                        { address.address || data.shippingAddress.address}<br />
                        { address.province || data.shippingAddress.province}<br />
                        { address.district || data.shippingAddress.district}
                    </p>
                    </div>
                    <div className="col-12 col-md-4">
                    {/* Heading */}
                    <p className="mb-4 font-weight-bold">
                        Shipping Address:
                    </p>
                    <p className="mb-7 mb-md-0 text-gray-500">
                        { address.address || data.shippingAddress.address}<br />
                        { address.province || data.shippingAddress.province}<br />
                        { address.district || data.shippingAddress.district}
                    </p>
                    </div>
                    <div className="col-12 col-md-4">
                    {/* Heading */}
                    <p className="mb-4 font-weight-bold">
                        Shipping Method:
                    </p>
                        { data.shippingMethod === 'tieu-chuan' ?
                             <p className="mb-7 text-gray-500">
                                Tiêu chuẩn <br />
                                (5 - 7 days)
                             </p>
                        : ''} 
                        { data.shippingMethod === 'giao-hang-nhanh' ?
                             <p className="mb-7 text-gray-500">
                                Giao hàng nhanh <br />
                                (3 - 5 days)
                             </p>
                        : ''
                        } 
                    {/* Heading */}
                    <p className="mb-4 font-weight-bold">
                        Payment Method:
                    </p>
                    <p className="mb-0 text-gray-500">
                        Debit Mastercard
                    </p>
                    </div>
                </div>
                </div>
            </div>
        </>
      );
}

export default MyOrderDetail