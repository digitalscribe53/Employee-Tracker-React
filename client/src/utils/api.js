const API_BASE_URL = 'http://localhost:3001/api';

export const api = {
  // Get data
  getDepartments: async () => {
    const response = await fetch(`${API_BASE_URL}/departments`);
    if (!response.ok) throw new Error('Failed to fetch departments');
    return response.json();
  },

  getRoles: async () => {
    const response = await fetch(`${API_BASE_URL}/roles`);
    if (!response.ok) throw new Error('Failed to fetch roles');
    return response.json();
  },

  getEmployees: async () => {
    const response = await fetch(`${API_BASE_URL}/employees`);
    if (!response.ok) throw new Error('Failed to fetch employees');
    return response.json();
  },

  // Add data
  addDepartment: async (departmentData) => {
    const response = await fetch(`${API_BASE_URL}/departments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(departmentData),
    });
    if (!response.ok) throw new Error('Failed to add department');
    return response.json();
  },

  addRole: async (roleData) => {
    const response = await fetch(`${API_BASE_URL}/roles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roleData),
    });
    if (!response.ok) throw new Error('Failed to add role');
    return response.json();
  },

  addEmployee: async (employeeData) => {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });
    if (!response.ok) throw new Error('Failed to add employee');
    return response.json();
  },

  updateEmployeeRole: async (employeeId, roleId) => {
    const response = await fetch(`${API_BASE_URL}/employees/${employeeId}/role`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role_id: roleId }),
    });
    if (!response.ok) throw new Error('Failed to update employee role');
    return response.json();
  },

updateEmployee: async (employeeId, employeeData) => {
  const response = await fetch(`${API_BASE_URL}/employees/${employeeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employeeData),
  });
  if (!response.ok) throw new Error('Failed to update employee');
  return response.json();
},
};