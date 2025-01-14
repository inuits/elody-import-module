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

  async getMagazinesWithMets(): Promise<string[]> {
    let magazines: string[] = [];
    try {
      magazines = await this.get(`importer/magazines/mets`);
    } catch (error: any) {}

    if (!Array.isArray(magazines) || magazines.length <= 0) return ["magazine1", "magazine2", "magazine3"];
    return magazines;
  }
  async startUploadMagazinesWithMets(magazine: string): Promise<string[]> {
    try {
      return await this.post(`importer/start/magazines/mets`, {
        body: {
          "selected-magazine": magazine,
        },
      });
    } catch (error: any) {}
    return [];
  }

  async getMagazinesWithCsv(): Promise<string[]> {
    let magazines: string[] = [];
    try {
      magazines = await this.get(`importer/magazines/csv`);
    } catch (error: any) {}

    if (!Array.isArray(magazines) || magazines.length <= 0) return ["magazine3", "magazine2", "magazine1"];
    return magazines;
  }
  async startUploadMagazinesWithCsv(magazine: string): Promise<string[]> {
    try {
      return await this.post(`importer/start/magazines/csv`, {
        body: {
          "selected-magazine": magazine,
        },
      });
    } catch (error: any) {}
    return [];
  }

  async getOcrFiles(): Promise<string[]> {
    let ocr_files: string[] = [];
    try {
      ocr_files = await this.get(`importer/ocr`);
    } catch (error: any) {}

    if (!Array.isArray(ocr_files) || ocr_files.length <= 0) return ["ocr1", "ocr2", "ocr3", "ocr4"];
    return ocr_files;
  }
  async startUploadOcr(ocrFile: string): Promise<string[]> {
    try {
      return await this.post(`importer/start/ocr`, {
        body: {
          "selected-ocr-file": ocrFile,
        },
      });
    } catch (error: any) {}
    return [];
  }
}
