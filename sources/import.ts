import {AuthRESTDataSource, environment as env} from "base-graphql";
import {extractParentDirectory} from "../parsers/directories";
import {Directory, ImportReturn} from "../../../generated-types/type-defs";

export class ImportAPI extends AuthRESTDataSource {

    async getDirectories(dir: string): Promise<Directory[]> {
        const baseURL = this.determineBaseURL();
        const data = await this.get(`${baseURL}importer/directories?dir=${dir}`);
        return extractParentDirectory(data);
    }

    async startImport(folder: string): Promise<ImportReturn> {
        const baseURL = this.determineBaseURL();
        const data = await this.post(`${baseURL}importer/start`, {
            body: {
                selected_folder: folder,
            },
        });

        return data;
    }

    private determineBaseURL(): string {
        const applicationTitle = env?.customization?.applicationTitle || '';
        return applicationTitle === 'CoGhent' ?
            `${env?.api.csvImportServiceUrl}/` :
            `${env?.api.fileSystemImporterServiceUrl}` || '';
    }
}
