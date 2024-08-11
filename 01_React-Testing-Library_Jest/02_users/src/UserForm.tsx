import React from "react";

function UserForm({ onUserAdd }: { onUserAdd: Function }): JSX.Element {
  const [email, setEmail] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    onUserAdd({ name, email });
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button>Add User</button>
      </form>
    </React.Fragment>
  );
}

export default UserForm;
