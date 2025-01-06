import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext';

const UserRoute = ({children, ...rest}) => {
    let { user } = useContext(AuthContext)

    alert('Ta strona wymaga zalogowania')

    return user!='user' ? <Navigate to='/login'/> : children;
}

export default UserRoute;