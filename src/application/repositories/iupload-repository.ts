export interface IUploadRepository {
  upload(file: File): Promise<string>;
}
