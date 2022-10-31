import { useQuery, useSearch } from '../core/hooks';
import productService from '../services/product.service';
import ProductCard from '../components/ProductCard'
import Paginate from '../components/Paginate';
import { Link, NavLink, useParams, useSearchParams } from 'react-router-dom';
import LoadingCard from '../components/loading/LoadingCard';
import Slider from '../components/Slider';
import { useCategory } from '../hooks/useCategory';
import { Skeleton } from 'antd';
import { useCategoryDetail } from '../hooks/useCategoryDetail';
import Breadcrumb from '../components/Breadcrumb';


function shop() {

    const [sort, setSort] = useSearch('sort', 'real_price.asc')
    const { catId } = useParams()
    const [searchParams] = useSearchParams()
    const search = searchParams.get('search')
    const currentPage = parseInt(searchParams.get('page') || '1')

    const { categories, loading: categoriesLoading } = useCategory()
    const categoryDetail = useCategoryDetail(catId)

    // const {data, loading, paginate} = useQuery(() => productService.getProduct(`?page=${currentPage}${search ? `&name=${search}` : ''}`), [currentPage, search])

    const {data, loading, paginate} = useQuery(() => {
      const searchParam = new URLSearchParams()
      searchParam.set('page', currentPage)
      if(search){
        searchParam.set('name', search)
      }
      if(catId){
        searchParam.set('categories', catId)
      }
      searchParam.set('sort', sort)

      return productService.getProduct(`?${searchParam.toString()}`)
    }, [currentPage, search, catId, sort])

    return (
        <>
          <section className="py-11">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-4 col-lg-3">
                  {/* Filters */}
                  <form className="mb-10 mb-md-0">
                    <ul className="nav nav-vertical" id="filterNav">
                      <li className="nav-item">
                        {/* Toggle */}
                        <a className="nav-link dropdown-toggle font-size-lg text-reset border-bottom mb-6" data-toggle="collapse" href="#categoryCollapse">
                          Category
                        </a>
                        {/* Collapse */}
                        <div className="collapse show" id="categoryCollapse">
                          <div className="form-group">
                            <ul className="list-styled mb-0" id="productsNav">
                              <li className="list-styled-item">
                                <a className="list-styled-link" href="#">
                                  All Products
                                </a>
                              </li>
                              {
                                !categories ? <Skeleton active/> : 
                                categories.map(e =>(
                                  <li key={e.id} className="list-styled-item">
                                    <NavLink className="list-styled-link" data-toggle="collapse" to={`/${e.slug}`}>
                                      {e.title}
                                    </NavLink>
                                  </li>
                                ))
                              }
                            </ul>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </form>
                </div>
                <div className="col-12 col-md-8 col-lg-9">
                  {/* Slider */}
                  <Slider>
                    <div className="card bg-h-100 bg-left" style={{backgroundImage: 'url(/img/covers/cover-24.jpg)'}}>
                      <div className="row" style={{minHeight: '400px'}}>
                        <div className="col-12 col-md-10 col-lg-8 col-xl-6 align-self-center">
                          <div className="card-body px-md-10 py-11">
                            {/* Heading */}
                            <h4>
                              2019 Summer Collection
                            </h4>
                            {/* Button */}
                            <a className="btn btn-link px-0 text-body" href="shop.html">
                              View Collection <i className="fe fe-arrow-right ml-2" />
                            </a>
                          </div>
                        </div>
                        <div className="col-12 col-md-2 col-lg-4 col-xl-6 d-none d-md-block bg-cover" style={{backgroundImage: 'url(/img/covers/cover-16.jpg)'}} />
                      </div>
                    </div>
                    <div className="card bg-cover" style={{backgroundImage: 'url(/img/covers/cover-29.jpg)'}}>
                      <div className="row align-items-center" style={{minHeight: '400px'}}>
                        <div className="col-12 col-md-10 col-lg-8 col-xl-6">
                          <div className="card-body px-md-10 py-11">
                            {/* Heading */}
                            <h4 className="mb-5">Get -50% from Summer Collection</h4>
                            {/* Text */}
                            <p className="mb-7">
                              Appear, dry there darkness they're seas. <br />
                              <strong className="text-primary">Use code 4GF5SD</strong>
                            </p>
                            {/* Button */}
                            <a className="btn btn-outline-dark" href="shop.html">
                              Shop Now <i className="fe fe-arrow-right ml-2" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card bg-cover" style={{backgroundImage: 'url(/img/covers/cover-30.jpg)'}}>
                      <div className="row align-items-center" style={{minHeight: '400px'}}>
                        <div className="col-12">
                          <div className="card-body px-md-10 py-11 text-center text-white">
                            {/* Preheading */}
                            <p className="text-uppercase">Enjoy an extra</p>
                            {/* Heading */}
                            <h1 className="display-4 text-uppercase">50% off</h1>
                            {/* Link */}
                            <a className="link-underline text-reset" href="shop.html">Shop Collection</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Slider>
                  {/* Header */}
                  <div className="row align-items-center mb-7">
                    <div className="col-12 col-md">
                      {/* Heading */}
                      <h3 className="mb-1" >{categoryDetail?.title || 'All Products'}</h3>
                      {/* Breadcrumb */}
                      <Breadcrumb name="Product" />
                    </div>
                    <div className="col-12 col-md-auto">
                      {/* Select */}
                      <select value={sort} onChange={(ev) => setSort(ev.currentTarget.value)} className="custom-select custom-select-xs">
                        <option value="real_price.desc">Giả giảm dần</option>
                        <option value="real_price.asc">Giả tăng dần</option>
                      </select>
                    </div>
                  </div>
                  {search && <p>Kết quả tìm kiếm cho `{search}`</p>}
                  <div className="row">
                      { 
                        loading ? [...Array(6)].map((e, i) => <LoadingCard key={i} />) :  data.map((e) => <ProductCard key={e.id} data={e} {...e}/>) 
                      }
                  </div>
                    <Paginate totalPage={paginate.totalPage}/>
                </div>
              </div>
            </div>
          </section>
        </>
    );
}

export default shop