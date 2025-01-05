import './App.css'
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';


import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import AdminSaloons from './pages/AdminSaloons'

import AdminCars from './pages/AdminCars';
import AdminWorkers from './pages/AdminWorkers';
import PrivateRoute from './utils/PrivateRoute';
import Header from './sections/Header';
import AdminReservations from './pages/AdminReservations';

const theme = createTheme({
  palette: {
      primary: {
          main: '#0C1820',
          error: '#F44336'
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
        <Header/>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/saloons" element={<PrivateRoute><AdminSaloons/></PrivateRoute>} />
          <Route path="/cars" element={<AdminCars/>} />
          <Route path="/reservations" element={<AdminReservations/>} /> 
          {/* <Route path="/workers" element={<AdminWorkers/>} /> */}
          {/* <Route path="/users" element={<AdminUsers/>} /> */}
        </Routes>
        </AuthProvider>

      </Router>
    </ThemeProvider>
  )
}

export default App
