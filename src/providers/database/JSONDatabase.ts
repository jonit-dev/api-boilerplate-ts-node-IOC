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
    try {
      this.db.push(`/${dataPath}[]`, {
        ...data,
        id: uuidv4(),
      });

      const createdData = this.readOne<T>(dataPath, { id: Number(data.id) });

      return createdData;
    } catch (error) {
      console.error(error);
      throw new NotFoundError(`Failed to create new document in ${dataPath}`);
    }
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

    const results = data[dataPath].filter(sift(query))[0];

    if (!results) {
      throw new NotFoundError(`No data found for ${dataPath}`);
    }

    return results;
  }

  public updateOne<T>(dataPath: string, id: string, updateData: Record<string, unknown>): T {
    try {
      const index = this.getIndex(dataPath, id);

      this.db.push(`/${dataPath}/${index}`, updateData, false);

      return this.readOne(dataPath, { id: id });
    } catch (error) {
      console.error(error);
      throw new NotFoundError(`Failed to update data for ${dataPath} id ${id}`);
    }
  }

  public deleteOne(dataPath: string, id: string): void {
    try {
      const index = this.getIndex(dataPath, id);

      this.db.delete(`/${dataPath}/${index}`);
    } catch (error) {
      console.error(error);
      throw new NotFoundError(`Failed to delete data for ${dataPath} id ${id}`);
    }
  }

  private getIndex(dataPath: string, id: string): number {
    const index = this.db.getData(dataPath)[dataPath].findIndex(
      sift({
        id: id,
      })
    );

    if (index === -1) {
      throw new NotFoundError(`No data found for ${dataPath} id ${id}`);
    }

    return index;
  }
}
