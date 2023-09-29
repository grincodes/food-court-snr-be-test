import { NotFoundException } from "@nestjs/common";
import { BaseModel } from "./BaseModel";
import { ModelClass } from "objection";

export abstract class AbstractRepo<T extends BaseModel> {
  constructor(private readonly modelClass: ModelClass<T>) {}

  async save(data: Partial<T>) {
    const res = await this.modelClass.query().insert(data);
    return res;
  }

  async findById(id: number | bigint, relations: string = "") {
    const res = await this.modelClass.query().findById(id).withGraphFetched(relations);
    return res;
  }

  async findOne(condition: Partial<T>) {
    const res = await this.modelClass.query().findOne(condition);
    return res;
  }

  async findAll() {
    const res = await this.modelClass.query();
    return res;
  }

  async find(condition: Partial<T>) {
    const res = await this.modelClass.query().where(condition);
    return res;
  }

  async findOneAndDelete(condition: Partial<T>) {
    const res = await this.modelClass
      .query()
      .delete()
      .where(condition)
      .delete();
    return res;
  }

  async findOneAndUpdate(condition: Partial<T>, partialEntity: Partial<T>) {
    const updatedCount = await this.modelClass
      .query()
      .where(condition)
      .update(partialEntity);

    if (!updatedCount) {
      console.warn("Entity not found with where", condition);
      throw new NotFoundException("Entity not found.");
    }

    const res = await this.findOne(condition);
    return res;
  }

  async findPaginated(
    pageSize = 10,
    currentPage = 1,
    where: Record<string, any> = {},
    relations: string = ""
  ) {
    const result = await this.modelClass
      .query()
      .where(where)
      .page(currentPage - 1, pageSize)
      .withGraphFetched(relations);

    return {
      data: result.results,
      pagination: {
        total: result.total,
        pageSize,
        currentPage,
      },
    };
  }

  async updateById(id: number | bigint, data: Partial<T>) {
    const res = await this.modelClass.query().patchAndFetchById(id, data);
    if (!res) {
      throw new NotFoundException("Entity with specified id not found.");
    }
    return res;
  }

  // Delete a record by ID
  async deleteById(id: number | bigint) {
    const res = await this.modelClass.query().deleteById(id);
    return res;
  }

  async exists(where: Partial<T>) {
    const res = await this.findOne(where);

    return !!res === true;
  }
}
