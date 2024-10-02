import React from "react";
import "./User.css";
function User() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      address: "123 Main St, Anytown, USA",
      password: "********",
      role: "Admin",
      active: true,
      created: "2024-01-01",
      updated: "2024-05-10",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      address: "456 Maple Ave, Somewhere, USA",
      password: "********",
      role: "User",
      active: false,
      created: "2024-02-14",
      updated: "2024-06-05",
      status: "Inactive",
    },
    // Add more users as needed
  ];
  return (
    <body>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Password</th>
              <th>Role</th>
              <th>Active</th>
              <th>Created</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <td>
                  <span className="status active">{user.status}</span>
                </td>
                <td>{user.created}</td>
                <td>{user.updated}</td>
                <td>
                  <button className="action-btn edit-btn">✏️</button>
                  <button className="action-btn lock-btn">🔒</button>
                  <button className="action-btn delete-btn">❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </body>
  );
}
export default User;
