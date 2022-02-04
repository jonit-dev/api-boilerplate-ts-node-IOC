import { localDbPath } from "@providers/constants/pathConstants";
import { NotFoundError } from "@providers/errors/NotFoundError";
import { provide } from "inversify-binding-decorators";
import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import sift from "sift";
import { v4 as uuidv4 } from "uuid";

@provide(JSONDatabase)
export class JSONDatabase {
  private db: JsonDB;

  constructor() {
    this.db = new JsonDB(new Config(`${localDbPath}/dev-database`, true, false, "/"));
  }

  public create<T>(dataPath: string, data: Record<string, unknown>): T {
    this.db.push(`/${dataPath}[]`, {
      ...data,
      id: uuidv4(),
    });

    const createdData = this.readOne<T>(dataPath, { id: Number(data.id) });

    return createdData;
  }

  public readAll<T>(dataPath: string, query: Record<string, unknown>): T[] {
    try {
      return this.db.getData(dataPath)[dataPath].filter(sift(query.filter));
    } catch (error) {
      console.error(error);
      throw new NotFoundError(`No data found for ${dataPath}`);
    }
  }

  public readOne<T>(dataPath: string, query: Record<string, unknown>): T {
    const data = this.db.getData(dataPath);

    return data[dataPath].filter(sift(query))[0];
  }

  public updateOne<T>(dataPath: string, id: string, updateData: Record<string, unknown>): T {
    const index = this.getIndex(dataPath, id);

    this.db.push(`/${dataPath}/${index}`, updateData, false);

    return this.readOne(dataPath, { id: Number(id) });
  }

  public deleteOne(dataPath: string, id: string): void {
    const index = this.getIndex(dataPath, id);

    this.db.delete(`/${dataPath}/${index}`);
  }

  private getIndex(dataPath: string, id: string): number {
    return this.db.getData(dataPath)[dataPath].findIndex(
      sift({
        id: Number(id),
      })
    );
  }
}
