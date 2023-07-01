import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeWithSidebar from './components/Home';
import Login from './components/Login';
import Billing from './components/Billing';

const Router = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status here
    const isAuthenticated = localStorage.getItem('email') != null;
    setAuthenticated(isAuthenticated);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    // Show loading indicator here
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/billing" element={ authenticated ? (<Billing />) : (<Navigate to="/login" replace={true} />)}/>
      <Route path="/register" element={ !authenticated ? (<Login />) : (<Navigate to="/home" replace={true} />)}/>
      <Route path="/password-reset" element={ !authenticated ? (<Login />) : (<Navigate to="/home" replace={true} /> )}/>
      <Route path="/login"element={ authenticated ? (<Navigate to="/home" replace={true} />) : (<Login />)}/>
      <Route path="/*"element={ authenticated ? (<HomeWithSidebar /> ) : (<Navigate to="/login" replace={true} />) }/>
    </Routes>
  );
};

export default Router;
