import React, { useState, useEffect } from 'react';
import './Order.css'
const AdminPanel = () => {
  const [allUserData, setAllUserData] = useState([]);

  useEffect(() => {
    // Fetch all user data when the component mounts
    const fetchAllUserData = async () => {
      try {
        const response = await fetch('http://localhost:4000/users');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setAllUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchAllUserData();
  }, []);

  return (
    <div className='harsh'>
    <h2>All User Data</h2>
    <div className="user-data-table">
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Cart Data</th>
          </tr>
        </thead>
        <tbody>
          {allUserData.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <ul>
                  {Object.entries(user.cartData).map(([key, value]) => {
                    if (value >= 1) {
                      return <li key={key}>{key}: {value}</li>;
                    }
                    return null; // Skip items with values <= 1
                  })}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default AdminPanel;
