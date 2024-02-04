import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

export function getCurrentModuleDirectoryPath(url: string) {
  const filepath = fileURLToPath(url);
  return dirname(filepath);
}
