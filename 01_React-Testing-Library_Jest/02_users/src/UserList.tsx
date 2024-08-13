import React from "react";

function UserList({ users }: { users: User[] }): JSX.Element {
  const renderedUsers: JSX.Element[] = users.map((user: User) => {
    return (
      <tr key={user.name}>
        <td>{user.name}</td>
        <td>{user.email}</td>
      </tr>
    );
  });

  return (
    <React.Fragment>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody data-testid="users">{renderedUsers}</tbody>
      </table>
    </React.Fragment>
  );
}

export default UserList;
