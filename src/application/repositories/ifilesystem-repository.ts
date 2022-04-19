export interface IFileSystemRepository {
  deleteFile(filename: string): Promise<void>;
}
