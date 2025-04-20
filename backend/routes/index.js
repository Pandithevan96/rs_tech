import express from 'express';
import employeeRoutes from './employeeRoutes.js';

const router = express.Router();

// API routes
router.use('/employees', employeeRoutes);

export default router;