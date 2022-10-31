import { useDispatch } from 'react-redux'
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { path } from '../config/path'
import { clearToken, clearUser } from '../core/utils'
import { useAuth } from '../hooks/useAuth'
import { logoutAction } from '../store/authReducer'

function ProfileLayout() {

    const {user} = useAuth()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const onLogout = (e) =>{
        e.preventDefault()
        clearUser()
        clearToken()
        dispatch(logoutAction())
        setTimeout(() => {
            navigate('/')
            window.location.reload(true);
        });
    }
    
    if(!user) return <Navigate to={path.Auth} />

  return (
    <section className="pt-7 pb-12">
        <div className="container">
            <div className="row">
            <div className="col-12 text-center">
                {/* Heading */}
                <h3 className="mb-10">My Account</h3>
            </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-3">
                    <nav className="mb-10 mb-md-0">
                        <div className="list-group list-group-sm list-group-strong list-group-flush-x">
                            <NavLink className="list-group-item list-group-item-action dropright-toggle list-group-account " to={path.Account.MyOrder}>
                            Orders
                            </NavLink>
                            <NavLink className="list-group-item list-group-item-action dropright-toggle list-group-account " to={path.Account.Wishlist}>
                                Wishlist
                            </NavLink>
                            <NavLink className="list-group-item list-group-item-action dropright-toggle list-group-account" to={path.Account.Profile}>
                                Personal Info
                            </NavLink>
                            <NavLink className="list-group-item list-group-item-action dropright-toggle list-group-account " to={path.Account.Address}>
                                Addresses
                            </NavLink>
                            <NavLink className="list-group-item list-group-item-action dropright-toggle list-group-account" href="#!" onClick={onLogout}>
                                Logout
                            </NavLink>
                        </div>
                    </nav>
                </div>
                <div className="col-12 col-md-9 col-lg-8 offset-lg-1">
                    <Outlet />
                </div>
            </div>
        </div>
    </section>
  )
}

export default ProfileLayout