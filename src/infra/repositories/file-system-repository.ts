import { IFileSystemRepository } from '../../application/repositories/ifilesystem-repository';
import { deleteFile } from '../../shared/utils/file';

export class FileSystemRepository implements IFileSystemRepository {
  async deleteFile(filename: string): Promise<void> {
    await deleteFile(filename);
  }
}
