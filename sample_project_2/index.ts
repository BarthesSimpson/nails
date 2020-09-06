import Project from "./models/Project";
import Collaborator from "./models/Collaborator";

const p = new Project("Cool project");
console.log("name", p.name);

const c = new Collaborator("test@test.com", "testuser");
c.projects = [p];
console.log(
  "projects",
  c.projects.map(({ name }) => name)
);
