

import { Spin } from 'antd'
import React from 'react'
import { generatePath, Link } from 'react-router-dom'
import styled from 'styled-components'
import { path } from '../config/path'
import { useAsync } from '../core/hooks'
import profileService from '../services/profile.service'

function AddressCar({ address, onDelete }) {

    const {excute: deleteAddress, loading} = useAsync(profileService.deleteAddress)

    const _onDelete = () =>{
        deleteAddress(address._id)
        onDelete?.()
    }

  return (
    <div className="col-12 col-lg-6">
        <div className="card card-lg bg-light mb-8" style={{ border: address.default ? '2px solid darkblue' : 'none'}}>
            <div className="card-body">
                
                {/* Heading */}
                <h6 className="mb-6">
                Billing Address
                </h6>
                {/* Text */}
                <p className="text-muted mb-0">
                { address.fullName } <br />
                { address.phone } <br />
                { address.province } <br />
                { address.district } <br />
                { address.address } <br />
                { address.email } <br />
                </p>
                {/* Action */}
                <div className="card-action card-action-right">

                {/* Button */}
                <Link className="btn btn-xs btn-circle btn-white-primary" to={generatePath(path.Account.AddressAction, { action: 'edit', '*': address._id })}>
                    <i className="fe fe-edit-2"></i>
                </Link>

                {
                    loading ? <Spin /> : (
                        <button onClick={_onDelete} className="btn btn-xs btn-circle btn-white-primary">
                            <i className="fe fe-x"></i>
                        </button>
                    )
                }

                </div>
            </div>
        </div>
    </div>
  )
}

export default AddressCar