import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">📊 Attendify</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <span className="text-white text-2xl">🎯</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Target Attendance
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {user.targetAttendance || 75}%
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <span className="text-white text-2xl">✅</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Safe to Bunk
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        5 Classes
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                    <span className="text-white text-2xl">⚠️</span>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Must Attend
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        2 Subjects
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Content */}
          <div className="mt-8 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">🎉 Welcome to Attendify!</h2>
            <p className="text-gray-600 mb-4">
              Your backend is running in demo mode because MongoDB Atlas needs IP whitelisting.
            </p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-yellow-400">ℹ️</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Action Required
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      To enable database features, please whitelist your IP in MongoDB Atlas:
                    </p>
                    <ol className="list-decimal pl-5 mt-2 space-y-1">
                      <li>Go to <a href="https://cloud.mongodb.com" className="underline" target="_blank" rel="noopener noreferrer">MongoDB Atlas</a></li>
                      <li>Click on your cluster → Network Access</li>
                      <li>Click "ADD IP ADDRESS"</li>
                      <li>Click "ADD CURRENT IP ADDRESS"</li>
                      <li>Click "Confirm"</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">🚀 Quick Start</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Add your subjects in the Subjects page</li>
                  <li>• Create your weekly timetable</li>
                  <li>• Set your target attendance percentage</li>
                  <li>• Mark your daily attendance</li>
                  <li>• See how many classes you can bunk!</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">📊 Features Working in Demo</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✅ User Registration & Login</li>
                  <li>✅ Dashboard with stats</li>
                  <li>✅ Attendance tracking (in memory)</li>
                  <li>✅ Bunk calculator</li>
                  <li>❌ Data persistence (needs MongoDB)</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => alert('Subjects page would open here')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                📚 Manage Subjects
              </button>
              <button
                onClick={() => alert('Timetable page would open here')}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                🗓️ View Timetable
              </button>
              <button
                onClick={() => alert('Attendance page would open here')}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                ✅ Mark Attendance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
