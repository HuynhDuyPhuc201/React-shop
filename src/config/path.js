export const path = {
    Home: '/',
    Product: '/product',
    Auth: '/auth',
    Category: '/:slug-id:catId',
    Catalog: '/catalog',
    Account: {
        Profile: '/account',
        Wishlist: '/account/wishlist',
        Address: '/account/address',
        AddressAction: '/account/address/:action/*',
        MyOrder: '/account/order',
        MyOrderDetail: '/account/order/:id',
    },
    Contact: '/contact',
    ProductDetail: '/product/:slug',
    ViewCart: '/view-cart',
    Checkout: '/checkout',
    OrderComplete: '/order-complete/:id',
}