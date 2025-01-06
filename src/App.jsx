import './App.css'
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';


import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import AdminSaloons from './pages/AdminSaloons'

import AdminCars from './pages/AdminCars';
// import AdminWorkers from './pages/AdminWorkers';
import PrivateRoute from './utils/PrivateRoute';
import Header from './sections/Header';
import AdminReservations from './pages/AdminReservations';
import AdminUsers from './pages/AdminUsers';
import UserReservations from './pages/UserReservations';

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
          <Route path="/adminsaloons" element={<PrivateRoute><AdminSaloons/></PrivateRoute>} />
          <Route path="/admincars" element={<AdminCars/>} />
          <Route path="/adminreservations" element={<AdminReservations/>} /> 
          <Route path="/reservations" element={<UserReservations/>} />
          <Route path="/adminusers" element={<AdminUsers/>} />
          {/* <Route path="/workers" element={<AdminWorkers/>} /> */}
        </Routes>
        </AuthProvider>

      </Router>
    </ThemeProvider>
  )
}

export default App
