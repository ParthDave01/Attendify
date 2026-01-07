import React, { useState } from 'react';

const Subjects = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Mathematics', credits: 4, type: 'Lecture', totalClasses: 30, attended: 25 },
    { id: 2, name: 'Physics', credits: 3, type: 'Lecture', totalClasses: 25, attended: 20 },
    { id: 3, name: 'Computer Science Lab', credits: 2, type: 'Lab', totalClasses: 28, attended: 22 },
  ]);

  const [newSubject, setNewSubject] = useState({
    name: '',
    credits: 3,
    type: 'Lecture'
  });

  const handleAddSubject = () => {
    if (!newSubject.name.trim()) {
      alert('Please enter a subject name');
      return;
    }
    
    const subject = {
      id: Date.now(),
      name: newSubject.name,
      credits: newSubject.credits,
      type: newSubject.type,
      totalClasses: 0,
      attended: 0
    };
    
    setSubjects([...subjects, subject]);
    setNewSubject({ name: '', credits: 3, type: 'Lecture' });
  };

  const handleDeleteSubject = (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      setSubjects(subjects.filter(subject => subject.id !== id));
    }
  };

  const calculateAttendance = (attended, total) => {
    if (total === 0) return 0;
    return ((attended / total) * 100).toFixed(1);
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <div className="card" style={{ 
        padding: window.innerWidth < 768 ? '15px' : '24px',
        borderRadius: '10px'
      }}>
        <h1 style={{ 
          fontSize: window.innerWidth < 768 ? '24px' : '28px',
          marginBottom: '10px'
        }}>📚 Manage Subjects</h1>
        <p className="mb-20" style={{ 
          fontSize: window.innerWidth < 768 ? '14px' : '16px',
          color: '#6c757d',
          marginBottom: window.innerWidth < 768 ? '15px' : '20px'
        }}>Add and manage your college subjects here.</p>
        
        {/* Add New Subject Form */}
        <div style={{ 
          padding: window.innerWidth < 768 ? '15px' : '20px', 
          border: '2px dashed #dee2e6', 
          borderRadius: '8px',
          marginBottom: window.innerWidth < 768 ? '20px' : '30px',
          backgroundColor: '#f8f9fa'
        }}>
          <h3 style={{ 
            marginBottom: window.innerWidth < 768 ? '12px' : '15px',
            fontSize: window.innerWidth < 768 ? '18px' : '20px'
          }}>Add New Subject</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : window.innerWidth < 1024 ? 'repeat(2, 1fr)' : '2fr 1fr 1fr auto',
            gap: '15px', 
            alignItems: 'end' 
          }}>
            <div style={{ 
              gridColumn: window.innerWidth < 768 ? '1' : window.innerWidth < 1024 ? 'span 2' : 'auto'
            }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: '500',
                fontSize: window.innerWidth < 768 ? '14px' : '16px'
              }}>
                Subject Name
              </label>
              <input
                type="text"
                value={newSubject.name}
                onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
                placeholder="e.g., Mathematics, Physics, etc."
                style={{ 
                  padding: window.innerWidth < 768 ? '10px' : '10px', 
                  width: '100%',
                  fontSize: window.innerWidth < 768 ? '14px' : '16px'
                }}
              />
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: '500',
                fontSize: window.innerWidth < 768 ? '14px' : '16px'
              }}>
                Credits
              </label>
              <select
                value={newSubject.credits}
                onChange={(e) => setNewSubject({...newSubject, credits: parseInt(e.target.value)})}
                style={{ 
                  padding: window.innerWidth < 768 ? '10px' : '10px', 
                  width: '100%',
                  fontSize: window.innerWidth < 768 ? '14px' : '16px'
                }}
              >
                <option value={1}>1 Credit</option>
                <option value={2}>2 Credits</option>
                <option value={3}>3 Credits</option>
                <option value={4}>4 Credits</option>
                <option value={5}>5 Credits</option>
              </select>
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: '500',
                fontSize: window.innerWidth < 768 ? '14px' : '16px'
              }}>
                Type
              </label>
              <select
                value={newSubject.type}
                onChange={(e) => setNewSubject({...newSubject, type: e.target.value})}
                style={{ 
                  padding: window.innerWidth < 768 ? '10px' : '10px', 
                  width: '100%',
                  fontSize: window.innerWidth < 768 ? '14px' : '16px'
                }}
              >
                <option value="Lecture">Lecture</option>
                <option value="Lab">Lab</option>
                <option value="Tutorial">Tutorial</option>
              </select>
            </div>
            
            <button 
              className="btn btn-primary"
              onClick={handleAddSubject}
              style={{ 
                padding: window.innerWidth < 768 ? '10px' : '10px 20px', 
                height: window.innerWidth < 768 ? '44px' : '44px',
                fontSize: window.innerWidth < 768 ? '14px' : '16px'
              }}
            >
              Add Subject
            </button>
          </div>
        </div>
        
        {/* Subjects List */}
        <div>
          <div style={{ 
            display: 'flex', 
            flexDirection: window.innerWidth < 768 ? 'column' : 'row',
            justifyContent: 'space-between', 
            alignItems: window.innerWidth < 768 ? 'flex-start' : 'center', 
            marginBottom: '20px',
            gap: window.innerWidth < 768 ? '10px' : '0'
          }}>
            <h3 style={{ 
              fontSize: window.innerWidth < 768 ? '18px' : '20px',
              margin: 0
            }}>Your Subjects ({subjects.length})</h3>
            <div style={{ 
              fontSize: window.innerWidth < 768 ? '14px' : '14px', 
              color: '#6c757d' 
            }}>
              Total Credits: {subjects.reduce((sum, subject) => sum + subject.credits, 0)}
            </div>
          </div>
          
          {subjects.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: window.innerWidth < 768 ? '30px 15px' : '40px 20px', 
              color: '#6c757d',
              border: '1px dashed #dee2e6',
              borderRadius: '8px'
            }}>
              <p style={{ 
                fontSize: window.innerWidth < 768 ? '16px' : '18px', 
                marginBottom: '10px' 
              }}>No subjects added yet</p>
              <p style={{ fontSize: window.innerWidth < 768 ? '14px' : '16px' }}>Add your first subject using the form above</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {subjects.map(subject => {
                const attendancePercentage = calculateAttendance(subject.attended, subject.totalClasses);
                
                return (
                  <div key={subject.id} style={{ 
                    padding: window.innerWidth < 768 ? '15px' : '20px', 
                    border: '1px solid #e9ecef', 
                    borderRadius: '8px',
                    backgroundColor: 'white'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                      justifyContent: 'space-between', 
                      alignItems: window.innerWidth < 768 ? 'flex-start' : 'flex-start',
                      gap: window.innerWidth < 768 ? '15px' : '0'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          display: 'flex', 
                          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                          alignItems: window.innerWidth < 768 ? 'flex-start' : 'center', 
                          gap: '10px', 
                          marginBottom: '10px' 
                        }}>
                          <h4 style={{ 
                            margin: 0, 
                            fontSize: window.innerWidth < 768 ? '16px' : '18px' 
                          }}>{subject.name}</h4>
                          <div style={{ 
                            display: 'flex', 
                            gap: '10px',
                            flexWrap: 'wrap'
                          }}>
                            <span style={{ 
                              fontSize: window.innerWidth < 768 ? '11px' : '12px', 
                              backgroundColor: '#e9ecef',
                              padding: '3px 10px',
                              borderRadius: '20px',
                              fontWeight: '500'
                            }}>
                              {subject.type}
                            </span>
                            <span style={{ 
                              fontSize: window.innerWidth < 768 ? '11px' : '12px', 
                              backgroundColor: '#007bff',
                              color: 'white',
                              padding: '3px 10px',
                              borderRadius: '20px',
                              fontWeight: '500'
                            }}>
                              {subject.credits} Credits
                            </span>
                          </div>
                        </div>
                        
                        <div style={{ 
                          display: 'flex', 
                          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                          gap: window.innerWidth < 768 ? '10px' : '20px', 
                          marginBottom: '15px' 
                        }}>
                          <div>
                            <div style={{ 
                              fontSize: window.innerWidth < 768 ? '13px' : '14px', 
                              color: '#6c757d' 
                            }}>Attendance</div>
                            <div style={{ 
                              fontSize: window.innerWidth < 768 ? '15px' : '16px', 
                              fontWeight: '600' 
                            }}>
                              {subject.attended}/{subject.totalClasses} classes
                            </div>
                          </div>
                          <div>
                            <div style={{ 
                              fontSize: window.innerWidth < 768 ? '13px' : '14px', 
                              color: '#6c757d' 
                            }}>Percentage</div>
                            <div style={{ 
                              fontSize: window.innerWidth < 768 ? '15px' : '16px', 
                              fontWeight: '600',
                              color: attendancePercentage >= 75 ? '#28a745' : '#dc3545'
                            }}>
                              {attendancePercentage}%
                            </div>
                          </div>
                        </div>
                        
                        {/* Progress bar */}
                        <div style={{ 
                          height: window.innerWidth < 768 ? '6px' : '8px', 
                          backgroundColor: '#e9ecef', 
                          borderRadius: '4px',
                          overflow: 'hidden',
                          marginBottom: '15px'
                        }}>
                          <div style={{
                            width: `${attendancePercentage}%`,
                            height: '100%',
                            backgroundColor: attendancePercentage >= 75 ? '#28a745' : '#dc3545',
                            transition: 'width 0.3s'
                          }}></div>
                        </div>
                        
                        {/* Action buttons */}
                        <div style={{ 
                          display: 'flex', 
                          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                          gap: '10px'
                        }}>
                          <button 
                            className="btn btn-primary"
                            style={{ 
                              padding: window.innerWidth < 768 ? '8px' : '8px 15px', 
                              fontSize: window.innerWidth < 768 ? '13px' : '14px'
                            }}
                            onClick={() => {
                              const updated = subjects.map(s => 
                                s.id === subject.id 
                                  ? { ...s, attended: s.attended + 1, totalClasses: s.totalClasses + 1 }
                                  : s
                              );
                              setSubjects(updated);
                            }}
                          >
                            ✅ Mark Present
                          </button>
                          <button 
                            className="btn btn-secondary"
                            style={{ 
                              padding: window.innerWidth < 768 ? '8px' : '8px 15px', 
                              fontSize: window.innerWidth < 768 ? '13px' : '14px'
                            }}
                            onClick={() => {
                              const updated = subjects.map(s => 
                                s.id === subject.id 
                                  ? { ...s, totalClasses: s.totalClasses + 1 }
                                  : s
                              );
                              setSubjects(updated);
                            }}
                          >
                            ❌ Mark Absent
                          </button>
                        </div>
                      </div>
                      
                      <button 
                        className="btn btn-danger"
                        onClick={() => handleDeleteSubject(subject.id)}
                        style={{ 
                          padding: window.innerWidth < 768 ? '8px' : '8px 15px', 
                          fontSize: window.innerWidth < 768 ? '13px' : '14px'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subjects;