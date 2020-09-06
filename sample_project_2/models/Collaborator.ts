import Project from "./Project";
import { primary, searchable, unique } from "../../src/nails";

export default class Collaborator {
  firstName: string;
  lastName: string;
  fullName: string;
  @primary()
  email: string;
  @unique()
  username: string;
  projects: Project[];
  constructor(email: string, username: string) {
      this.email = email;
      this.username = username;
  }
}
