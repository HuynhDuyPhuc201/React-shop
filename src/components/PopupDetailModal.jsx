

import { message } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { path } from '../config/path';
import { useAsync } from '../core/hooks';
import { cn } from '../core/utils';
import { useAuth } from '../hooks/useAuth';
import { useMainContext } from '../hooks/usePage'
import profileService from '../services/profile.service';
import { addCartAction } from '../store/cartReducer';
import { currency } from '../utils/currency';

const style = {
  opacity: 1,
  display: "block",
}

const styleBackdrop = {
  opacity: .3,
  display: "block",
}

function PopupDetailModal() {

    const { openPopupModal, setOpenPopupModal, dataView} = useMainContext();

    const [ loading, setLoading ] = useState(false)
  
    const { excute: addWishlist} = useAsync(profileService.addWishlist)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useAuth()
   
    let id = dataView.id
    let name = dataView.name    
    let _id = dataView._id

    const addProduct = () =>{
        if(user){
            setLoading(true)
            dispatch(addCartAction({
                id,
                success: () =>{
                    message.success(`Thêm sản phẩm ${name} vào giỏ hàng thành công`)
                },
                finally: () =>{
                    setLoading(false)
                }
            }))
        }else{
            navigate(path.Auth)
            setOpenPopupModal(false)
        }
    }

    const onAddWishList = async () =>{
        if(user){
            try {
                await addWishlist(_id)
                message.success(`Thêm sản phẩm ${name} vào mục yêu thích thành công`)
            } catch (error) {
                message.error(error)
            }
        }else{
            navigate(path.Auth)
            setOpenPopupModal(false)
        }
    }
  
  return (
    <>
      <div className={cn('modal fade', {
        'show': openPopupModal
      } )} id="modalProduct" tabIndex={-1} role="dialog" aria-hidden="true" style={openPopupModal ? style : {}}>
        <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                <div className="modal-content">
                    {/* Close */}
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>setOpenPopupModal(false)}>
                    <i className="fe fe-x" aria-hidden="true" />
                    </button>
                    {/* Content */}
                    <div className="container-fluid px-xl-0">
                    <div className="row align-items-center mx-xl-0">
                        <div className="col-12 col-lg-6 col-xl-5 py-4 py-xl-0 px-xl-0">
                        {/* Image */}
                        <img className="img-fluid" src={dataView.thumbnail_url} alt="..." />
                        {/* Button */}
                        <Link onClick={()=>setOpenPopupModal(false)} className="btn btn-sm btn-block btn-primary" to={`/product/${dataView.id}`}>
                            More Product Info <i className="fe fe-info ml-2" />
                        </Link>
                        </div>
                        <div className="col-12 col-lg-6 col-xl-7 py-9 px-md-9">
                        {/* Heading */}
                        <h4 className="mb-3">{dataView.name}</h4>
                        {/* Price */}
                        <div className="mb-7">
                            <span className="h5 text-primary">{currency(dataView.real_price)}</span>
                            <span className="h5 text-decoration-line-through text-gray-350" style={{padding: 10}}>{currency(dataView.price)}</span>
                            <span className="font-size-sm">(In Stock)</span>
                        </div>
                        {/* Form */}
                        <div>
                            <div className="form-group">
                            {/* Label */}
                            <p>Màu:</p>
                            <div className="mb-2">
                                {
                                    dataView.configurable_options && (
                                        dataView.configurable_options.map((e) => (
                                            e.values.map(e => (
                                                <div key={e.label} className="custom-control custom-control-inline custom-control-size mb-2">
                                                    <input type="radio" className="custom-control-input" name="modalProductSize" id="modalProductSizeThree" defaultValue={e.label} data-toggle="form-caption" data-target="#modalProductSizeCaption" />
                                                    <label className="custom-control-label" htmlFor="modalProductSizeThree">{e.label}</label>
                                                </div>
                                            ))
                                        ))
                                    )
                                }
                            </div>
                            {/* Radio */}
                            <div className="mb-8 ml-n1">
                                <div className="custom-control custom-control-inline custom-control-img">
                                <input type="radio" className="custom-control-input" id="modalProductColorOne" name="modalProductColor" data-toggle="form-caption" data-target="#modalProductColorCaption" defaultValue="White" defaultChecked />
                                <label className="custom-control-label" htmlFor="modalProductColorOne">
                                    {
                                        dataView.images && <img  className="img-fluid" src={dataView.images[0].small_url} alt="..." />
                                    }
                                </label>
                                </div>
                            </div>
                            </div>
                            <div className="form-group mb-0">
                            <div className="form-row">
                                <div className="col-12 col-lg-auto">
                                {/* Quantity */}
                                <select defaultValue={1} className="custom-select mb-2">
                                    <option value={1} selected>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                                </div>
                                <div className="col-12 col-lg">
                                {/* Submit */}
                                <button type="submit" onClick={addProduct} className="btn btn-block btn-dark mb-2">
                                    Add to Cart <i className="fe fe-shopping-cart ml-2" />
                                </button>
                                </div>
                                <div className="col-12 col-lg-auto">
                                {/* Wishlist */}
                                <button onClick={onAddWishList} className="btn btn-outline-dark btn-block mb-2" data-toggle="button">
                                    Wishlist <i className="fe fe-heart ml-2" />
                                </button>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
        </div>
      </div>
      
      <div className='modal-backdrop fade' style={openPopupModal ? styleBackdrop : {}}></div>
    </>
    
  )
}

export default PopupDetailModal