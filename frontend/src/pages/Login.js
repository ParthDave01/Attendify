import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Demo login
    const demoUser = {
      id: '123',
      name: 'Demo User',
      email: email || 'demo@example.com',
      targetAttendance: 75
    };
    
    localStorage.setItem('user', JSON.stringify(demoUser));
    localStorage.setItem('token', 'demo_token_' + Date.now());
    navigate('/dashboard');
  };

  const handleDemoLogin = () => {
    const demoUser = {
      id: 'demo123',
      name: 'Demo User',
      email: 'demo@example.com',
      targetAttendance: 75
    };
    
    localStorage.setItem('user', JSON.stringify(demoUser));
    localStorage.setItem('token', 'demo_token_123456');
    navigate('/dashboard');
  };

  return (
    <div className="container" style={{ 
      padding: '20px',
      maxWidth: '400px',
      margin: window.innerWidth < 768 ? '20px auto' : '50px auto'
    }}>
      <div className="card" style={{ 
        padding: window.innerWidth < 768 ? '20px' : '30px',
        borderRadius: '10px'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: window.innerWidth < 768 ? '20px' : '30px',
          fontSize: window.innerWidth < 768 ? '24px' : '28px'
        }}>🔐 Login to Attendify</h1>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '500',
              fontSize: window.innerWidth < 768 ? '14px' : '16px'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{ 
                padding: window.innerWidth < 768 ? '10px' : '12px', 
                width: '100%',
                fontSize: window.innerWidth < 768 ? '14px' : '16px'
              }}
              required
            />
          </div>
          
          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '500',
              fontSize: window.innerWidth < 768 ? '14px' : '16px'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{ 
                padding: window.innerWidth < 768 ? '10px' : '12px', 
                width: '100%',
                fontSize: window.innerWidth < 768 ? '14px' : '16px'
              }}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ 
              width: '100%', 
              padding: window.innerWidth < 768 ? '10px' : '12px',
              fontSize: window.innerWidth < 768 ? '14px' : '16px'
            }}
          >
            Sign In
          </button>
        </form>
        
        <div style={{ 
          textAlign: 'center', 
          margin: window.innerWidth < 768 ? '15px 0' : '20px 0' 
        }}>
          <span style={{ color: '#6c757d' }}>Or</span>
        </div>
        
        <button 
          onClick={handleDemoLogin}
          className="btn btn-secondary"
          style={{ 
            width: '100%', 
            padding: window.innerWidth < 768 ? '10px' : '12px',
            fontSize: window.innerWidth < 768 ? '14px' : '16px'
          }}
        >
          Try Demo Login
        </button>
        
        <p style={{ 
          textAlign: 'center', 
          marginTop: window.innerWidth < 768 ? '15px' : '20px', 
          color: '#6c757d',
          fontSize: window.innerWidth < 768 ? '14px' : '16px'
        }}>
          Don't have an account?{' '}
          <a 
            href="/register" 
            onClick={(e) => {
              e.preventDefault();
              navigate('/register');
            }}
            style={{ fontWeight: '500' }}
          >
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;