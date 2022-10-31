import { lazy } from "react";
import { path } from "./config/path";
import MainLayout from "./layouts/MainLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import Page404 from "./pages/404";
import Profile from "./pages/account";

const Home = lazy(() => import('./pages/index'))
const Product = lazy(() => import('./pages/Product'))
const Auth = lazy(() => import('./pages/auth'))
const ProductDetail = lazy(() => import('./pages/product/[slug]'))
const MyOrder = lazy(() => import('./pages/account/order'))
const MyOrderDetail = lazy(() => import('./pages/account/order/[id]'))
const WishList = lazy(() => import('./pages/account/wishList'))
const Address = lazy(() => import('./pages/account/address'))
const AddressAction = lazy(() => import('./pages/account/address/[action][id]'))
const Contact = lazy(() => import('./pages/contact'))
const ViewCart = lazy(() => import('./pages/ViewCart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const OrderComplete = lazy(() => import('./pages/OrderComplete'))

const routers = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index:true, element: <Home />
            },
            {
                path: path.Product, element: <Product />
            },
            {
                path: path.Category, element: <Product />
            },
            {
                path: path.Auth, element: <Auth />
            },
            {
                path: path.Account.Profile, element: <ProfileLayout />,
                children: [
                    { 
                        index: true, element: <Profile /> 
                    },
                    { 
                        path: path.Account.MyOrder, element: <MyOrder /> 
                    },
                    { 
                        path: path.Account.MyOrderDetail, element: <MyOrderDetail /> 
                    },
                    { 
                        path: path.Account.Wishlist, element: <WishList /> 
                    },
                    { 
                        path: path.Account.Address, element: <Address /> 
                    },
                    { 
                        path: path.Account.AddressAction, element: <AddressAction /> 
                    },
                ]
            },
            {
                path: path.Contact, element: <Contact />
            },
            {
                path: path.ProductDetail, element: <ProductDetail />
            },
            {
                path: path.ViewCart, element: <ViewCart />
            },
            {
                path: path.Checkout, element: <Checkout />
            },
            {
                path: path.OrderComplete, element: <OrderComplete />
            },
            {
                path: '*', element: <Page404 />
            }
        ]
    }
]

export default routers
