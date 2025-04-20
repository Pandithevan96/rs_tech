import React, { useState, useEffect } from "react";
import { FiSearch, FiPlusCircle, FiEye, FiEdit, FiTrash } from "react-icons/fi";
import { Modal, Button, Form } from "react-bootstrap";

const EmployeeDashBoard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [formData, setFormData] = useState({
    employee_name: "",
    employee_id: "",
    department: "",
    designation: "",
    project: "",
    work_type: "office",
    job_status: "permanent"
  });

  // Helper function to safely access and format employee data
  const getEmployeeData = (employee) => ({
    id: employee?.id || 0,
    employee_name: employee?.employee_name || "No name",
    employee_id:
      employee?.employee_id ||
      `EMP-${(employee?.id || 0).toString().padStart(4, "0")}`,
    department: employee?.department || "-",
    designation: employee?.designation || "-",
    project: employee?.project || "-",
    work_type: employee?.work_type || "office",
    job_status: employee?.job_status || "permanent",
  });

  // Fetch employees from API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/employees");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEmployees(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching employees:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = currentEmployee 
        ? `http://localhost:5001/api/employees/${currentEmployee.id}`
        : "http://localhost:5001/api/employees";
      
      const method = currentEmployee ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (currentEmployee) {
        setEmployees(employees.map(emp => 
          emp.id === currentEmployee.id ? data : emp
        ));
      } else {
        setEmployees([...employees, data]);
      }

      handleCloseModal();
    } catch (err) {
      setError(err.message);
      console.error("Error saving employee:", err);
    }
  };

  // Handle delete employee
  const handleDelete = async (id) => {
    if (!id) return;

    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await fetch(
          `http://localhost:5001/api/employees/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to delete employee: ${response.status}`);
        }

        setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      } catch (err) {
        setError(err.message);
        console.error("Error deleting employee:", err);
      }
    }
  };

  // Open modal for adding new employee
  const handleAddEmployee = () => {
    setCurrentEmployee(null);
    setFormData({
      employee_name: "",
      employee_id: "",
      department: "",
      designation: "",
      project: "",
      work_type: "office",
      job_status: "permanent"
    });
    setShowModal(true);
  };

  // Open modal for editing employee
  const handleEditEmployee = (employee) => {
    const emp = getEmployeeData(employee);
    setCurrentEmployee(emp);
    setFormData({
      employee_name: emp.employee_name,
      employee_id: emp.employee_id,
      department: emp.department,
      designation: emp.designation,
      project: emp.project,
      work_type: emp.work_type,
      job_status: emp.job_status
    });
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentEmployee(null);
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter((emp) => {
    const employeeData = getEmployeeData(emp);
    const search = searchTerm.toLowerCase();
    
    return (
      String(employeeData.employee_name || '').toLowerCase().includes(search) ||
      String(employeeData.employee_id || '').toLowerCase().includes(search) ||
      String(employeeData.department || '').toLowerCase().includes(search) ||
      String(employeeData.designation || '').toLowerCase().includes(search) ||
      String(employeeData.work_type || '').toLowerCase().includes(search) ||
      String(employeeData.job_status || '').toLowerCase().includes(search)
    );
  });

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        Error loading employees: {error}
      </div>
    );
  }

  return (
    <div className="employee-dashboard">
      {/* Table Header and Controls */}
      <div className="d-flex justify-content-between align-items-center m-4">
        <h4 className="m-0">Employees</h4>
        <div className="d-flex gap-3 align-items-center">
          <div className="position-relative">
            <FiSearch
              className="position-absolute top-50 translate-middle-y ms-3 text-secondary"
              size={18}
            />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ps-5 py-2 rounded-3 border-0 bg-light"
              style={{ minWidth: "220px", outline: "1px solid lightgray" }}
            />
          </div>
          <button 
            className="btn btn-primary d-flex align-items-center gap-2 px-3 py-2 rounded-3"
            onClick={handleAddEmployee}
          >
            <FiPlusCircle size={18} />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      <div className="px-3">
        {/* Table */}
        <div className="border rounded-2 overflow-hidden p-2">
          <div className="table-responsive custom">
            <table className="table table-borderless table-hover align-middle mb-0">
              <thead>
                <tr className="fw-light">
                  <th className="py-2" style={{ fontWeight: 300 }}>
                    Employee Name
                  </th>
                  <th className="py-2" style={{ fontWeight: 300 }}>
                    Employee ID
                  </th>
                  <th className="py-2" style={{ fontWeight: 300 }}>
                    Department
                  </th>
                  <th className="py-2" style={{ fontWeight: 300 }}>
                    Designation
                  </th>
                  <th className="py-2" style={{ fontWeight: 300 }}>
                    Project
                  </th>
                  <th className="py-2" style={{ fontWeight: 300 }}>
                    Type
                  </th>
                  <th className="py-2" style={{ fontWeight: 300 }}>
                    Status
                  </th>
                  <th className="py-2" style={{ fontWeight: 300 }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Divider line */}
                <tr>
                  <td colSpan="8" style={{ padding: 0 }}>
                    <div
                      style={{
                        height: "1px",
                        backgroundColor: "#e0e0e0",
                        marginLeft: "1%",
                        marginRight: "1%",
                      }}
                    ></div>
                  </td>
                </tr>

                {/* Data rows */}
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => {
                    const emp = getEmployeeData(employee);
                    return (
                      
                      <tr key={emp.id}>
                        <td className="py-2">
                          <div className="d-flex align-items-center">
                            <div
                              className="rounded-circle bg-secondary me-2 d-flex align-items-center justify-content-center"
                              style={{ width: "28px", height: "28px" }}
                            >
                              <span
                                className="text-light"
                                style={{ fontSize: "0.75rem" }}
                              >
                                {emp.employee_name
                                  .split(" ")
                                  .slice(0, 2)
                                  .map((n) => n[0])
                                  .join("").toUpperCase()}
                              </span>
                            </div>
                            <span>{emp.employee_name}</span>
                          </div>
                        </td>
                        <td>{emp.employee_id}</td>
                        <td>{emp.department}</td>
                        <td>{emp.designation}</td>
                        <td>{emp.project}</td>
                        <td>{emp.work_type}</td>
                        <td>{emp.job_status}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <FiEye
                              size={16}
                              style={{ opacity: 0.7, cursor: "pointer" }}
                              title="View details"
                            />
                            <FiEdit
                              size={16}
                              style={{ opacity: 0.7, cursor: "pointer" }}
                              title="Edit employee"
                              onClick={() => handleEditEmployee(emp)}
                            />
                            <FiTrash
                              size={16}
                              style={{ opacity: 0.7, cursor: "pointer" }}
                              onClick={() => handleDelete(emp.id)}
                              title="Delete employee"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      {employees.length === 0
                        ? "No employees found"
                        : "No matching employees found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Employee Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
  <Modal.Header 
    closeButton 
    className="border-0 pb-0"
    style={{ padding: '1.5rem 1.5rem 0' }}
  >
    <Modal.Title className="fw-bold fs-4">
      {currentEmployee ? "Edit Employee Details" : "Add New Team Member"}
    </Modal.Title>
  </Modal.Header>
  <Modal.Body style={{ padding: '1.5rem' }}>
    <Form onSubmit={handleSubmit}>
      <div className="row g-3">
        {/* First Column */}
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className="text-muted small fw-semibold">FULL NAME</Form.Label>
            <Form.Control
              type="text"
              name="employee_name"
              value={formData.employee_name}
              onChange={handleInputChange}
              required
              className="py-2 border-0 border-bottom rounded-0"
              style={{ backgroundColor: '#f8f9fa' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-muted small fw-semibold">EMPLOYEE ID</Form.Label>
            <Form.Control
              type="text"
              name="employee_id"
              value={formData.employee_id}
              onChange={handleInputChange}
              required
              className="py-2 border-0 border-bottom rounded-0"
              style={{ backgroundColor: '#f8f9fa' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-muted small fw-semibold">DEPARTMENT</Form.Label>
            <Form.Control
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              required
              className="py-2 border-0 border-bottom rounded-0"
              style={{ backgroundColor: '#f8f9fa' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-muted small fw-semibold">DESIGNATION</Form.Label>
            <Form.Control
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              required
              className="py-2 border-0 border-bottom rounded-0"
              style={{ backgroundColor: '#f8f9fa' }}
            />
          </Form.Group>
        </div>

        {/* Second Column */}
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label className="text-muted small fw-semibold">PROJECT</Form.Label>
            <Form.Control
              type="text"
              name="project"
              value={formData.project}
              onChange={handleInputChange}
              className="py-2 border-0 border-bottom rounded-0"
              style={{ backgroundColor: '#f8f9fa' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-muted small fw-semibold">WORK TYPE</Form.Label>
            <Form.Select
              name="work_type"
              value={formData.work_type}
              onChange={handleInputChange}
              className="py-2 border-0 border-bottom rounded-0"
              style={{ backgroundColor: '#f8f9fa' }}
            >
              <option value="office">Office</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-muted small fw-semibold">JOB STATUS</Form.Label>
            <Form.Select
              name="job_status"
              value={formData.job_status}
              onChange={handleInputChange}
              className="py-2 border-0 border-bottom rounded-0"
              style={{ backgroundColor: '#f8f9fa' }}
            >
              <option value="permanent">Permanent</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
              <option value="probation">Probation</option>
            </Form.Select>
          </Form.Group>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
        <Button 
          variant="outline-secondary" 
          onClick={handleCloseModal}
          className="px-4 rounded-1"
          style={{ 
            border: '1px solid #dee2e6',
            fontWeight: 500 
          }}
        >
          Cancel
        </Button>
        <Button 
          variant="primary" 
          type="submit"
          className="px-4 rounded-1 shadow-sm"
          style={{ fontWeight: 500 }}
        >
          {currentEmployee ? "Update Employee" : "Add Employee"}
        </Button>
      </div>
    </Form>
  </Modal.Body>
</Modal>

      <style>{`
        .custom {
          color: #7a7878 !important;
        }
        .employee-dashboard {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
};

export default EmployeeDashBoard;