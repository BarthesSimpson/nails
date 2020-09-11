import Project from "./Project";
import { primary, unique } from "../../src/nails";

export default class Collaborator {
  name: string;
  preferredName: string;
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
