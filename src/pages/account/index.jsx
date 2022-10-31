import { message } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useAsync, useForm } from '../../core/hooks'
import { useAuth } from '../../hooks/useAuth'
import userService from '../../services/user.service'
import { getUserInfoAction } from '../../store/userReducer'
import { validate as _validate } from '../../core/utils/validate'

function Profile() {
    const { user } = useAuth()
    const dispatch = useDispatch()

    const { excute: updateInfo, error, loading } = useAsync(userService.updateInfo)
    const { excute: changePassword, error: errorPassword, loading: loadingPassword } = useAsync(userService.changePassword)
    const { form, register, validate, setError } = useForm({
        name: [
            { required: true }
        ]
    }, user)

    const onSubmit = async (e) =>{
        e.preventDefault()
        if(validate()){ 
            try {
                if(form.oldPassword || form.newPassword){
                    const errorObj = _validate(form, {
                        newPassword: [
                            { required: true },
                            { min: 6, max: 32}
                        ],
                        oldPassword: [
                            { required: true },
                            { min: 6, max: 32}
                        ]
                    })

                    setError(errorObj)
                    if(Object.keys(errorObj).length === 0){
                        await changePassword({
                            newPassword: form.newPassword,
                            oldPassword: form.oldPassword
                        })
                        message.success('Password update successful')
                    }
                }

                await updateInfo(form)
                dispatch(getUserInfoAction())
                message.success('User information update successful')

            } catch (error) {
                console.log(error);
            }
        }
    }
  return (
    <>
        {/* Form */}
        {error || errorPassword && <p style={{color: 'red'}}>{error || errorPassword}</p>}
        <form onSubmit={onSubmit}>
            <div className="row">
                <div className="col-12 col-md-12">
                    <Input 
                        placeholder="Full Name *"
                        label="Full Name *"
                        {...register('name')}
                    />
                </div>
                <div className="col-12">
                    <Input 
                        placeholder="Email Address *" 
                        label="Email Address *"
                        disabled
                        {...register('email')}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <Input 
                        type='password'
                        placeholder="Current Password *" 
                        label="Current Password *"
                        {...register('oldPassword')}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <Input 
                        type='password'
                        placeholder="New Password *" 
                        label="New Password *"
                        {...register('newPassword')}
                    />
                </div>
                <div className="col-12 col-lg-6">
                {/* Birthday */}
                <div className="form-group">
                    {/* Label */}
                    <label>Date of Birth</label>
                    {/* Inputs */}
                    <div className="form-row">
                    <div className="col-auto">
                        {/* Date */}
                        <label className="sr-only" htmlFor="accountDate">
                        Date
                        </label>
                        <select defaultValue={12} className="custom-select custom-select-sm" id="accountDate">
                            <option value={10} >10</option>
                            <option value={11}>11</option>
                            <option value={12} selected>12</option>
                        </select>
                    </div>
                    <div className="col">
                        {/* Date */}
                        <label className="sr-only" htmlFor="accountMonth">
                        Month
                        </label>
                        <select defaultValue='February' className="custom-select custom-select-sm" id="accountMonth">
                            <option>January</option>
                            <option selected>February</option>
                            <option>March</option>
                        </select>
                    </div>
                    <div className="col-auto">
                        {/* Date */}
                        <label className="sr-only" htmlFor="accountYear">
                        Year
                        </label>
                        <select defaultValue='1991' className="custom-select custom-select-sm" id="accountYear">
                            <option>1990</option>
                            <option selected>1991</option>
                            <option>1992</option>
                        </select>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-12 col-lg-6">
                {/* Gender */}
                <div className="form-group mb-8">
                    <label>Gender</label>
                    <div className="btn-group-toggle" data-toggle="buttons">
                    <label className="btn btn-sm btn-outline-border active">
                        <input type="radio" name="gender" defaultChecked /> Male
                    </label>
                    <label className="btn btn-sm btn-outline-border">
                        <input type="radio" name="gender" /> Female
                    </label>
                    </div>
                </div>
                </div>
                <div className="col-12">
                {/* Button */}
                <Button loading={loading || loadingPassword} className="btn btn-dark" type="submit">Save Changes</Button>
                </div>
            </div>
        </form>
    </>
  )
}

export default Profile