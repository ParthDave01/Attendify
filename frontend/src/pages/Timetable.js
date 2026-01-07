import React, { useState } from 'react';

const Timetable = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = [
    '8:00-9:00', '9:00-10:00', '10:00-11:00', 
    '11:00-12:00', '12:00-1:00', '1:00-2:00', 
    '2:00-3:00', '3:00-4:00', '4:00-5:00'
  ];

  const [timetable, setTimetable] = useState({
    Monday: [
      { time: '9:00-10:00', subject: 'Mathematics', room: 'Room 101', type: 'Lecture' }
    ],
    Tuesday: [
      { time: '10:00-11:00', subject: 'Physics', room: 'Lab 201', type: 'Lab' }
    ],
    Wednesday: [
      { time: '11:00-12:00', subject: 'Computer Science', room: 'Lab 301', type: 'Lab' }
    ],
    Thursday: [],
    Friday: [],
    Saturday: []
  });

  const [newClass, setNewClass] = useState({
    day: 'Monday',
    time: '9:00-10:00',
    subject: '',
    room: '',
    type: 'Lecture'
  });

  const handleAddClass = () => {
    if (!newClass.subject.trim()) {
      alert('Please enter a subject name');
      return;
    }
    
    const updatedTimetable = { ...timetable };
    updatedTimetable[newClass.day] = [
      ...updatedTimetable[newClass.day],
      { 
        time: newClass.time, 
        subject: newClass.subject, 
        room: newClass.room,
        type: newClass.type
      }
    ];
    
    setTimetable(updatedTimetable);
    setNewClass({ 
      day: 'Monday', 
      time: '9:00-10:00', 
      subject: '', 
      room: '',
      type: 'Lecture' 
    });
  };

  const handleDeleteClass = (day, index) => {
    const updatedTimetable = { ...timetable };
    updatedTimetable[day] = updatedTimetable[day].filter((_, i) => i !== index);
    setTimetable(updatedTimetable);
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
        }}>🗓️ Weekly Timetable</h1>
        <p className="mb-20" style={{ 
          fontSize: window.innerWidth < 768 ? '14px' : '16px',
          color: '#6c757d',
          marginBottom: window.innerWidth < 768 ? '15px' : '20px'
        }}>Schedule your classes for the week.</p>
        
        {/* Add Class Form */}
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
          }}>Add New Class</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : window.innerWidth < 1024 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px', 
            alignItems: 'end' 
          }}>
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: '500',
                fontSize: window.innerWidth < 768 ? '14px' : '16px'
              }}>
                Day
              </label>
              <select
                value={newClass.day}
                onChange={(e) => setNewClass({...newClass, day: e.target.value})}
                style={{ 
                  padding: window.innerWidth < 768 ? '10px' : '10px', 
                  width: '100%',
                  fontSize: window.innerWidth < 768 ? '14px' : '16px'
                }}
              >
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: '500',
                fontSize: window.innerWidth < 768 ? '14px' : '16px'
              }}>
                Time Slot
              </label>
              <select
                value={newClass.time}
                onChange={(e) => setNewClass({...newClass, time: e.target.value})}
                style={{ 
                  padding: window.innerWidth < 768 ? '10px' : '10px', 
                  width: '100%',
                  fontSize: window.innerWidth < 768 ? '14px' : '16px'
                }}
              >
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '5px', 
                fontWeight: '500',
                fontSize: window.innerWidth < 768 ? '14px' : '16px'
              }}>
                Subject
              </label>
              <input
                type="text"
                value={newClass.subject}
                onChange={(e) => setNewClass({...newClass, subject: e.target.value})}
                placeholder="Enter subject"
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
                Room
              </label>
              <input
                type="text"
                value={newClass.room}
                onChange={(e) => setNewClass({...newClass, room: e.target.value})}
                placeholder="Room number"
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
                Type
              </label>
              <select
                value={newClass.type}
                onChange={(e) => setNewClass({...newClass, type: e.target.value})}
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
              onClick={handleAddClass}
              style={{ 
                padding: window.innerWidth < 768 ? '10px' : '10px 20px', 
                height: window.innerWidth < 768 ? '44px' : '44px',
                fontSize: window.innerWidth < 768 ? '14px' : '16px',
                gridColumn: window.innerWidth < 768 ? '1' : window.innerWidth < 1024 ? 'span 2' : 'auto'
              }}
            >
              Add Class
            </button>
          </div>
        </div>
        
        {/* Timetable Grid */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            marginTop: '20px',
            fontSize: window.innerWidth < 768 ? '12px' : '14px',
            minWidth: window.innerWidth < 768 ? '800px' : 'auto'
          }}>
            <thead>
              <tr>
                <th style={{ 
                  padding: window.innerWidth < 768 ? '8px' : '12px', 
                  background: '#f8f9fa', 
                  border: '1px solid #dee2e6',
                  fontWeight: '600',
                  minWidth: '100px'
                }}>Time</th>
                {days.map(day => (
                  <th key={day} style={{ 
                    padding: window.innerWidth < 768 ? '8px' : '12px', 
                    background: '#f8f9fa', 
                    border: '1px solid #dee2e6',
                    fontWeight: '600',
                    minWidth: window.innerWidth < 768 ? '120px' : '150px'
                  }}>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(time => (
                <tr key={time}>
                  <td style={{ 
                    padding: window.innerWidth < 768 ? '8px' : '12px', 
                    background: '#f8f9fa', 
                    border: '1px solid #dee2e6',
                    fontWeight: '600',
                    textAlign: 'center'
                  }}>
                    {time}
                  </td>
                  {days.map(day => {
                    const classes = timetable[day].filter(cls => cls.time === time);
                    return (
                      <td key={`${day}-${time}`} style={{ 
                        padding: window.innerWidth < 768 ? '6px' : '10px', 
                        border: '1px solid #dee2e6',
                        minWidth: window.innerWidth < 768 ? '120px' : '150px',
                        verticalAlign: 'top',
                        background: classes.length > 0 ? '#f8f9fa' : 'white'
                      }}>
                        {classes.map((cls, index) => (
                          <div key={index} style={{
                            background: cls.type === 'Lecture' ? '#e7f3ff' : 
                                      cls.type === 'Lab' ? '#d4edda' : '#f8d7da',
                            padding: window.innerWidth < 768 ? '8px' : '10px',
                            marginBottom: '5px',
                            borderRadius: '6px',
                            borderLeft: `4px solid ${
                              cls.type === 'Lecture' ? '#007bff' : 
                              cls.type === 'Lab' ? '#28a745' : '#dc3545'
                            }`,
                            position: 'relative'
                          }}>
                            <div style={{ 
                              fontWeight: '600', 
                              fontSize: window.innerWidth < 768 ? '12px' : '14px' 
                            }}>{cls.subject}</div>
                            <div style={{ 
                              fontSize: window.innerWidth < 768 ? '11px' : '12px', 
                              color: '#666', 
                              marginTop: '3px' 
                            }}>
                              {cls.room} • {cls.type}
                            </div>
                            <button
                              onClick={() => handleDeleteClass(day, timetable[day].indexOf(cls))}
                              style={{
                                position: 'absolute',
                                top: '5px',
                                right: '5px',
                                background: 'rgba(0,0,0,0.1)',
                                border: 'none',
                                borderRadius: '4px',
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Legend */}
        <div style={{ 
          marginTop: '20px', 
          padding: window.innerWidth < 768 ? '12px' : '15px', 
          background: '#f8f9fa',
          borderRadius: '6px',
          border: '1px solid #dee2e6'
        }}>
          <h4 style={{ 
            marginBottom: '10px',
            fontSize: window.innerWidth < 768 ? '16px' : '18px'
          }}>Legend</h4>
          <div style={{ 
            display: 'flex', 
            flexDirection: window.innerWidth < 768 ? 'column' : 'row',
            gap: window.innerWidth < 768 ? '10px' : '20px', 
            flexWrap: 'wrap' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                width: window.innerWidth < 768 ? '10px' : '12px', 
                height: window.innerWidth < 768 ? '10px' : '12px', 
                background: '#007bff', 
                borderRadius: '2px' 
              }}></div>
              <span style={{ fontSize: window.innerWidth < 768 ? '14px' : '16px' }}>Lecture</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                width: window.innerWidth < 768 ? '10px' : '12px', 
                height: window.innerWidth < 768 ? '10px' : '12px', 
                background: '#28a745', 
                borderRadius: '2px' 
              }}></div>
              <span style={{ fontSize: window.innerWidth < 768 ? '14px' : '16px' }}>Lab</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                width: window.innerWidth < 768 ? '10px' : '12px', 
                height: window.innerWidth < 768 ? '10px' : '12px', 
                background: '#dc3545', 
                borderRadius: '2px' 
              }}></div>
              <span style={{ fontSize: window.innerWidth < 768 ? '14px' : '16px' }}>Tutorial</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timetable;