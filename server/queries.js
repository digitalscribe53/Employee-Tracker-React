const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'employee_db',
    password: 'kentvincent',
    port: 5432,
});

const viewDepartments = async () => {
    const res = await pool.query('SELECT * FROM department');
    return res.rows;
};

const viewRoles = async () => {
    const res = await pool.query(`
        SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        JOIN department ON role.department_id = department.id
    `);
    return res.rows;
};

const viewEmployees = async () => {
    const res = await pool.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `);
    return res.rows;
};

const addDepartment = async (name) => {
    const res = await pool.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
    return res.rows[0];
};

const addRole = async (title, salary, department_id) => {
    const res = await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, department_id]);
    return res.rows[0];
};

const addEmployee = async (first_name, last_name, role_id, manager_id) => {
    const res = await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [first_name, last_name, role_id, manager_id]);
    return res.rows[0];
};

const updateEmployeeRole = async (employee_id, role_id) => {
    // Start a transaction
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Update the employee's role
        await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);

        // Get the department_id for the new role
        const { rows: [{ department_id }] } = await client.query('SELECT department_id FROM role WHERE id = $1', [role_id]);

        // Find the manager (employee with NULL manager_id) for the new department
        const { rows: [manager] } = await client.query(`
            SELECT e.id 
            FROM employee e
            JOIN role r ON e.role_id = r.id
            WHERE r.department_id = $1 AND e.manager_id IS NULL
            LIMIT 1
        `, [department_id]);

        // Update the employee's manager
        await client.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [manager ? manager.id : null, employee_id]);

        // Commit the transaction
        await client.query('COMMIT');

        // Fetch and return the updated employee data
        const { rows: [updatedEmployee] } = await client.query(`
            SELECT e.*, r.title as role_title, d.name as department_name, 
                   CONCAT(m.first_name, ' ', m.last_name) as manager_name
            FROM employee e
            JOIN role r ON e.role_id = r.id
            JOIN department d ON r.department_id = d.id
            LEFT JOIN employee m ON e.manager_id = m.id
            WHERE e.id = $1
        `, [employee_id]);

        return updatedEmployee;
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
};

const getRoles = async () => {
    const res = await pool.query('SELECT id, title FROM role');
    return res.rows;
};

const getDepartments = async () => {
    const res = await pool.query('SELECT id, name FROM department');
    return res.rows;
};

const getEmployees = async () => {
    const res = await pool.query('SELECT id, first_name, last_name FROM employee');
    return res.rows;
};

module.exports = {
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
};
