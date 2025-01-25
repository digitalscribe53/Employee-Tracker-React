import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, RefreshCcw } from 'lucide-react';

const EmployeeTracker = () => {
  const [activeTab, setActiveTab] = useState('employees');
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [showDepartmentForm, setShowDepartmentForm] = useState(false);
  const [message, setMessage] = useState('');

  // Mock data for demonstration
  useEffect(() => {
    setDepartments([
      { id: 1, name: 'Engineering' },
      { id: 2, name: 'Sales' },
      { id: 3, name: 'Finance' }
    ]);
    setRoles([
      { id: 1, title: 'Engineering Manager', salary: 120000, department: 'Engineering' },
      { id: 2, title: 'Software Engineer', salary: 80000, department: 'Engineering' },
      { id: 3, title: 'Sales Manager', salary: 110000, department: 'Sales' }
    ]);
    setEmployees([
      { id: 1, first_name: 'Miranda', last_name: 'Seedgood', title: 'Engineering Manager', department: 'Engineering', salary: 120000, manager: null },
      { id: 2, first_name: 'John', last_name: 'Doe', title: 'Software Engineer', department: 'Engineering', salary: 80000, manager: 'Miranda' }
    ]);
  }, []);

  const AddEmployeeForm = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const roleId = e.target.role.value;
      const managerId = e.target.manager.value;
      const selectedRole = roles.find(r => r.id === parseInt(roleId));
      const selectedManager = employees.find(e => e.id === parseInt(managerId));
    
      const newEmployee = {
        id: employees.length + 1,
        first_name: e.target.firstName.value,
        last_name: e.target.lastName.value,
        title: selectedRole?.title || 'New Role',
        department: selectedRole?.department || 'New Department',
        salary: selectedRole?.salary || 0,
        manager: selectedManager ? selectedManager.first_name : null
      };
      
      setEmployees(prev => [...prev, newEmployee]);
      setShowEmployeeForm(false);
    };
  
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Add New Employee</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input 
                name="firstName"
                placeholder="First Name" 
                required
              />
              <Input 
                name="lastName"
                placeholder="Last Name" 
                required
              />
            </div>
            <select 
              name="role" 
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Role</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.title}
                </option>
              ))}
            </select>
            <select 
  name="manager" 
  className="w-full p-2 border rounded mt-4"
>
  <option value="">Select Manager (Optional)</option>
  {employees.map(emp => (
    <option key={emp.id} value={emp.id}>
      {`${emp.first_name} ${emp.last_name}`}
    </option>
  ))}
</select>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setShowEmployeeForm(false)}>Cancel</Button>
              <Button type="submit">Add Employee</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  const AddRoleForm = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const departmentId = e.target.department.value;
      const selectedDepartment = departments.find(d => d.id === parseInt(departmentId));
  
      const newRole = {
        id: roles.length + 1,
        title: e.target.title.value,
        salary: parseFloat(e.target.salary.value),
        department: selectedDepartment?.name || 'New Department'
      };
      
      setRoles(prev => [...prev, newRole]);
      setShowRoleForm(false);
    };
  
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Add New Role</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              name="title"
              placeholder="Role Title" 
              required
            />
            <Input 
              name="salary"
              type="number"
              placeholder="Salary" 
              required
            />
            <select 
              name="department" 
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setShowRoleForm(false)}>Cancel</Button>
              <Button type="submit">Add Role</Button>
              
            </div>
            
          </form>
        </CardContent>
      </Card>
    );
  };

  const AddDepartmentForm = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const newDepartment = {
        id: departments.length + 1,
        name: e.target.name.value
      };
      setDepartments(prev => [...prev, newDepartment]);
      setShowDepartmentForm(false);
    };
  
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Add New Department</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              name="name"
              placeholder="Department Name" 
              required
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setShowDepartmentForm(false)}>Cancel</Button>
              <Button type="submit">Add Department</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  const EmployeeTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left font-semibold">Name</th>
            <th className="px-4 py-2 text-left font-semibold">Role</th>
            <th className="px-4 py-2 text-left font-semibold">Department</th>
            <th className="px-4 py-2 text-left font-semibold">Salary</th>
            <th className="px-4 py-2 text-left font-semibold">Manager</th>
            <th className="px-4 py-2 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{`${employee.first_name} ${employee.last_name}`}</td>
              <td className="px-4 py-2">{employee.title}</td>
              <td className="px-4 py-2">{employee.department}</td>
              <td className="px-4 py-2">${employee.salary.toLocaleString()}</td>
              <td className="px-4 py-2">{employee.manager || 'None'}</td>
              <td className="px-4 py-2">
                <Button variant="outline" size="sm" onClick={() => {}}>
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Employee Management System</CardTitle>
        </CardHeader>
        <CardContent>
        <div>
  <div className="flex space-x-4 mb-4">
    <button 
      className={`px-4 py-2 rounded ${activeTab === 'employees' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      onClick={() => setActiveTab('employees')}
    >
      Employees
    </button>
    <button 
      className={`px-4 py-2 rounded ${activeTab === 'roles' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      onClick={() => setActiveTab('roles')}
    >
      Roles
    </button>
    <button 
      className={`px-4 py-2 rounded ${activeTab === 'departments' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      onClick={() => setActiveTab('departments')}
    >
      Departments
    </button>
  </div>
  
  {activeTab === 'employees' && (
  <div>
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Employee Directory</h2>
      <Button onClick={() => setShowEmployeeForm(!showEmployeeForm)}>
        <Plus className="h-4 w-4 mr-2" />
        Add Employee
      </Button>
    </div>
    {showEmployeeForm && <AddEmployeeForm />}
    <EmployeeTable />
  </div>
)}

{activeTab === 'roles' && (
  <div className="overflow-x-auto">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Roles Directory</h2>
      <Button onClick={() => setShowRoleForm(!showRoleForm)}>
        <Plus className="h-4 w-4 mr-2" />
        Add Role
      </Button>
    </div>
    {showRoleForm && <AddRoleForm />}
    <table className="w-full border-collapse bg-white">
      <thead>
        <tr className="border-b">
          <th className="px-4 py-2 text-left font-semibold">Title</th>
          <th className="px-4 py-2 text-left font-semibold">Department</th>
          <th className="px-4 py-2 text-left font-semibold">Salary</th>
        </tr>
      </thead>
      <tbody>
        {roles.map(role => (
          <tr key={role.id} className="border-b hover:bg-gray-50">
            <td className="px-4 py-2">{role.title}</td>
            <td className="px-4 py-2">{role.department}</td>
            <td className="px-4 py-2">${role.salary.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

{activeTab === 'departments' && (
  <div className="overflow-x-auto">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Departments Directory</h2>
      <Button onClick={() => setShowDepartmentForm(!showDepartmentForm)}>
        <Plus className="h-4 w-4 mr-2" />
        Add Department
      </Button>
    </div>
    {showDepartmentForm && <AddDepartmentForm />}
    <table className="w-full border-collapse bg-white">
      <thead>
        <tr className="border-b">
          <th className="px-4 py-2 text-left font-semibold">Department Name</th>
        </tr>
      </thead>
      <tbody>
        {departments.map(dept => (
          <tr key={dept.id} className="border-b hover:bg-gray-50">
            <td className="px-4 py-2">{dept.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeTracker;