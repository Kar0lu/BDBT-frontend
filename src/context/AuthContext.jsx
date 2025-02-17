import { createContext, useState, useEffect } from 'react'
import { Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [user, setUser] = useState(() => (localStorage.getItem('authTokens') ? (jwtDecode(localStorage.getItem('authTokens')).is_staff ? 'admin' : 'user') : null))
    let [userId, setUserId] = useState(() => (localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')).user_id : null))
    let [username, setUsername] = useState(() => (localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')).username : null))

    let [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null))

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    const navigate = useNavigate()

    let loginUser = async (username, password) => {
        if (!username) {
            setSnackbar({ open: true, message: 'Nazwa użytkownika jest wymagana', severity: 'warning' });
            return;
        }
        
        if (!password) {
            setSnackbar({ open: true, message: 'Hasło jest wymagane', severity: 'warning' });
            return;
        }

        const response = await fetch('http://127.0.0.1:8000/auth/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password })
        });

        let data = await response.json()

        if(response.status == 401) {
            setSnackbar({ open: true, message: 'Niepoprawne dane logowania', severity: 'error' });
            return;
        }

        if(response.status == 200){
            localStorage.setItem('authTokens', JSON.stringify(data));
            setAuthTokens(data)
            setUserId(jwtDecode(data.access).user_id)
            setUsername(jwtDecode(data.access).username)
            if(jwtDecode(data.access).is_staff){
                setUser('admin')
                navigate('/admincars')
            } else {
                setUser('user')
                navigate('/reservations')
            }
        } else {
            setSnackbar({ open: true, message: 'Błąd serwera. Skontaktuj się z administratorem', severity: 'error' });
            return;
        }
    }

    let logoutUser = (e) => {
        navigate('/');
        setTimeout(() => {
            localStorage.removeItem('authTokens');
            setAuthTokens(null);
            setUser(null);
            setUserId(null);
        }, 100);
    };

    let contextData = {
        user: user,
        user_id: userId,
        username: username,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    const handleSnackbarClose = (_, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ ...snackbar, open: false });
    };

    return(
        <AuthContext.Provider value={contextData}>
            {children}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </AuthContext.Provider>
    )
}