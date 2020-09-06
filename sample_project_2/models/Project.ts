import { searchable } from "../../src/nails";
export default class Project {
  @searchable()
  name: string;
  constructor(name: string) {
      this.name = name;
  }
}
