import React, {useContext} from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import AuthContext from '../context/AuthContext'

const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)
  
  return (
    <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 64px)',
        marginTop: '-64px',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px',
          padding: '2rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
          bgcolor: 'background.paper'
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>Login</Typography>
        <TextField
          id="username"
          label="Nazwa użytkownika"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          id="password"
          label="Hasło"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button variant="contained" sx={{ mt: 2 }} fullWidth onClick={loginUser}>
          ZALOGUJ SIĘ
        </Button>
        <Button variant="text" sx={{ mt: 1 }} fullWidth>
          SKĄD WZIĄĆ HASŁO?
        </Button>
      </Box>
    </Box>
    </>
  );
};

export default LoginPage;