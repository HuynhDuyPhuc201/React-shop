



import { generatePath, Link } from 'react-router-dom'
import AddressCar from '../../../components/AddressCar'
import { path } from '../../../config/path'
import { useQuery } from '../../../core/hooks'
import profileService from '../../../services/profile.service'

function Address() {

    const { data, loading, excute } = useQuery(() => profileService.getAddress())
    const newPath = generatePath(path.Account.AddressAction, { action: 'new' })
    
    // const filteredItems = data.filter(item => [true].includes(item.default))
    
  return (
    <div className="row">
        {
            data.map(e => (
                <AddressCar key={e._id} address={e} onDelete={excute}/>)
            )
        }

        <div className="col-12">
            {/* Button */}
            <Link className="btn btn-block btn-lg btn-outline-border" to={newPath}>
                Add Address <i className="fe fe-plus"></i>
            </Link>

        </div>
    </div>
  )
}

export default Address