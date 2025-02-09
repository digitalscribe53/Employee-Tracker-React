-- Clear existing data (optional, but recommended)
TRUNCATE department, role, employee RESTART IDENTITY CASCADE;

-- Insert departments
INSERT INTO department (name)
VALUES ('Engineering'), ('Sales'), ('Finance');

-- Insert roles (including manager roles)
INSERT INTO role (title, salary, department_id)
VALUES 
    ('Engineering Manager', 120000, (SELECT id FROM department WHERE name = 'Engineering')),
    ('Software Engineer', 80000, (SELECT id FROM department WHERE name = 'Engineering')),
    ('Sales Manager', 110000, (SELECT id FROM department WHERE name = 'Sales')),
    ('Sales Representative', 60000, (SELECT id FROM department WHERE name = 'Sales')),
    ('Finance Manager', 115000, (SELECT id FROM department WHERE name = 'Finance')),
    ('Accountant', 70000, (SELECT id FROM department WHERE name = 'Finance'));

-- Insert employees (managers first)
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('Miranda', 'Seedgood', (SELECT id FROM role WHERE title = 'Engineering Manager'), NULL),
    ('Rick', 'Willburn', (SELECT id FROM role WHERE title = 'Sales Manager'), NULL),
    ('Frank', 'Cox', (SELECT id FROM role WHERE title = 'Finance Manager'), NULL);

-- Insert other employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Doe', (SELECT id FROM role WHERE title = 'Software Engineer'), (SELECT id FROM employee WHERE first_name = 'Miranda' AND last_name = 'Seedgood')),
    ('Jane', 'Smith', (SELECT id FROM role WHERE title = 'Sales Representative'), (SELECT id FROM employee WHERE first_name = 'Rick' AND last_name = 'Willburn')),
    ('Emily', 'Jones', (SELECT id FROM role WHERE title = 'Accountant'), (SELECT id FROM employee WHERE first_name = 'Frank' AND last_name = 'Cox'));