import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import React from 'react';

function App() {
  return (
    <Routes>
      <Route path='/' element={<ProctectedRoutes>
        <HomePage />
      </ProctectedRoutes>} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<HomePage />} />
    </Routes>
  );
}
export function ProctectedRoutes(props) {
  if (localStorage.getItem('users')) return props.children
  else return <Navigate to='/login' />
}
export default App;
