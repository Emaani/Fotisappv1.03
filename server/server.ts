import express from 'express';
import session from 'express-session';
import passport from 'passport';
import authRoutes from './routes/authRoutes';
import './middleware/authMiddleware'; // Initialize passport strategies

const app = express();
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;