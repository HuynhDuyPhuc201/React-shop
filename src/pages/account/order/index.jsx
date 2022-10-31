


import React from 'react'
import { useDispatch } from 'react-redux'
import { generatePath, Link, useNavigate } from 'react-router-dom'
import Button from '../../../components/Button'
import Paginate from '../../../components/Paginate'
import { path } from '../../../config/path'
import { useAsync, useCurrentPage, useQuery } from '../../../core/hooks'
import orderService from '../../../services/order.service'
import { getCartAction } from '../../../store/cartReducer'
import { currency } from '../../../utils/currency'


function Order() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const currentPage = useCurrentPage()
    const { data, paginate, loading } = useQuery(() => orderService.getList(`?page=${currentPage}`), [currentPage])
    const { excute: reOrder, loading: reOrderLoading, error } = useAsync(() => orderService.reOrder)

    const renderImage = (listItems) =>{
        const list = []
        if(listItems.length >= 5){
            for(let i=0; i < 3; i++){
                const item = listItems[i]
                list.push(
                    <div className="col-3">
                        {/* Image */}
                        <div className="embed-responsive embed-responsive-1by1 bg-cover" style={{backgroundImage: `url(${item.product.images?.[0].thumbnail_url})`}} />
                    </div>
                )
            }
            list.push(
                <div className="col-3">
                    {/* Image */}
                    <div className="embed-responsive embed-responsive-1by1 bg-light">
                    <a className="embed-responsive-item embed-responsive-item-text text-reset" href="#!">
                        <div className="font-size-xxs font-weight-bold">
                        +{listItems.length - 3} <br /> more
                        </div>
                    </a>
                    </div>
                </div>
            )
        }else{
            for(let item of listItems){
                list.push(
                    <div className="col-3">
                        {/* Image */}
                        <div className="embed-responsive embed-responsive-1by1 bg-cover" style={{backgroundImage: `url(${item.product.images?.[0].thumbnail_url})`}} />
                    </div>
                )
            }
        }
        return list 
    }

    // video 16 45:50
    const onReOrder = (id) => async (ev) =>{
        ev.preventDefault();
        await reOrder(id)
        dispatch(getCartAction({
            success: () =>{
                navigate(path.ViewCart)
            }
        }))
        
    } 

    console.log('data', data)
    console.log('currentPage', currentPage)

    return (
        <>
          {/* Order */}

        {
            data?.map?.(e => (
                <div key={e._id} className="card card-lg mb-5 border">
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
                                {e._id}
                            </p>
                            </div>
                            <div className="col-6 col-lg-3">
                            {/* Heading */}
                            <h6 className="heading-xxxs text-muted">Order date:</h6>
                            {/* Text */}
                            <p className="mb-lg-0 font-size-sm font-weight-bold">
                                {
                                    e.shippingAddress?.date ? (
                                        <time dateTime={e.shippingAddress.date}> {e.shippingAddress.date}</time>
                                    ): ''
                                }
                            </p>
                            </div>
                            <div className="col-6 col-lg-3">
                            {/* Heading */}
                            <h6 className="heading-xxxs text-muted">Status:</h6>
                            {/* Text */}
                            <p className="mb-0 font-size-sm font-weight-bold">
                                Delivered
                            </p>
                            </div>
                            <div className="col-6 col-lg-3">
                            {/* Heading */}
                            <h6 className="heading-xxxs text-muted">Order Amount:</h6>
                            {/* Text */}
                            <p className="mb-0 font-size-sm font-weight-bold">
                               {currency(e.total)} vnđ
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="card-footer">
                    <div className="row align-items-center">
                        <div className="col-12 col-lg-6">
                        <div className="form-row mb-4 mb-lg-0">
                          {
                            renderImage(e.listItems)
                          }
                        </div>
                        </div>
                        <div className="col-12 col-lg-6">
                        <div className="form-row">
                            <div className="col-6">
                            {/* Button */}
                            <Link className="btn btn-sm btn-block btn-outline-dark" to={generatePath(path.Account.MyOrderDetail, {id: e._id})}>
                                Order Details
                            </Link>
                            </div>
                            <div className="col-6">
                            {/* Button */}
                            <Button loading={reOrderLoading} onClick={onReOrder(e._id)} className="btn btn-sm btn-block btn-outline-dark" href="#!">
                                Re order
                            </Button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            ))
        }
        {
            !data && <h6>Chưa có đơn đặt hàng</h6> 
        }

          
          {/* Pagination */}
          { !loading && <Paginate totalPage={paginate.totalPage}/>}
        </>
      )
}

export default Order
