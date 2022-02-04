import { localDbPath } from "@providers/constants/pathConstants";
import { provide } from "inversify-binding-decorators";
import _ from "lodash";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";

@provide(JSONDatabase)
export class JSONDatabase {
  private db: JsonDB;

  constructor() {
    this.db = new JsonDB(new Config(`${localDbPath}/dev-database`, true, false, "/"));
  }

  public readAll<T>(dataPath: string): T[] {
    return this.db.getData(dataPath);
  }

  public readOne<T>(dataPath: string, query: Record<string, unknown>): T {
    const data = this.db.getData(dataPath);

    return _.find(data[dataPath], query);
  }
}
