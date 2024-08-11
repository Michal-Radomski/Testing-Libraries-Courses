import React from "react";

import "./App.scss";

import UserForm from "./UserForm";
import UserList from "./UserList";

function App(): JSX.Element {
  const [users, setUsers] = React.useState<User[]>([]);

  const onUserAdd = (user: User): void => {
    setUsers([...users, user]);
  };

  return (
    <React.Fragment>
      <div>
        <UserForm onUserAdd={onUserAdd} />
        <hr />
        <UserList users={users} />
      </div>
    </React.Fragment>
  );
}

export default App;
