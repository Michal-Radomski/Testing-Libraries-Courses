import React from "react";

function UserForm({ onUserAdd }: { onUserAdd: (user: User) => void | Function }): JSX.Element {
  const [email, setEmail] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");

  //* V1
  // const handleSubmit = (event: React.SyntheticEvent):void => {
  //   event.preventDefault();

  //   onUserAdd({ name, email });
  // };
  //* V2
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    onUserAdd({ name, email });
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input value={name} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input value={email} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)} />
        </div>
        <button>Add User</button>
      </form>
    </React.Fragment>
  );
}

export default UserForm;