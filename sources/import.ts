import { AuthRESTDataSource } from 'inuits-apollo-server-auth';
import { environment as env } from '../../../environment';
import { extractParentDirectory } from '../parsers/directories';
import { ImportReturn, Directory } from '../../../generated-types/type-defs';

export class ImportAPI extends AuthRESTDataSource {
  public baseURL = `${env.api.csvImportServiceUrl}/`;

  async getDirectories(dir: string): Promise<Directory[]> {
    let data: Directory[] = [];

    data = await this.get(`importer/directories?dir=${dir}`);

    return extractParentDirectory(data);
  }

  async startImport(folder: string): Promise<ImportReturn> {
    const data = await this.post(`importer/start`, {
      body: {
        selected_folder: folder,
      },
    });

    return data;
  }
}
