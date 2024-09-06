export class User {
  email: string;
  constructor(email: string) {
    this.email = email;
  }

  updateEmail(newEmail: string) {
    this.email = newEmail;
  }

  clearEmail() {
    this.email = "";
  }
}
