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

  const AddEmployeeForm = () => (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Add New Employee</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map(role => (
                <SelectItem key={role.id} value={role.id.toString()}>
                  {role.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Manager" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {employees.map(emp => (
                <SelectItem key={emp.id} value={emp.id.toString()}>
                  {`${emp.first_name} ${emp.last_name}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowEmployeeForm(false)}>Cancel</Button>
            <Button>Add Employee</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  const AddRoleForm = () => (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Add New Role</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <Input placeholder="Role Title" />
          <Input placeholder="Salary" type="number" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map(dept => (
                <SelectItem key={dept.id} value={dept.id.toString()}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowRoleForm(false)}>Cancel</Button>
            <Button>Add Role</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

  const AddDepartmentForm = () => (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Add New Department</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <Input placeholder="Department Name" />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowDepartmentForm(false)}>Cancel</Button>
            <Button>Add Department</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

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
          <Tabs value={activeTab} onValueChange={value => setActiveTab(value)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="employees">Employees</TabsTrigger>
              <TabsTrigger value="roles">Roles</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="employees" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Employee Directory</h2>
                <Button onClick={() => setShowEmployeeForm(!showEmployeeForm)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Employee
                </Button>
              </div>
              {showEmployeeForm && <AddEmployeeForm />}
              {message && (
                <Alert>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
              <EmployeeTable />
            </TabsContent>

            <TabsContent value="roles" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Roles Directory</h2>
                <Button onClick={() => setShowRoleForm(!showRoleForm)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Role
                </Button>
              </div>
              {showRoleForm && <AddRoleForm />}
              <div className="overflow-x-auto">
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
            </TabsContent>

            <TabsContent value="departments" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Departments Directory</h2>
                <Button onClick={() => setShowDepartmentForm(!showDepartmentForm)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Department
                </Button>
              </div>
              {showDepartmentForm && <AddDepartmentForm />}
              <div className="overflow-x-auto">
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeTracker;