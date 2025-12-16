const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const appRoutes = require("./routers");
const { Admin } = require("./models/authModels");
const bcrypt = require("bcrypt");
const passport = require('./config/passport.js');
const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(express.json({ limit: "100kb" }));

// Enhanced CORS configuration
const allowedOrigins = [
  'http://localhost:4200',
  'https://iexam-dashboard.surajexpo.com'
];
app.use(cors({
  origin: function (origin, callback) {
    // Allow server-to-server tools (Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // if using cookies/sessions
}));

app.options('*', cors()); // Handle preflight requests

app.use(morgan("dev"));

// Session and passport
const session = require('express-session');
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // set to true if using HTTPS
    sameSite: 'lax' // helps with CSRF
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// Routes
appRoutes(app);

// Admin setup
async function admin() {
    const count = await Admin.countDocuments();
    if (count === 0) {
        let password = "123456";
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const admin = new Admin({
            name: "Admin",
            email: "admin@archub.in",
            number: "9310235717",
            password: hashedPassword,
            role: "admin",
        });
        await admin.save();
        console.log("Admin created");
    } else {
        console.log("Admin already exists");
    }
} 
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});
module.exports = app;