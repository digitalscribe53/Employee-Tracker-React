import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, RefreshCcw } from 'lucide-react';
import { api } from '../utils/api';

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
    const fetchData = async () => {
      try {
        const [departmentsData, rolesData, employeesData] = await Promise.all([
          api.getDepartments(),
          api.getRoles(),
          api.getEmployees()
        ]);
        
        setDepartments(departmentsData);
        setRoles(rolesData);
        setEmployees(employeesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Failed to load data');
      }
    };
  
    fetchData();
  }, []);

  const AddEmployeeForm = () => {
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const roleId = parseInt(e.target.role.value);
        const selectedRole = roles.find(r => r.id === roleId);
        console.log('Selected role:', selectedRole);
    
        if (!selectedRole) {
          throw new Error('Selected role not found');
        }
    
        const managerId = e.target.manager.value;
        const selectedManager = managerId ? 
          employees.find(e => e.id === parseInt(managerId)) : null;
    
        const newEmployee = await api.addEmployee({
          first_name: e.target.firstName.value,
          last_name: e.target.lastName.value,
          role_id: roleId,
          manager_id: managerId ? parseInt(managerId) : null
        });
    
        const formattedEmployee = {
          ...newEmployee,
          title: selectedRole.title,
          department: selectedRole.department,
          salary: selectedRole.salary,
          manager: selectedManager ? selectedManager.first_name : null
        };
        
        setEmployees(prev => [...prev, formattedEmployee]);
        setShowEmployeeForm(false);
        setMessage('Employee added successfully');
      } catch (error) {
        console.error('Error adding employee:', error);
        setMessage('Failed to add employee');
      }
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
              className="w-full p-2 border rounded"
            >
              <option value="">Select Manager (Optional)</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {`${emp.first_name} ${emp.last_name}`}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setShowEmployeeForm(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Employee</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  const AddRoleForm = () => {
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const departmentId = parseInt(e.target.department.value);
        const selectedDepartment = departments.find(d => d.id === departmentId);
        
        const newRole = await api.addRole({
          title: e.target.title.value,
          salary: parseFloat(e.target.salary.value),
          department_id: departmentId
        });
    
        // Format the role data with department name
        const formattedRole = {
          ...newRole,
          department: selectedDepartment.name  // Make sure department name is included
        };
        
        setRoles(prev => [...prev, formattedRole]);
        setShowRoleForm(false);
        setMessage('Role added successfully');
      } catch (error) {
        console.error('Error adding role:', error);
        setMessage('Failed to add role');
      }
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
              <Button type="button" variant="outline" onClick={() => setShowRoleForm(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Role</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  const AddDepartmentForm = () => {
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const newDepartment = await api.addDepartment({
          name: e.target.name.value
        });
        
        // Update local state with new department
        setDepartments(prev => [...prev, newDepartment]);
        setShowDepartmentForm(false);
        setMessage('Department added successfully');
      } catch (error) {
        console.error('Error adding department:', error);
        setMessage('Failed to add department');
      }
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
              <Button type="button" variant="outline" onClick={() => setShowDepartmentForm(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Department</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  const UpdateEmployeeModal = ({ employee, onClose, onUpdate }) => {
    useEffect(() => {
      // Disable scrolling on mount
      document.body.style.overflow = 'hidden';
      
      // Re-enable scrolling on unmount
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, []);
    const [formData, setFormData] = useState({
      first_name: employee.first_name,
      last_name: employee.last_name,
      role_id: roles.find(r => r.title === employee.title)?.id,
      manager_id: employees.find(e => e.first_name === employee.manager)?.id
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const selectedRole = roles.find(r => r.id === parseInt(formData.role_id));
        const selectedManager = employees.find(e => e.id === parseInt(formData.manager_id));
  
        const updatedEmployee = await api.updateEmployee(employee.id, {
          ...employee,
          first_name: formData.first_name,
          last_name: formData.last_name,
          role_id: parseInt(formData.role_id),
          department: selectedRole.department,
          salary: selectedRole.salary,
          manager_id: formData.manager_id ? parseInt(formData.manager_id) : null
        });
  
        onUpdate(updatedEmployee);
        onClose();
        setMessage('Employee updated successfully');
      } catch (error) {
        console.error('Error updating employee:', error);
        setMessage('Failed to update employee');
      }
    };
  
    return (
      <div 
        className="fixed inset-0 z-50"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.85)', // Even darker overlay
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <Card className="bg-white w-full max-w-md mx-4 shadow-2xl" style={{ backgroundColor: 'white' }}> {/* Force solid white background */}
          <CardHeader className="bg-white" style={{ backgroundColor: 'white' }}>
            <CardTitle className="text-black">Update Employee Information</CardTitle>
          </CardHeader>
          <CardContent className="bg-white" style={{ backgroundColor: 'white' }}>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white"> {/* Added bg-white to form */}
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                  required
                />
                <Input 
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                  required
                />
              </div>
              <select 
                name="role"
                className="w-full p-2 border rounded"
                value={formData.role_id || ''}
                onChange={(e) => setFormData({...formData, role_id: e.target.value})}
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
                className="w-full p-2 border rounded"
                value={formData.manager_id || ''}
                onChange={(e) => setFormData({...formData, manager_id: e.target.value})}
              >
                <option value="">Select Manager (Optional)</option>
                {employees
                  .filter(emp => emp.id !== employee.id) // Prevent self-selection as manager
                  .map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {`${emp.first_name} ${emp.last_name}`}
                    </option>
                ))}
              </select>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Update Employee</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  };

  const EmployeeTable = ({ employees }) => {
    console.log('EmployeeTable render, employees:', employees);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
  
    return (
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
                <td className="px-4 py-2">${employee.salary?.toLocaleString()}</td>
                <td className="px-4 py-2">{employee.manager || 'None'}</td>
                <td className="px-4 py-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    <RefreshCcw className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {selectedEmployee && (
          <UpdateEmployeeModal
            employee={selectedEmployee}
            onClose={() => setSelectedEmployee(null)}
            onUpdate={(updatedEmployee) => {
              setEmployees(prev => 
                prev.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp)
              );
              setSelectedEmployee(null);
            }}
          />
        )}
      </div>
    );
  };

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
    <EmployeeTable employees={employees} />
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