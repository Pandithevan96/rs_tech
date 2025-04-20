import express from 'express';
import {
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  listEmployees
} from '../controllers/employeeController.js';

const router = express.Router();

// CRUD Routes
router.route('/')
  .get(listEmployees)
  .post(createEmployee);

router.route('/:id')
  .get(getEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

export default router;