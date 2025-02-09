const express = require('express');
const cors = require('cors');
const {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    getRoles,
    getDepartments,
    getEmployees
} = require('./queries');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes for viewing data
app.get('/api/departments', async (req, res) => {
    try {
        const departments = await viewDepartments();
        res.json(departments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch departments' });
    }
});

app.get('/api/roles', async (req, res) => {
    try {
        const roles = await viewRoles();
        res.json(roles);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch roles' });
    }
});

app.get('/api/employees', async (req, res) => {
    try {
        const employees = await viewEmployees();
        res.json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
});

// Routes for adding data
app.post('/api/departments', async (req, res) => {
    try {
        const { name } = req.body;
        const newDepartment = await addDepartment(name);
        res.status(201).json(newDepartment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add department' });
    }
});

app.post('/api/roles', async (req, res) => {
    try {
        const { title, salary, department_id } = req.body;
        const newRole = await addRole(title, salary, department_id);
        res.status(201).json(newRole);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add role' });
    }
});

app.post('/api/employees', async (req, res) => {
    try {
        const { first_name, last_name, role_id, manager_id } = req.body;
        const newEmployee = await addEmployee(first_name, last_name, role_id, manager_id);
        res.status(201).json(newEmployee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add employee' });
    }
});

// Route for updating employee role
app.put('/api/employees/:id/role', async (req, res) => {
    try {
        const { id } = req.params;
        const { role_id } = req.body;
        const updatedEmployee = await updateEmployeeRole(id, role_id);
        res.json(updatedEmployee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update employee role' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});