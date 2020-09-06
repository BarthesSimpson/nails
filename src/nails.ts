class NailsValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "NailsValidationError";
  }
}

type Field = string;

type Model = {  // <--- need to turn this into a class :(
  primary: Field;
  searchable: Field[];
  unique: Field[];
};

const models = new Map();

export function registerModel(modelName: string) {
  if (!models.has(modelName)) {
    console.log("registering model", modelName);
    models[modelName] = new Map();
  }
}

/**
 * searchable marks a property as searchable, and thereby creates a secondary index on it.
 */
export function searchable() {
  return _searchable;
}
function _searchable(prototype: object, field: string) {
  console.log("running _searchable");
  const className = prototype.constructor.name;
  registerModel(className);
  if (!models[className].has("searchable")) {
    // instead of doing all this with maps, let's just have a model class.
    models[className]["searchable"] = new Map();
  }
  models[className]["searchable"][field] = typeof field;
  console.log(models);
}

/**
 * primary marks a property as being the model's primary key.
 */
export function primary() {
  return _primary;
}
function _primary(prototype: object, field: string) {
  console.log("running _primary");
  const className = prototype.constructor.name;
  registerModel(className);
  if (models[className].has("primary")) {
    const errMessage = `
        A model can only have one primary key. Model ${className} has both ${models[className]["primary"]} 
        and ${field} defined as primary keys`;
    throw new NailsValidationError(errMessage);
  }
  models[className]["primary"] = field;
  console.log(models);
}

/**
 * unique adds a unique constraint on a property. Since nails is backed by nosql, this constraint is enforced at the framework
 * level, not in the database. By default we therefore make every unique property searchable (i.e. index it), since otherwise any
 * upsert of the unique property would require a complete table scan.
 */
export function unique(withIndex: boolean = true) {
  return function (prototype: object, field: string) {
    console.log("running _unique");
    const className = prototype.constructor.name;
    registerModel(className);
    if (!models[className].has("unique")) {
      models[className]["unique"] = new Array();
    }
    console.log("adding unique for", field);
    models[className]["unique"].push(field);
    if (withIndex) {
      _searchable(prototype, field);
    }
    console.log(models);
  };
}
