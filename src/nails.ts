const models = new Map();

export function searchable(prototype: any, field: any) {
  console.log({ prototype, field });
  console.log(typeof prototype);
  console.log(typeof field);
  const className = prototype.constructor.name;
  if (!models.has(className)) {
    models[className] = new Map();
  }
  if (!models[className].has("searchable")) {
    models[className]["searchable"] = new Map();
  }
  models[className]["searchable"][field] = typeof field;
  console.log(models);
}
