import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext';

const AdminRoute = ({children, ...rest}) => {
    let { user } = useContext(AuthContext)

    if (user!='admin') {
        alert('Ta strona wymaga uprawnień administratora')
        return <Navigate to='/login'/>
    }
    else {
        return children
    }
}

export default AdminRoute;