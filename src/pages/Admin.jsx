import React, { useState } from 'react';
import LoginCard from '../components/LoginCard';
import AdminTable from '../components/AdminTable';
import '../styles/admin.css';

function Admin() {

  const [authenticated, setAuthenticated] = useState(false);

  const handleAuth = () => {
    setAuthenticated(true);
  }

  return (
    <div id="parent-container">
      <div id="container">
        {authenticated ? (
            <AdminTable />
        ) : (
            <LoginCard onAuthSuccess={handleAuth} />
        )}
      </div>
    </div>
  );
}

export default Admin;
