import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Lazy load components
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Subjects = React.lazy(() => import('./pages/Subjects'));
const Timetable = React.lazy(() => import('./pages/Timetable'));

// HomePage Component
const HomePage = () => {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '30px 20px',
      minHeight: 'calc(100vh - 70px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <h1 style={{ 
        fontSize: 'clamp(2rem, 5vw, 3rem)', 
        marginBottom: '20px' 
      }}>🎓 Welcome to Attendify</h1>
      <p style={{ 
        fontSize: 'clamp(1rem, 2vw, 1.2rem)',
        marginBottom: '40px',
        color: '#6c757d'
      }}>Smart Attendance Management System</p>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '15px',
        alignItems: 'center'
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row',
          gap: '15px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <Link to="/login">
            <button style={{ 
              padding: '12px 24px', 
              background: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              minWidth: '140px'
            }}>
              Login
            </button>
          </Link>
          <Link to="/register">
            <button style={{ 
              padding: '12px 24px', 
              background: '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              minWidth: '140px'
            }}>
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Navbar Component - FIXED with proper responsive hamburger menu
const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsMobileMenuOpen(false);
    window.location.href = '/';
  };

  if (loading) {
    return (
      <nav style={{
        background: "#333",
        color: "white",
        padding: "15px 20px",
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ margin: 0, fontSize: '24px' }}>📊 Attendify</h1>
        </div>
      </nav>
    );
  }

  return (
    <nav style={{
      background: "#333",
      color: "white",
      padding: "15px 20px",
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link to="/" style={{ 
          color: "white", 
          textDecoration: "none", 
          fontSize: "24px", 
          fontWeight: "bold",
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          📊 <span style={{ display: isMobile ? 'none' : 'inline' }}>Attendify</span>
        </Link>

        {/* Desktop Navigation - Shows on tablets and desktops */}
        {!isMobile && (
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: "20px"
          }}>
            {user ? (
              <>
                <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
                  Dashboard
                </Link>
                <Link to="/subjects" style={{ color: "white", textDecoration: "none" }}>
                  Subjects
                </Link>
                <Link to="/timetable" style={{ color: "white", textDecoration: "none" }}>
                  Timetable
                </Link>
                <span style={{ margin: "0 10px" }}>Welcome, {user.name}</span>
                <button 
                  onClick={handleLogout}
                  style={{
                    padding: "8px 16px",
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
                  Login
                </Link>
                <Link to="/register" style={{ color: "white", textDecoration: "none" }}>
                  Register
                </Link>
              </>
            )}
          </div>
        )}

        {/* Mobile Hamburger Menu Button - Shows only on mobile */}
        {isMobile && (
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '5px'
            }}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        )}
      </div>

      {/* Mobile Menu Dropdown - Shows only on mobile when toggled */}
      {isMobile && isMobileMenuOpen && (
        <div style={{
          backgroundColor: '#333',
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          padding: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                style={{ 
                  color: "white", 
                  textDecoration: "none", 
                  display: "block",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.1)"
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/subjects" 
                style={{ 
                  color: "white", 
                  textDecoration: "none", 
                  display: "block",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.1)"
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Subjects
              </Link>
              <Link 
                to="/timetable" 
                style={{ 
                  color: "white", 
                  textDecoration: "none", 
                  display: "block",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.1)"
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Timetable
              </Link>
              <div style={{ 
                padding: "10px 0",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                color: "#ccc"
              }}>
                Welcome, {user.name}
              </div>
              <button 
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: "10px 0",
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: '10px'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                style={{ 
                  color: "white", 
                  textDecoration: "none", 
                  display: "block",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.1)"
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                style={{ 
                  color: "white", 
                  textDecoration: "none", 
                  display: "block",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
          <Navbar />
          <React.Suspense fallback={
            <div style={{ 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              height: "50vh" 
            }}>
              <div>Loading...</div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/subjects" element={
                <PrivateRoute>
                  <Subjects />
                </PrivateRoute>
              } />
              <Route path="/timetable" element={
                <PrivateRoute>
                  <Timetable />
                </PrivateRoute>
              } />
            </Routes>
          </React.Suspense>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;