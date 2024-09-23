import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import { connectDB } from './config/db';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// API routes
app.use('/api/auth', authRoutes);

export default app;
