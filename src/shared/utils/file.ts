import { access, rm } from 'fs/promises';

export const deleteFile = async (filename: string): Promise<void> => {
  try {
    await access(filename);
  } catch (error) {
    throw new Error(error);
  }

  await rm(filename);
};
