import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Guest', email: 'guest@example.com' };
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  // Demo data
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Mathematics', total: 30, attended: 25, credits: 4 },
    { id: 2, name: 'Physics', total: 25, attended: 20, credits: 3 },
    { id: 3, name: 'Computer Science', total: 28, attended: 22, credits: 3 },
  ]);
  
  const [targetAttendance, setTargetAttendance] = useState(75);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Calculate stats
  const calculateStats = () => {
    const totalClasses = subjects.reduce((sum, subject) => sum + subject.total, 0);
    const attendedClasses = subjects.reduce((sum, subject) => sum + subject.attended, 0);
    const overallAttendance = totalClasses > 0 ? (attendedClasses / totalClasses * 100).toFixed(1) : 0;
    
    // Calculate safe to bunk for each subject
    const subjectsWithBunk = subjects.map(subject => {
      const attendance = subject.total > 0 ? (subject.attended / subject.total) * 100 : 0;
      let safeToBunk = 0;
      
      if (attendance >= targetAttendance) {
        // Calculate how many more can be bunked
        let futureTotal = subject.total;
        let futureAttended = subject.attended;
        
        while (true) {
          futureTotal++;
          const futureAttendance = (futureAttended / futureTotal) * 100;
          if (futureAttendance >= targetAttendance) {
            safeToBunk++;
          } else {
            break;
          }
        }
      }
      
      return { 
        ...subject, 
        safeToBunk, 
        attendance: parseFloat(attendance.toFixed(1)),
        status: safeToBunk > 0 ? 'safe' : 'critical'
      };
    });
    
    const totalSafeToBunk = subjectsWithBunk.reduce((sum, subject) => sum + subject.safeToBunk, 0);
    const criticalSubjects = subjectsWithBunk.filter(subject => subject.safeToBunk === 0).length;
    const safeSubjects = subjectsWithBunk.filter(subject => subject.safeToBunk > 0).length;
    
    return {
      totalClasses,
      attendedClasses,
      overallAttendance,
      totalSafeToBunk,
      criticalSubjects,
      safeSubjects,
      subjects: subjectsWithBunk
    };
  };

  const stats = calculateStats();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedSubjects = localStorage.getItem('subjects');
    const savedTarget = localStorage.getItem('targetAttendance');
    
    if (savedSubjects) {
      setSubjects(JSON.parse(savedSubjects));
    }
    if (savedTarget) {
      setTargetAttendance(parseInt(savedTarget));
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
    localStorage.setItem('targetAttendance', targetAttendance.toString());
  }, [subjects, targetAttendance]);

  // Determine grid columns based on screen size
  const getGridColumns = () => {
    if (isMobile) return '1fr';
    if (isTablet) return 'repeat(2, 1fr)';
    return 'repeat(3, 1fr)';
  };

  // Determine flex direction based on screen size
  const getFlexDirection = () => {
    return isMobile ? 'column' : 'row';
  };

  // Determine text size based on screen size
  const getTextSize = (size) => {
    if (isMobile) {
      return size === 'large' ? '24px' : size === 'medium' ? '14px' : '12px';
    }
    return size === 'large' ? '28px' : size === 'medium' ? '16px' : '14px';
  };

  return (
    <div className="container" style={{ padding: isMobile ? '15px' : '20px' }}>
      {/* Welcome Section */}
      <div className="card" style={{ 
        marginBottom: '20px',
        padding: isMobile ? '15px' : '20px',
        borderRadius: '10px'
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: getFlexDirection(),
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'flex-start' : 'center', 
          gap: isMobile ? '20px' : '20px',
          flexWrap: 'wrap' 
        }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ 
              marginBottom: '10px',
              fontSize: getTextSize('large')
            }}>📊 Dashboard</h1>
            <p style={{ 
              color: '#6c757d',
              fontSize: getTextSize('medium')
            }}>Welcome back, <strong>{user.name}</strong>! Here's your attendance overview.</p>
          </div>
          <div style={{ 
            textAlign: isMobile ? 'left' : 'right',
            width: isMobile ? '100%' : 'auto'
          }}>
            <div style={{ 
              fontSize: getTextSize('medium'), 
              color: '#6c757d', 
              marginBottom: '5px' 
            }}>Target Attendance</div>
            <div style={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center', 
              gap: '10px'
            }}>
              <div style={{ 
                fontSize: isMobile ? '20px' : '24px', 
                fontWeight: 'bold', 
                color: '#007bff', 
                minWidth: '60px' 
              }}>
                {targetAttendance}%
              </div>
              <input 
                type="range" 
                min="50" 
                max="100" 
                value={targetAttendance}
                onChange={(e) => setTargetAttendance(parseInt(e.target.value))}
                style={{ 
                  width: isMobile ? '100%' : '150px',
                  maxWidth: '200px'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: getGridColumns(),
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div className="card" style={{ 
          textAlign: 'center',
          padding: isMobile ? '15px' : '20px',
          borderRadius: '10px'
        }}>
          <div style={{ 
            fontSize: getTextSize('medium'), 
            color: '#6c757d', 
            marginBottom: '10px' 
          }}>Overall Attendance</div>
          <div style={{ 
            fontSize: isMobile ? '32px' : '36px', 
            fontWeight: 'bold',
            color: stats.overallAttendance >= targetAttendance ? '#28a745' : '#dc3545',
            marginBottom: '5px'
          }}>
            {stats.overallAttendance}%
          </div>
          <div style={{ 
            fontSize: getTextSize('medium'), 
            color: '#6c757d', 
            marginBottom: '10px' 
          }}>
            {stats.attendedClasses}/{stats.totalClasses} classes
          </div>
          <div style={{ 
            height: '6px', 
            background: '#e9ecef', 
            borderRadius: '3px',
            marginTop: '10px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${stats.overallAttendance}%`,
              height: '100%',
              background: stats.overallAttendance >= targetAttendance ? '#28a745' : '#dc3545'
            }}></div>
          </div>
        </div>
        
        <div className="card" style={{ 
          textAlign: 'center',
          padding: isMobile ? '15px' : '20px',
          borderRadius: '10px'
        }}>
          <div style={{ 
            fontSize: getTextSize('medium'), 
            color: '#6c757d', 
            marginBottom: '10px' 
          }}>Safe to Bunk</div>
          <div style={{ 
            fontSize: isMobile ? '32px' : '36px', 
            fontWeight: 'bold', 
            color: '#28a745',
            marginBottom: '5px'
          }}>
            {stats.totalSafeToBunk}
          </div>
          <div style={{ 
            fontSize: getTextSize('medium'), 
            color: '#6c757d',
            marginBottom: '10px'
          }}>
            Total classes you can miss
          </div>
          <div style={{ 
            fontSize: getTextSize('small'), 
            color: '#28a745', 
            marginTop: '8px' 
          }}>
            {stats.safeSubjects} subject(s) safe
          </div>
        </div>
        
        <div className="card" style={{ 
          textAlign: 'center',
          padding: isMobile ? '15px' : '20px',
          borderRadius: '10px',
          gridColumn: isTablet ? 'span 2' : 'auto'
        }}>
          <div style={{ 
            fontSize: getTextSize('medium'), 
            color: '#6c757d', 
            marginBottom: '10px' 
          }}>Must Attend</div>
          <div style={{ 
            fontSize: isMobile ? '32px' : '36px', 
            fontWeight: 'bold', 
            color: '#dc3545',
            marginBottom: '5px'
          }}>
            {stats.criticalSubjects}
          </div>
          <div style={{ 
            fontSize: getTextSize('medium'), 
            color: '#6c757d',
            marginBottom: '10px'
          }}>
            Subjects need attention
          </div>
          <div style={{ 
            fontSize: getTextSize('small'), 
            color: '#dc3545', 
            marginTop: '8px' 
          }}>
            Attend next classes
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ 
        marginBottom: '30px',
        padding: isMobile ? '15px' : '20px',
        borderRadius: '10px'
      }}>
        <h3 style={{ 
          marginBottom: '15px',
          fontSize: isMobile ? '18px' : '20px'
        }}>🚀 Quick Actions</h3>
        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: '15px', 
          flexWrap: 'wrap'
        }}>
          <Link to="/subjects" style={{ flex: isMobile ? '1' : 'none' }}>
            <button className="btn btn-primary" style={{ 
              padding: isMobile ? '10px 20px' : '12px 24px',
              width: isMobile ? '100%' : 'auto',
              fontSize: getTextSize('medium')
            }}>
              📚 Manage Subjects
            </button>
          </Link>
          <Link to="/timetable" style={{ flex: isMobile ? '1' : 'none' }}>
            <button className="btn btn-primary" style={{ 
              padding: isMobile ? '10px 20px' : '12px 24px',
              width: isMobile ? '100%' : 'auto',
              fontSize: getTextSize('medium')
            }}>
              🗓️ View Timetable
            </button>
          </Link>
          <button 
            className="btn btn-secondary" 
            style={{ 
              padding: isMobile ? '10px 20px' : '12px 24px',
              width: isMobile ? '100%' : 'auto',
              fontSize: getTextSize('medium')
            }}
            onClick={() => {
              // Mark all today's classes as present
              const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
              alert(`Would mark today's (${today}) classes as present`);
            }}
          >
            ✅ Mark Today's Attendance
          </button>
          <button 
            className="btn btn-secondary" 
            style={{ 
              padding: isMobile ? '10px 20px' : '12px 24px',
              width: isMobile ? '100%' : 'auto',
              fontSize: getTextSize('medium')
            }}
            onClick={() => {
              const name = prompt('Enter your name:', user.name);
              const email = prompt('Enter your email:', user.email || '');
              if (name) {
                const updatedUser = { ...user, name, email };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                window.location.reload();
              }
            }}
          >
            👤 Edit Profile
          </button>
        </div>
      </div>

      {/* Subject Overview */}
      <div className="card" style={{ 
        padding: isMobile ? '15px' : '20px',
        borderRadius: '10px'
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'flex-start' : 'center', 
          marginBottom: '20px',
          gap: isMobile ? '10px' : '0'
        }}>
          <h3 style={{ 
            fontSize: isMobile ? '18px' : '20px',
            margin: 0
          }}>📋 Subject Overview</h3>
          <Link to="/subjects" style={{ 
            fontSize: getTextSize('medium') 
          }}>View All →</Link>
        </div>
        
        {stats.subjects.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: isMobile ? '30px 15px' : '40px 20px', 
            color: '#6c757d',
            border: '1px dashed #dee2e6',
            borderRadius: '8px'
          }}>
            <p style={{ 
              fontSize: isMobile ? '16px' : '18px', 
              marginBottom: '10px' 
            }}>No subjects added yet.</p>
            <Link to="/subjects">
              <button className="btn btn-primary" style={{ 
                marginTop: '10px',
                padding: isMobile ? '8px 16px' : '10px 20px',
                fontSize: getTextSize('medium')
              }}>
                Add Your First Subject
              </button>
            </Link>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gap: '15px'
          }}>
            {stats.subjects.slice(0, 3).map(subject => (
              <div key={subject.id} style={{ 
                padding: isMobile ? '12px' : '15px', 
                border: '1px solid #e9ecef',
                borderRadius: '6px',
                backgroundColor: subject.status === 'safe' ? '#f8f9fa' : '#fff3cd'
              }}>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: isMobile ? 'column' : 'row',
                  justifyContent: 'space-between', 
                  alignItems: isMobile ? 'flex-start' : 'center',
                  gap: isMobile ? '10px' : '0'
                }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ 
                      margin: '0 0 5px 0',
                      fontSize: isMobile ? '16px' : '18px'
                    }}>{subject.name}</h4>
                    <p style={{ 
                      margin: 0, 
                      color: '#6c757d', 
                      fontSize: getTextSize('medium') 
                    }}>
                      {subject.attended}/{subject.total} classes ({subject.attendance}%)
                    </p>
                  </div>
                  <div style={{ 
                    textAlign: isMobile ? 'left' : 'right',
                    width: isMobile ? '100%' : 'auto'
                  }}>
                    <div style={{ 
                      fontSize: isMobile ? '20px' : '24px', 
                      fontWeight: 'bold',
                      color: subject.status === 'safe' ? '#28a745' : '#dc3545'
                    }}>
                      {subject.safeToBunk}
                    </div>
                    <div style={{ 
                      fontSize: getTextSize('small'), 
                      color: '#6c757d' 
                    }}>
                      {subject.status === 'safe' ? 'Safe to bunk' : 'Must attend'}
                    </div>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div style={{ 
                  height: '6px', 
                  backgroundColor: '#e9ecef', 
                  borderRadius: '3px',
                  marginTop: '10px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${subject.attendance}%`,
                    height: '100%',
                    backgroundColor: subject.attendance >= targetAttendance ? '#28a745' : '#dc3545'
                  }}></div>
                </div>
              </div>
            ))}
            
            {stats.subjects.length > 3 && (
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <Link to="/subjects" style={{ fontSize: getTextSize('medium') }}>
                  + {stats.subjects.length - 3} more subjects
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;