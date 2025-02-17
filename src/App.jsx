import './App.css'
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';

import AdminRoute from './utils/AdminRoute';
import UserRoute from './utils/UserRoute';

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import AdminSaloons from './pages/AdminSaloons'

import AdminCars from './pages/AdminCars';
// import AdminWorkers from './pages/AdminWorkers';
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
          
          <Route path="/adminsaloons" element={<AdminRoute><AdminSaloons/></AdminRoute>} />
          <Route path="/admincars" element={<AdminRoute><AdminCars/></AdminRoute>} />
          <Route path="/adminreservations" element={<AdminRoute><AdminReservations/></AdminRoute>} /> 
          <Route path="/adminusers" element={<AdminRoute><AdminUsers/></AdminRoute>} />

          <Route path="/reservations" element={<UserRoute><UserReservations/></UserRoute>} />
          {/* <Route path="/workers" element={<AdminWorkers/>} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </AuthProvider>

      </Router>
    </ThemeProvider>
  )
}

export default App
