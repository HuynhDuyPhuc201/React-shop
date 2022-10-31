import { Drawer } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAsync, useQuery } from '../core/hooks'
import { usePage } from '../hooks/usePage'
import productService from '../services/product.service'
import { toggleSearchDrawerAction } from '../store/pageReducer'
import { path } from '../config/path'
import { Link } from 'react-router-dom'
import LoadingCardSearch from './loading/LoadingCardSearch'
import CarItemSearch from './CarItemSearch'
import { useCategory } from '../hooks/useCategory'

function SearchDrawer() {

    const [cat, setCat] = useState()
    const [product, setProduct] = useState([])
    const { openSearchModal } = usePage()
    const [error, setError] = useState('')
    let [value, setValue] = useState('')
    const { categories } = useCategory()
    const [disabled, setDisabled] = useState(false)
    const [showRecommend, setShowRecommend] = useState(false)
    const [searchResult, setSearchResult] = useState('')
    const dispatch = useDispatch()

    const {excute: searchProduct, loading} = useAsync(productService.getProduct)
    const { data } = useQuery(() => productService.getSearchResult(value) ,[value])
    
    useEffect(() =>{
        setSearchResult(value)
        setShowRecommend(true)
    }, [searchResult])



    const onSearch = async (ev) =>{
        ev.preventDefault()

        setShowRecommend(false)
        const vl = value.trim()

        if(vl) {
            const searchParams = new URLSearchParams()
            searchParams.set('limit', 5)
            searchParams.set('name', vl)
            if(cat)  searchParams.set('categories', cat)

            if(cat === "All Categories") searchParams.delete('categories', cat)

            let pro = await searchProduct('?' + searchParams.toString())

            if(!pro.data.length){
                setError('Rất tiếc, không tìm thấy sản phẩm phù hợp với lựa chọn của bạn')
                setDisabled(true)
            }else{
                setError('')
                setDisabled(false)
            }
            setProduct(pro.data)

        }

    }
    
    const searchParams = new URLSearchParams()
    searchParams.set('search', value)
    let _path = path.Product
    if(cat){
        _path = categories?.find(e => e.id == cat)?.slug
    }
    
    _path += '?' + searchParams.toString()

    const handleCloseDrawer = () =>{
        dispatch(toggleSearchDrawerAction())
        setProduct([])
        setValue('')
    }
    
  return (
    <Drawer open={openSearchModal} headerStyle={{ display: 'none' }} bodyStyle={{ padding: 0 }}>
        <div className="modal-dialog modal-dialog-vertical" role="document">
            <div className="modal-content">
            {/* Close */}
            <button onClick={handleCloseDrawer} type="button" className="close" data-dismiss="modal" aria-label="Close">
                <i className="fe fe-x" aria-hidden="true" />
            </button>
            {/* Header*/}
            <div className="modal-header line-height-fixed font-size-lg">
                <strong className="mx-auto">Search Products</strong>
            </div>
            {/* Body: Form */}
            <div className="modal-body">
                <form>
                    <div className="form-group">
                        <label className="sr-only" htmlFor="modalSearchCategories">Categories:</label>
                        <select onChange={e => setCat(e.currentTarget.value)} value={cat} className="custom-select" id="modalSearchCategories">
                        <option selected >All Categories</option>
                        {
                            categories?.map(item => (
                                <option value={item.id} key={item.id} >{item.title}</option>
                            ))
                        }
                        </select>
                    </div>
                    <div className="input-group input-group-merge">
                        <input value={value} onChange={e => setValue(e.currentTarget.value)} className="form-control" type="search" placeholder="Search....." />
                        <div className="input-group-append">
                        <button onClick={onSearch} className="btn btn-outline-border" type="submit">
                            <i className="fe fe-search" />
                        </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="modal-body border-top font-size-sm">
                <p>Search Results:</p>
                {
                    loading ? [...Array(6)].map((e, i) => <LoadingCardSearch key={i} />) :
                    (error ? <p style={{ color: 'rgb(223, 189, 21)'}}>{error}</p>
                    : product.map(e => ( 
                        <div key={e.id} className="row align-items-center position-relative mb-5">
                            <CarItemSearch data={e} handleCloseDrawer={handleCloseDrawer}/>
                        </div>
                    )))
                }
                { 
                    value.length > 0 ? data.map(e => (
                        <div 
                            key={e.id} 
                            className="row align-items-center position-relative mb-5"
                            style={{display: showRecommend ? 'flex' : 'none'}}
                        >
                            <CarItemSearch data={e} handleCloseDrawer={handleCloseDrawer}/>
                        </div>
                    )) : ''
                }
                
                {/* Button */}
                <Link disabled={disabled} className="btn btn-link px-0 text-reset" onClick={handleCloseDrawer} to={_path}>
                    View All <i className="fe fe-arrow-right ml-2" />
                </Link>
            </div>
            {/* Body: Empty (remove `.d-none` to disable it) */}
            
            <div className="d-none modal-body">
                {/* Text */}
                <p className="mb-3 font-size-sm text-center">
                Nothing matches your search
                </p>
                <p className="mb-0 font-size-sm text-center">
                😞
                </p>
            </div>
            </div>
        </div>
    </Drawer>
  )
}

export default SearchDrawer