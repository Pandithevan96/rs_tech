import pool from "../config/database.js";

// Create Employee
export const createEmployee = async (req, res) => {
  try {
    const [result] = await pool.query("INSERT INTO employees SET ?", req.body);
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Single Employee
export const getEmployee = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees WHERE id = ?", [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List All Employees
export const listEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Employee
export const updateEmployee = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE employees SET ? WHERE id = ?", [
      req.body,
      req.params.id
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ id: req.params.id, ...req.body });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Employee
export const deleteEmployee = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM employees WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};