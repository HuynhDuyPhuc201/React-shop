


import React from 'react'
import { useDispatch } from 'react-redux';
import { toggleCartDrawerAction, toggleSearchDrawerAction } from '../store/pageReducer';
import PopupDetailModal from './PopupDetailModal';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
import { path } from '../config/path';
import { useTranslate } from '../core/components/TranslateProvide';
import Select from './Select';

function Header() {

  const dispatch = useDispatch()
  const { cart } = useCart()

  const onOpenSearchModal = (ev) =>{
    ev.preventDefault()
    dispatch(toggleSearchDrawerAction())
  }
  
  const onOpenCartModal = (ev) =>{
    ev.preventDefault()
    dispatch(toggleCartDrawerAction())
  }

  const ListMenu = [
    {
      name: 'Home',
      url: path.Home
    },
    {
      name: 'Catalog',
      url: path.Catalog
    },
    {
      name: 'Product',
      url: path.Product
    },
    {
      name: 'Contact',
      url: path.Contact
    },
    {
      name: 'Blog',
      url: '/blog'
    },
  ]

  const { t, selectLocale, locale } = useTranslate()

  return (
    <div>
      <PopupDetailModal/>
      <div className="navbar navbar-topbar navbar-expand-xl navbar-light bg-light">
        <div className="container">
          {/* Promo */}
          <div className="mr-xl-8">
            <i className="fe fe-truck mr-2" /> <span className="heading-xxxs">Free shipping worldwide</span>
          </div>
          {/* Toggler */}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#topbarCollapse" aria-controls="topbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          {/* Collapse */}
          <div className="collapse navbar-collapse" id="topbarCollapse">
            {/* Nav */}
            <ul className="nav nav-divided navbar-nav mr-auto">
              <li className="nav-item dropdown">
                {/* Toggle */}
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#">
                  <img className="mb-1 mr-1" src="/img/flags/usa.svg" alt="..." /> United States
                </a>
                {/* Menu */}
                <div className="dropdown-menu minw-0">
                  <a className="dropdown-item" href="#!">
                    <img className="mb-1 mr-2" src="/img/flags/usa.svg" alt="USA" />United States
                  </a>
                  <a className="dropdown-item" href="#!">
                    <img className="mb-1 mr-2" src="/img/flags/canada.svg" alt="Canada" />Canada
                  </a>
                  <a className="dropdown-item" href="#!">
                    <img className="mb-1 mr-2" src="/img/flags/germany.svg" alt="Germany" />Germany
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                {/* Toggle */}
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#">USD</a>
                {/* Menu */}
                <div className="dropdown-menu minw-0">
                  <a className="dropdown-item" href="#!">USD</a>
                  <a className="dropdown-item" href="#!">EUR</a>
                </div>
              </li>
              <li className="nav-item">
                <Select
                  defaultValue={locale}
                  options= {[
                    {value: 'en', label: 'English'},
                    {value: 'vi', label: 'Tiếng Việt'},
                    {value: 'cn', label: 'China'},
                  ]} 
                 onChange = {(value) => selectLocale(value)}
                />
              </li> 
            </ul>
            {/* Nav */}
            <ul className="nav navbar-nav mr-8">
              <li className="nav-item">
                <Link className="nav-link" to={'/shipping'}>{t('Shipping')}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/faq'}>{t('FAQ')}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" tp={path.Contact}>{t('Contact')}</Link>
              </li>
            </ul>
            {/* Nav */}
            <ul className="nav navbar-nav flex-row">
              <li className="nav-item">
                <a className="nav-link text-gray-350" href="#!">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li className="nav-item ml-xl-n4">
                <a className="nav-link text-gray-350" href="#!">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li className="nav-item ml-xl-n4">
                <a className="nav-link text-gray-350" href="#!">
                  <i className="fab fa-instagram" />
                </a>
              </li>
              <li className="nav-item ml-xl-n4">
                <a className="nav-link text-gray-350" href="#!">
                  <i className="fab fa-medium" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          {/* Brand */}
          <Link className="navbar-brand" to={path.Home}>
            Shopper.
          </Link>
          {/* Toggler */}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mx-auto">
              {ListMenu.map(item => (
                <li key={item.name} className="nav-item">
                  <Link className="nav-link" to={item.url}>{t(`${item.name}`)}</Link>
                </li>
              ))}
            </ul>
            
            <ul className="navbar-nav flex-row">
              <li className="nav-item">
                <a onClick={onOpenSearchModal} className="nav-link" data-toggle="modal" href="#modalSearch">
                  <i className="fe fe-search" />
                </a>
              </li>
              <li className="nav-item ml-lg-n4">
                <Link className="nav-link" to={path.Account.Profile}>
                  <i className="fe fe-user" />
                </Link>
              </li>
              <li className="nav-item ml-lg-n4">
                <Link className="nav-link" to={path.Account.Wishlist}>
                  <i className="fe fe-heart" />
                </Link>
              </li>
              <li className="nav-item ml-lg-n4">
                <a className="nav-link" data-toggle="modal" href="#modalShoppingCart" onClick={onOpenCartModal}>
                  <span data-cart-items={cart?.totalQuantity}>
                    <i className="fe fe-shopping-cart" />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="py-3 bg-dark bg-pattern mb-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Text */}
              <div className="text-center text-white">
                <span className="heading-xxs letter-spacing-xl">
                  ⚡️ Happy Holiday Deals on Everything ⚡️
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header