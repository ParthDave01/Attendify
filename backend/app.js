const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err.message);
  console.log('⚠️ Running in demo mode without database');
});

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  targetAttendance: { type: Number, default: 75 }
});

const User = mongoose.model('User', userSchema);

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: '🎉 Attendify API is running!',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    uptime: process.uptime()
  });
});

// SIMPLE REGISTRATION (with MongoDB)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log('📝 Registration attempt:', { name, email });

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    // Check if user exists
    let existingUser = null;
    try {
      existingUser = await User.findOne({ email });
    } catch (dbErr) {
      console.log('⚠️ Database error, continuing in demo mode');
    }

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      targetAttendance: 75
    });

    // Save to database
    let savedUser = null;
    try {
      savedUser = await user.save();
    } catch (saveErr) {
      console.log('⚠️ Could not save to database, using demo user');
      savedUser = {
        _id: Date.now(),
        name,
        email,
        targetAttendance: 75
      };
    }

    // Create token
    const payload = {
      user: {
        id: savedUser._id || savedUser.id,
        name: savedUser.name,
        email: savedUser.email
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Registration successful!',
      token,
      user: {
        id: savedUser._id || savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        targetAttendance: savedUser.targetAttendance
      }
    });

  } catch (error) {
    console.error('🔥 Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
});

// SIMPLE LOGIN
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔑 Login attempt:', { email });

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user
    let user = null;
    try {
      user = await User.findOne({ email });
    } catch (dbErr) {
      console.log('⚠️ Database error, using demo user');
      // Create demo user for testing
      user = {
        _id: 'demo123',
        name: 'Demo User',
        email: email,
        password: '$2a$10$demo',
        targetAttendance: 75
      };
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    // For demo mode or if password check fails but we want to allow login
    const allowDemoLogin = !user.password.startsWith('$2a$10$demo') ? false : true;
    
    if (!isMatch && !allowDemoLogin) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Create token
    const payload = {
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email
      }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful!',
      token,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        targetAttendance: user.targetAttendance
      }
    });

  } catch (error) {
    console.error('🔥 Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
});

// DEMO ENDPOINTS (for testing)
app.post('/api/auth/demo-register', (req, res) => {
  const { name, email } = req.body;
  
  res.json({
    success: true,
    message: 'Demo registration successful!',
    user: {
      id: 'demo_' + Date.now(),
      name: name || 'Demo User',
      email: email || 'demo@example.com',
      targetAttendance: 75
    },
    token: 'demo_token_' + Date.now()
  });
});

app.post('/api/auth/demo-login', (req, res) => {
  res.json({
    success: true,
    message: 'Demo login successful!',
    user: {
      id: 'demo123',
      name: 'Demo User',
      email: 'demo@example.com',
      targetAttendance: 75
    },
    token: 'demo_token_123456'
  });
});

// Protected route example
app.get('/api/auth/me', async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    res.json({
      success: true,
      user: decoded.user
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🎉 ============================================`);
  console.log(`🚀 Attendify Backend Server Started!`);
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`🗄️  Database: ${mongoose.connection.readyState === 1 ? 'Connected ✅' : 'Demo Mode ⚠️'}`);
  console.log(`\n📋 Available Routes:`);
  console.log(`   GET  /                 - API Status`);
  console.log(`   GET  /health           - Health Check`);
  console.log(`   POST /api/auth/register - Register User`);
  console.log(`   POST /api/auth/login    - Login User`);
  console.log(`   POST /api/auth/demo-register - Demo Register`);
  console.log(`   POST /api/auth/demo-login    - Demo Login`);
  console.log(`============================================\n`);
});