import { environment as env, AuthRESTDataSource } from "base-graphql";
import { extractParentDirectory } from "../parsers/directories";
import { ImportReturn, Directory } from "../../../generated-types/type-defs";

export class ImportAPI extends AuthRESTDataSource {
  public baseURL = `${env?.api.fileSystemImporterServiceUrl}/`;

  async getDirectories(dir: string): Promise<Directory[]> {
    const directories = await this.get(`importer/directories?dir=${dir}`);
    if (!Array.isArray(directories)) return [];

    return extractParentDirectory(directories as Directory[]);
  }

  async startImport(folder: string): Promise<ImportReturn> {
    return await this.post(`importer/start`, {
      body: {
        "selected-folder": folder,
      },
    });
  }
}
