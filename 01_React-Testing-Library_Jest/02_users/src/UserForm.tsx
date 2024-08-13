import React from "react";

function UserForm({ onUserAdd }: { onUserAdd?: (user: User) => void | Function }): JSX.Element {
  const [email, setEmail] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement> | React.SyntheticEvent): void => {
    event.preventDefault();

    onUserAdd!({ name, email });
    setEmail("");
    setName("");
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
            id="name"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
            id="email"
          />
        </div>
        <button>Add User</button>
      </form>
    </React.Fragment>
  );
}

export default UserForm;
