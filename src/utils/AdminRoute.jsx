import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext';

const AdminRoute = ({children, ...rest}) => {
    let { user } = useContext(AuthContext)

    return user!='admin' ? <Navigate to='/login'/> : children;
}

export default AdminRoute;