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
app.use(cors({
  origin: 'http://localhost:4200',
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

module.exports = app;