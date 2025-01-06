import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext';

const UserRoute = ({children, ...rest}) => {
    let { user } = useContext(AuthContext)

    if (user!='user') {
        alert('Ta strona wymaga zalogowania')
        return <Navigate to='/login'/>
    }
    else {
        return children
    }
}

export default UserRoute;