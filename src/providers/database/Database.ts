import { provide } from "inversify-binding-decorators";
import { JSONDatabase } from "./JSONDatabase";

@provide(Database)
export class Database {
  private config;

  constructor(private jsonDatabase: JSONDatabase) {
    this.config = {
      adapter: this.jsonDatabase,
    };
  }

  public async create<T>(collection: string, data: T): Promise<T[]> {
    return await this.config.adapter.create(collection, data);
  }

  public async readAll<T>(collection: string, query: Record<string, unknown>): Promise<T[]> {
    return await this.config.adapter.readAll(collection, query);
  }

  public async readOne<T>(collection: string, query: Record<string, unknown>): Promise<T[]> {
    return await this.config.adapter.readOne(collection, query);
  }

  public async updateOne<T>(collection: string, id: string, updatedPost: T): Promise<T[]> {
    return await this.config.adapter.updateOne(collection, id, updatedPost);
  }

  public async deleteOne(collection: string, id: string): Promise<void> {
    return await this.config.adapter.deleteOne(collection, id);
  }
}
