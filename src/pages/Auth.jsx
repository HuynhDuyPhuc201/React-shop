

import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import { path } from '../config/path'
import { useAsync, useForm } from '../core/hooks'
import { useReduxAction } from '../core/hooks/useReduxAction'
import { useAuth } from '../hooks/useAuth'
import authService from '../services/auth.service'
import { loginAction } from '../store/authReducer'

function Auth() {

    const dispatch = useDispatch()

    const { error: loginError, action: loginA, loading } = useReduxAction(loginAction)
    

    const {user} = useAuth()
    const { excute: register, loading: loadingRegister, error: errorRegisterMessage } = useAsync((data) => authService.register(data))

    const registerForm = useForm({
        username: [
            { required: true },
            { regexp: 'email'},
        ],
        password: [
            { required: true },
        ],
        name: [
            { required: true },
        ],
        confirmPassword: [
            { required: true },
            { confirm: 'password' },
        ]
    })

    const loginForm = useForm({
        username: [
            { required: true },
            { regexp: 'email'},
        ],
        password: [
            { required: true },
            // { min: 6, max: 32 },
            // { regexp: 'password'},
        ]
    })

    const onLogin = (e) =>{
        e.preventDefault()

        if(loginForm.validate()){
            dispatch(loginA(loginForm.form))
        }
    }

    const onRegister = async (e) =>{
        e.preventDefault()

        if(registerForm.validate()){
            await register(registerForm.form, 1)
            dispatch(loginAction({
                form: {
                    username: registerForm.form.username,
                    password: registerForm.form.password,
                },
            }))
        }
    }

    if(user) return <Navigate to={path.Account.Profile}/>

  return (
    <section className="py-12">
        <div className="container">
            <div className="row">
            <div className="col-12 col-md-6">
                {/* Card */}
                <div className="card card-lg mb-10 mb-md-0">
                <div className="card-body">
                    {/* Heading */}
                    <h6 className="mb-7">Returning Customer</h6>
                    {/* Form */}
                    {loginError}
                    <form onSubmit={onLogin}>
                        <div className="row">
                            <div className="col-12">
                                {/* Email */}
                                <Input 
                                    placeholder="testUser@gmail.com" 
                                    {...loginForm.register('username')}
                                />
                            </div>
                            <div className="col-12">
                                {/* Password */}
                                <Input 
                                    type="password" 
                                    placeholder="123456" 
                                    {...loginForm.register('password')}
                                />
                            </div>
                            <div className="col-12 col-md">
                            {/* Remember */}
                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                <input className="custom-control-input" id="loginRemember" type="checkbox" />
                                <label className="custom-control-label" htmlFor="loginRemember">
                                    Remember me
                                </label>
                                </div>
                            </div>
                            </div>
                            <div className="col-12 col-md-auto">
                            {/* Link */}
                            <div className="form-group">
                                <a className="font-size-sm text-reset" data-toggle="modal" href="#modalPasswordReset">Forgot
                                Password?</a>
                            </div>
                            </div>
                            <div className="col-12">
                                {/* Button */}
                                <Button loading={loading}>
                                    Sign In
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
            </div>
            <div className="col-12 col-md-6">
                {/* Card */}
                <div className="card card-lg">
                <div className="card-body">
                    {/* Heading */}
                    <h6 className="mb-7">New Customer</h6>
                        <p>{errorRegisterMessage}</p>
                    {/* Form */}
                    <form onSubmit={onRegister}>
                        <div className="row">
                            <div className="col-12">
                                <Input
                                    placeholder="Full name"
                                    {...registerForm.register('name')}
                                />
                            </div>
                            <div className="col-12">
                                <Input
                                    placeholder="Email Address *"
                                    {...registerForm.register('username')}
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <Input
                                    placeholder="Password *"
                                    {...registerForm.register('password')}
                                    type="password"
                                />
                                
                            </div>
                            <div className="col-12 col-md-6">
                                <Input
                                    placeholder="Confirm Password *"
                                    {...registerForm.register('confirmPassword')}
                                    type="password"
                                />
                            </div>
                            <div className="col-12 col-md-auto">
                            {/* Link */}
                            <div className="form-group font-size-sm text-muted">
                                By registering your details, you agree with our Terms &amp; Conditions,
                                and Privacy and Cookie Policy.
                            </div>
                            </div>
                            <div className="col-12 col-md">
                            {/* Newsletter */}
                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                <input className="custom-control-input" id="registerNewsletter" type="checkbox" />
                                <label className="custom-control-label" htmlFor="registerNewsletter">
                                    Sign me up for the Newsletter!
                                </label>
                                </div>
                            </div>
                            </div>
                            <div className="col-12">
                            {/* Button */}
                            <Button loading={loadingRegister}>
                                Register
                            </Button>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>
    </section>
  )
}

export default Auth