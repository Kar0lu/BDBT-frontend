import React, { useContext, useState } from 'react';
import { TextField, Button, Box, Typography, Tooltip } from '@mui/material';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    loginUser(username, password);
  };

  return (
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
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>Login</Typography>
        <TextField
          label="Nazwa użytkownika"
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Hasło"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" sx={{ mt: 2 }} fullWidth onClick={handleLogin} type="submit">
          ZALOGUJ SIĘ
        </Button>
        <Tooltip title="Należy skontaktować się z administratorem">
          <Button variant="text" sx={{ mt: 1 }} fullWidth>
            SKĄD WZIĄĆ HASŁO?
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default LoginPage;