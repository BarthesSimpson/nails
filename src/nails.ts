class NailsValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "NailsValidationError";
  }
}

type Field = string;
class Model {
  searchable: Set<Field>;
  unique: Set<Field>;
  primary: Field;
  constructor(public className: string) {
    this.searchable = new Set<Field>();
    this.unique = new Set<Field>();
  }
  addSearchableField(field: Field) {
    this.searchable.add(field);
  }
  addUniqueField(field: Field) {
    this.unique.add(field);
  }
  setPrimaryKey(field: Field) {
    this.primary = field;
  }
}

const models = new Map<string, Model>();

export function registerModel(className: string) {
  console.log({ models });
  console.log(models.get(className));
  console.log(models.has(className));
  if (!models.has(className)) {
    console.log("registering model", className);
    const model = new Model(className);
    models.set(className, model);
  }
}

/**
 * searchable marks a property as searchable, and thereby creates a secondary index on it.
 */
export function searchable() {
  return _searchable;
}
function _searchable(prototype: object, field: Field) {
  console.log("running _searchable");
  const className = prototype.constructor.name;
  registerModel(className);
  models.get(className).addSearchableField(field);
  console.log(models);
}

/**
 * primary marks a property as being the model's primary key.
 */
export function primary() {
  return _primary;
}
function _primary(prototype: object, field: Field) {
  console.log("running _primary");
  const className = prototype.constructor.name;
  registerModel(className);
  if (models.get(className).primary != null) {
    const errMessage = `
        A model can only have one primary key. Model ${className} has both ${models.get(className)["primary"]} 
        and ${field} defined as primary keys`;
    throw new NailsValidationError(errMessage);
  }
  models.get(className).setPrimaryKey(field);
  console.log(models);
}

/**
 * unique adds a unique constraint on a property. Since nails is backed by nosql, this constraint is enforced at the framework
 * level, not in the database. By default we therefore make every unique property searchable (i.e. index it), since otherwise any
 * upsert of the unique property would require a complete table scan.
 */
export function unique(withIndex: boolean = true) {
  return function (prototype: object, field: Field) {
    console.log("running _unique");
    const className = prototype.constructor.name;
    registerModel(className);
    console.log("adding unique for", field);
    models.get(className).addUniqueField(field);
    if (withIndex) {
      _searchable(prototype, field);
    }
    console.log(models);
  };
}
