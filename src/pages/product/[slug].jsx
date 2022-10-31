import { Skeleton, Spin } from "antd"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Tab } from "../../components/Tab"
import { useQuery } from "../../core/hooks"
import { useProductCard } from "../../hooks/useProductCard"
import productService from "../../services/product.service"
import { currency } from "../../utils/currency"


function ProductDetail() {
  const { slug } = useParams()
  const { dataDetail, loading } = useQuery(() => productService.getProductDetail(slug), [slug])

  const [ type, setType] = useState('Description')
  const Tabs = ['Description', 'Top Features', 'Shipping & Return']
  
  const { addProduct, onAddWishList } = useProductCard(dataDetail)
  
  return (
    <>
      <nav className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Breadcrumb */}
              <ol className="breadcrumb mb-0 font-size-xs text-gray-400">
                <li className="breadcrumb-item">
                  <a className="text-gray-400" href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a className="text-gray-400" href="shop.html">Women's Shoes</a>
                </li>
                <li className="breadcrumb-item active">
                  Leather Sneakers
                </li>
              </ol>
            </div>
          </div>
        </div>
      </nav>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-12 col-md-6">
                  {/* Card */}
                  <div className="card">
                    {/* Badge */}
                    <div className="badge badge-primary card-badge text-uppercase">
                      Sale
                    </div>
                    {/* Slider */}
                    <div className="mb-4" data-flickity="{&quot;draggable&quot;: false, &quot;fade&quot;: true}" id="productSlider">
                      {/* Item */}
                      <a href={dataDetail.thumbnail_url} data-fancybox>
                        <img src={dataDetail.thumbnail_url} alt="..." className="card-img-top" />
                      </a>
                    </div>
                  </div>
                  {/* Slider */}
                      <div className="row">
                      {
                        dataDetail.images && (dataDetail.images?.map(img => (
                          <div className="col-4 px-2" style={{maxWidth: '113px'}}>
                            <div className="embed-responsive embed-responsive-1by1 bg-cover" style={{backgroundImage: `url(${img.thumbnail_url})`}} />
                          </div>
                        )))
                      }
                      </div>
                </div>
                <div className="col-12 col-md-6 pl-lg-10">
                  {/* Header */}
                  <div className="row mb-1">
                    <div className="col">
                      {/* Preheading */}
                      <a className="text-muted" href="shop.html">Sneakers</a>
                    </div>
                    <div className="col-auto">
                      {/* Rating */}
                      <div className="rating font-size-xs text-dark" data-value={dataDetail.rating_average}>
                        <div className="rating-item">
                          <i className="fas fa-star" />
                        </div>
                        <div className="rating-item">
                          <i className="fas fa-star" />
                        </div>
                        <div className="rating-item">
                          <i className="fas fa-star" />
                        </div>
                        <div className="rating-item">
                          <i className="fas fa-star" />
                        </div>
                        <div className="rating-item">
                          <i className="fas fa-star" />
                        </div>
                      </div>
                      <a className="font-size-sm text-reset ml-2" href="#reviews">
                        Reviews ({dataDetail.rating_average})
                      </a>
                    </div>
                  </div>
                  {/* Heading */}
                  <h3 className="mb-2">{dataDetail.name}</h3>
                  {/* Price */}
                  <div className="mb-7">
                    <span className="font-size-lg font-weight-bold text-gray-350 text-decoration-line-through">{currency(dataDetail.price)}</span>
                    <span className="ml-1 font-size-h5 font-weight-bolder text-primary">{currency(dataDetail.real_price)}</span>
                    <span className="font-size-sm ml-1">(In Stock)</span>
                  </div>
                  {/* Form */}
                  <div>
                    <div className="form-group">
                      {/* Label */}
                      <p>Màu:</p>
                      <div className="mb-2">
                          {
                              dataDetail.configurable_options && (
                                  dataDetail.configurable_options.map((e) => (
                                      e.values.map(e => (
                                          <div key={e.label} className="custom-control custom-control-inline custom-control-size mb-2">
                                              <input type="radio" className="custom-control-input" id="modalProductSizeThree" defaultValue={e.label} data-toggle="form-caption" data-target="#modalProductSizeCaption" />
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
                                <input type="radio" className="custom-control-input" id="modalProductColorOne" data-toggle="form-caption" data-target="#modalProductColorCaption" defaultValue="White" defaultChecked />
                                <label className="custom-control-label" htmlFor="modalProductColorOne">
                                    {
                                        dataDetail.images && (
                                          <img  className="img-fluid" src={dataDetail.images[0].small_url} alt="..." />
                                        )
                                    }
                                </label>
                                </div>
                            </div>
                    </div>
                    <div className="form-group">
                      <div className="form-row mb-7">
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
                      {/* Text */}
                      <p>
                        <span className="text-gray-500">Is your size/color sold out?</span>
                        <a className="text-reset text-decoration-underline" data-toggle="modal" href="#modalWaitList">Join the
                          Wait List!</a>
                      </p>
                      {/* Share */}
                      <p className="mb-0">
                        <span className="mr-4">Share:</span>
                        <a className="btn btn-xxs btn-circle btn-light font-size-xxxs text-gray-350" href="#!">
                          <i className="fab fa-twitter" />
                        </a>
                        <a className="btn btn-xxs btn-circle btn-light font-size-xxxs text-gray-350" href="#!">
                          <i className="fab fa-facebook-f" />
                        </a>
                        <a className="btn btn-xxs btn-circle btn-light font-size-xxxs text-gray-350" href="#!">
                          <i className="fab fa-pinterest-p" />
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* DESCRIPTION */}
      <section className="pt-11">
        <div className="container">
          <div className="row">
            <Tab defaultValue={0}>
              <div className="col-12">
                {/* Nav */}
                <div className="nav nav-tabs nav-overflow justify-content-start justify-content-md-center border-bottom">
                  <Tab.Title index={0} className="nav-link active" data-toggle="tab" href="#descriptionTab">
                    Description
                  </Tab.Title>
                  <Tab.Title index={1} className="nav-link" data-toggle="tab" href="#sizeTab">
                    Size &amp; Fit
                  </Tab.Title>
                  <Tab.Title index={2} className="nav-link" data-toggle="tab" href="#shippingTab">
                    Shipping &amp; Return
                  </Tab.Title>
                </div>
                {/* Content */}
                <div className="tab-content">
                  <Tab.Content index={0} className="tab-pane fade show active" id="descriptionTab">
                  <div className="row justify-content-center py-9">
                    <div className="col-12 col-lg-10 col-xl-8">
                      <div className="row">
                        <div className="col-12">
                          {/* Text */}
                          <p className="text-gray-500">
                            {dataDetail.short_description}
                          </p>
                        </div>
                        <div className="col-12 col-md-12">
                          <ul className="list list-unstyled mb-0">
                            {
                              dataDetail.specifications &&  dataDetail.specifications.map(item => (
                                item.attributes.map(e => (
                                  <li key={e.name}>
                                    <strong>{e.name}</strong>: {e.value}
                                  </li>
                                ))
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  </Tab.Content>
                  <Tab.Content index={1} className="tab-pane fade" id="sizeTab">
                    <div className="row justify-content-center py-9">
                      <div className="col-12 col-lg-10 col-xl-8">
                        <div className="row">
                          <div className="col-12 col-md-12">
                            {/* Text */}
                            <p className="mb-4">
                              <strong>Top Features:</strong>
                            </p>
                            {/* List */}
                            <ul className="mb-md-0 text-gray-500">
                              {
                                dataDetail.top_features && dataDetail.top_features.map(item => (
                                  <li key={item}>{item}</li>
                                ))
                              }
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab.Content>
                  <Tab.Content index={2} className="tab-pane fade" id="shippingTab">
                    <div className="table-responsive mb-6 py-9">
                        <table className="table table-bordered table-sm table-hover mb-0">
                            <tbody>
                                <tr>
                                    <td>
                                        <div>
                                            <span>
                                                Tiêu chuẩn
                                            </span>
                                        </div>
                                    </td>
                                    <td>Delivery in 5 - 7 working days</td>
                                    <td>14.000 vnđ</td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            <span>
                                                Giao hàng nhanh
                                            </span>
                                        </div>
                                    </td>
                                    <td>Delivery in 3 - 5 working days</td>
                                    <td>35.000 vnđ</td>
                                </tr>
                            </tbody>
                            
                        </table>
                        <p className="mb-0 text-gray-500">
                          May, life blessed night so creature likeness their, for. <a className="text-body text-decoration-underline" href="#!">Find out more</a>
                        </p>
                    </div>
                  </Tab.Content>
                </div>
              </div>
            </Tab>
            
          </div>
        </div>
      </section>
      {/* PRODUCTS */}
      <section className="pt-11">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Heading */}
              <h4 className="mb-10 text-center">You might also like</h4>
              {/* Items */}
              <div className="row">
                <div className="col-6 col-sm-6 col-md-4 col-lg-3">
                  {/* Card */}
                  <div className="card mb-7">
                    {/* Badge */}
                    <div className="badge badge-white card-badge card-badge-left text-uppercase">
                      New
                    </div>
                    {/* Image */}
                    <div className="card-img">
                      {/* Image */}
                      <a className="card-img-hover" href="product.html">
                        <img className="card-img-top card-img-back" src="/img/products/product-120.jpg" alt="..." />
                        <img className="card-img-top card-img-front" src="/img/products/product-5.jpg" alt="..." />
                      </a>
                      {/* Actions */}
                      <div className="card-actions">
                        <span className="card-action">
                          <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="modal" data-target="#modalProduct">
                            <i className="fe fe-eye" />
                          </button>
                        </span>
                        <span className="card-action">
                          <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                            <i className="fe fe-shopping-cart" />
                          </button>
                        </span>
                        <span className="card-action">
                          <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                            <i className="fe fe-heart" />
                          </button>
                        </span>
                      </div>
                    </div>
                    {/* Body */}
                    <div className="card-body px-0">
                      {/* Category */}
                      <div className="font-size-xs">
                        <a className="text-muted" href="shop.html">Shoes</a>
                      </div>
                      {/* Title */}
                      <div className="font-weight-bold">
                        <a className="text-body" href="product.html">
                          Leather mid-heel Sandals
                        </a>
                      </div>
                      {/* Price */}
                      <div className="font-weight-bold text-muted">
                        $129.00
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-sm-6 col-md-4 col-lg-3">
                  {/* Card */}
                  <div className="card mb-7">
                    {/* Image */}
                    <div className="card-img">
                      {/* Image */}
                      <a className="card-img-hover" href="product.html">
                        <img className="card-img-top card-img-back" src="/img/products/product-121.jpg" alt="..." />
                        <img className="card-img-top card-img-front" src="/img/products/product-6.jpg" alt="..." />
                      </a>
                      {/* Actions */}
                      <div className="card-actions">
                        <span className="card-action">
                          <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="modal" data-target="#modalProduct">
                            <i className="fe fe-eye" />
                          </button>
                        </span>
                        <span className="card-action">
                          <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                            <i className="fe fe-shopping-cart" />
                          </button>
                        </span>
                        <span className="card-action">
                          <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                            <i className="fe fe-heart" />
                          </button>
                        </span>
                      </div>
                    </div>
                    {/* Body */}
                    <div className="card-body px-0">
                      {/* Category */}
                      <div className="font-size-xs">
                        <a className="text-muted" href="shop.html">Dresses</a>
                      </div>
                      {/* Title */}
                      <div className="font-weight-bold">
                        <a className="text-body" href="product.html">
                          Cotton floral print Dress
                        </a>
                      </div>
                      {/* Price */}
                      <div className="font-weight-bold text-muted">
                        $40.00
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-sm-6 col-md-4 col-lg-3">
                  {/* Card */}
                  <div className="card mb-7">
                    {/* Badge */}
                    <div className="badge badge-dark card-badge card-badge-left text-uppercase">
                      Sale
                    </div>
                    {/* Image */}
                    <div className="card-img">
                      {/* Image */}
                      <a className="card-img-hover" href="product.html">
                        <img className="card-img-top card-img-back" src="/img/products/product-122.jpg" alt="..." />
                        <img className="card-img-top card-img-front" src="/img/products/product-7.jpg" alt="..." />
                      </a>
                      {/* Actions */}
                      <div className="card-actions">
                        <span className="card-action">
                          <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="modal" data-target="#modalProduct">
                            <i className="fe fe-eye" />
                          </button>
                        </span>
                        <span className="card-action">
                          <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                            <i className="fe fe-shopping-cart" />
                          </button>
                        </span>
                        <span className="card-action">
                          <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                            <i className="fe fe-heart" />
                          </button>
                        </span>
                      </div>
                    </div>
                    {/* Body */}
                    <div className="card-body px-0">
                      {/* Category */}
                      <div className="font-size-xs">
                        <a className="text-muted" href="shop.html">Shoes</a>
                      </div>
                      {/* Title */}
                      <div className="font-weight-bold">
                        <a className="text-body" href="product.html">
                          Leather Sneakers
                        </a>
                      </div>
                      {/* Price */}
                      <div className="font-weight-bold">
                        <span className="font-size-xs text-gray-350 text-decoration-line-through">$85.00</span>
                        <span className="text-primary">$85.00</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-sm-6 col-md-4 col-lg-3 d-md-none d-lg-block">
                  {/* Card */}
                  <div className="card mb-7">
                    {/* Image */}
                    <div className="card-img">
                      {/* Image */}
                      <a href="#!">
                        <img className="card-img-top card-img-front" src="/img/products/product-8.jpg" alt="..." />
                      </a>
                      {/* Actions */}
                      <div className="card-actions">
                        <span className="card-action">
                          <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="modal" data-target="#modalProduct">
                            <i className="fe fe-eye" />
                          </button>
                        </span>
                        <span className="card-action">
                          <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                            <i className="fe fe-shopping-cart" />
                          </button>
                        </span>
                        <span className="card-action">
                          <button className="btn btn-xs btn-circle btn-white-primary" data-toggle="button">
                            <i className="fe fe-heart" />
                          </button>
                        </span>
                      </div>
                    </div>
                    {/* Body */}
                    <div className="card-body px-0">
                      {/* Category */}
                      <div className="font-size-xs">
                        <a className="text-muted" href="shop.html">Tops</a>
                      </div>
                      {/* Title */}
                      <div className="font-weight-bold">
                        <a className="text-body" href="product.html">
                          Cropped cotton Top
                        </a>
                      </div>
                      {/* Price */}
                      <div className="font-weight-bold text-muted">
                        $29.00
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductDetail