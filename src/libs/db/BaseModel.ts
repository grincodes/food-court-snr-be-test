import { Model } from "objection";

export class BaseModel extends Model {
  createdAt: string;
  updatedAt: string;
  version: number;

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
    if (this.version) {
      this.version += 1;
    }
  }
}
