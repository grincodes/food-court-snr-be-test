import { Model  } from "objection";

export class BaseModel extends Model {
  createdAt: string;
  updatedAt: string;
  version: number;

  // Define the schema for your base model.
  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        createdAt: { type: 'timestamp' },
        updatedAt: { type: 'timestamp' },
        version: { type: 'integer' },
      },
    };
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext);
    const currentDate = new Date().toISOString();

    this.createdAt = currentDate;
    this.updatedAt = currentDate;
    this.version = 0; // Set the initial version.
  }

  async $beforeUpdate(opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext);
    this.updatedAt = new Date().toISOString();
    this.version += 1; // Increment the version on each update.
  }
}


