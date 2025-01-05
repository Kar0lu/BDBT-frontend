import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    // TODO: reset after tests
    let [user, setUser] = useState('admin')
    let [authTokens, setAuthTokens] = useState(null)

    const navigate = useNavigate()

    // TODO: change when API is ready
    let loginUser = async (e) => {
        e.preventDefault()
        localStorage.setItem('authTokens', 'JSON.stringify(data)');
        setAuthTokens('data')
        setUser('admin')
        navigate('/saloons')
        // const response = await fetch('http://127.0.0.1:8000/api/token/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({username: e.target.username.value, password: e.target.password.value })
        // });

        // let data = await response.json();

        // if(data){
        //     localStorage.setItem('authTokens', JSON.stringify(data));
        //     setAuthTokens(data)
        //     setUser(jwtDecode(data.access))
        //     navigate('/')
        // } else {
        //     alert('Something went wrong while loggin in the user!')
        // }
    }

    let logoutUser = (e) => {
        e.preventDefault()
        localStorage.removeItem('authTokens')
        setAuthTokens(null)
        setUser(null)
        navigate('/')
    }

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}