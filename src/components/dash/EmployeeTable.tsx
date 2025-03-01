const EmployeeTable = () => {
  const employees = [
    { name: "Enchill Beckham", department: "Design", role: "Graphic Designer", type: "Remote", status: "NSP" },
    { name: "John Doe", department: "IT", role: "Software Engineer", type: "Remote", status: "NSP" },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold">Employees</h2>
      <table className="w-full mt-4">
        <thead>
          <tr className="border-b">
            <th className="py-2">Name</th>
            <th className="py-2">Department</th>
            <th className="py-2">Role</th>
            <th className="py-2">Type</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={index} className="border-b text-center">
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.role}</td>
              <td>{emp.type}</td>
              <td>{emp.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;