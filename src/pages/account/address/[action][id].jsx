

import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import { path } from '../../../config/path'
import { useAsync, useForm, useQuery } from '../../../core/hooks'
import profileService from '../../../services/profile.service'
import { message } from 'antd';

function AddressAction() {

    const param = useParams()
    const action = param.action
    const id = param['*']
    const navigate = useNavigate()
    const { excute: addAddress, loading: addLoading } = useAsync(profileService.addAddress)
    const { excute: editAddress, loading: editLoading } = useAsync(profileService.editAddress)
    const { form, error, register, validate, setForm } = useForm({
        fullName: [
           { required: true }
        ],
        email: [
           { required: true },
           { regexp: 'email' },
        ],
        phone: [
           { required: true },
           { regexp: 'phone' },
        ],
        province: [
           { required: true }
        ],
        district: [
           { required: true }
        ],
        address: [
           { required: true }
        ],
        default:[
           { required: false }
        ],
    })

    const { data: address } = useQuery(async () => id ? profileService.getAddress(id) : undefined);

    useEffect(() =>{
        if (id && address){
            setForm(address)
        }
    }, [address])

    const onSubmit = async (e) =>{
        e.preventDefault()
        try {
            if (validate()) {
                if(action === 'new'){
                    await addAddress(form)
                    message.success('Thêm địa chỉ mới thành công')
                }else {
                    await editAddress(id, form)
                    message.success('Cập nhật địa chỉ thành công')
                }
                navigate(path.Account.Address)
            }
        } catch (err) {
            message.error(err)
            console.error(err)
        }
    }
    

    //cách 1:  if(!(action === 'new' || action === 'edit')) return <Navigate to={path.Account.Address}/>
    if(!['new', 'edit'].includes(action)) return <Navigate to={path.Account.Address}/>

  return (
    <>
        <div>{/* Heading */}
            <h6 className="mb-7">
            Add Address
            </h6>
            {/* Form */}
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-12">
                        <Input
                            label="Full Name *"
                            placeholder="Full Name"
                            {...register('fullName')}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <Input
                            label="Email Address *"
                            placeholder="Email Address"
                            {...register('email')}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <Input
                            label="Phone *"
                            placeholder="Phone"
                            {...register('phone')}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <Input
                            label="Province *"
                            placeholder="Province"
                            {...register('province')}
                        />
                    </div>
                    <div className="col-12 col-md-6">
                        <Input
                            label="District *"
                            placeholder="District"
                            {...register('district')}
                        />
                    </div>
                    <div className="col-12">
                        <Input
                            label="Address *"
                            placeholder="Address"
                            {...register('address')}
                        />
                    </div>
                    <div className="col-12">
                    <div className="form-group">
                        <div className="custom-control custom-checkbox mb-3">
                        {/* defaultChecked={checked} onChange={checkedInput} */}
                            <input onChange={(e)=>  setForm((prev)=>({...prev, default:e.target.checked}))} type="checkbox" className="custom-control-input" id="defaultDeliveryAddress"/>
                            <label className="custom-control-label" htmlFor="defaultDeliveryAddress">Default delivery address</label>
                        </div>
                    </div>
                    </div>
                </div>
                {/* Button */}
                <Button loading={addLoading || editLoading} className="btn btn-dark" type="submit">
                    Add Address
                </Button>
            </form>
        </div>
    </>
  )
}

export default AddressAction