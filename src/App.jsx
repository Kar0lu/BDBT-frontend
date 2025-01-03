import './App.css'
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';


import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import AdminShowrooms from './pages/AdminShowrooms'

import AdminCars from './pages/AdminCars';
import AdminWorkers from './pages/AdminWorkers';
import PrivateRoute from './utils/PrivateRoute';
import NavMenu from './components/NavMenu';

const theme = createTheme({
  palette: {
      primary: {
          main: '#0C1820',
      },
      secondary: {
          main: '#ffffff',
      },
  },
});


function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
        <NavMenu/>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/showrooms" element={<PrivateRoute><AdminShowrooms/></PrivateRoute>} />
          <Route path="/cars" element={<AdminCars/>} /> 
          <Route path="/workers" element={<AdminWorkers/>} />
        </Routes>
        </AuthProvider>

      </Router>
    </ThemeProvider>
  )
}

export default App
