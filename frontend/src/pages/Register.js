import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Demo registration
    const newUser = {
      id: Date.now().toString(),
      name: formData.name || 'Demo User',
      email: formData.email || 'demo@example.com',
      targetAttendance: 75
    };
    
    login(newUser);
    navigate('/dashboard');
  };

  return (
    <div style={{ 
      padding: window.innerWidth < 768 ? "15px" : "20px", 
      maxWidth: "400px", 
      margin: window.innerWidth < 768 ? "20px auto" : "50px auto"
    }}>
      <h2 style={{ 
        fontSize: window.innerWidth < 768 ? "24px" : "28px",
        marginBottom: "20px"
      }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          style={{ 
            display: "block", 
            margin: "10px 0", 
            padding: window.innerWidth < 768 ? "8px" : "10px", 
            width: "100%",
            fontSize: window.innerWidth < 768 ? "14px" : "16px"
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ 
            display: "block", 
            margin: "10px 0", 
            padding: window.innerWidth < 768 ? "8px" : "10px", 
            width: "100%",
            fontSize: window.innerWidth < 768 ? "14px" : "16px"
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={{ 
            display: "block", 
            margin: "10px 0", 
            padding: window.innerWidth < 768 ? "8px" : "10px", 
            width: "100%",
            fontSize: window.innerWidth < 768 ? "14px" : "16px"
          }}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          style={{ 
            display: "block", 
            margin: "10px 0", 
            padding: window.innerWidth < 768 ? "8px" : "10px", 
            width: "100%",
            fontSize: window.innerWidth < 768 ? "14px" : "16px"
          }}
        />
        <button 
          type="submit" 
          style={{ 
            padding: window.innerWidth < 768 ? "10px 20px" : "12px 24px", 
            margin: "10px 0",
            fontSize: window.innerWidth < 768 ? "14px" : "16px"
          }}
        >
          Register
        </button>
      </form>
      <button
        onClick={() => {
          login({ name: "Demo User", email: "demo@test.com" });
          navigate('/dashboard');
        }}
        style={{ 
          padding: window.innerWidth < 768 ? "10px 20px" : "12px 24px", 
          backgroundColor: "#666", 
          color: "white",
          fontSize: window.innerWidth < 768 ? "14px" : "16px"
        }}
      >
        Demo Register
      </button>
    </div>
  );
};

export default Register;