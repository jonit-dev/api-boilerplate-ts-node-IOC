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

  public async readAll<T>(document: string): Promise<T[]> {
    return await this.config.adapter.readAll(document);
  }

  public async readOne<T>(document: string, query: Record<string, unknown>): Promise<T[]> {
    return await this.config.adapter.readOne(document, query);
  }
}
