import React from "react";
import "./User.css";
import data from "../../mock-api/db.json";
const user = data.users;
function User() {
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
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className="status active">{user.status}</span>
                </td>
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
