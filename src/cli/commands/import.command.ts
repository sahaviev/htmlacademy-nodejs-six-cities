import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import chalk from 'chalk';

export class ImportCommand implements Command {
  public getName() {
    return '--import';
  }

  public execute(...parameters: string[]): void {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(`${chalk.blue('Can\'t import data from file:')} ${filename}`);
      console.error(`${chalk.blue('Details:')} ${err.message}`);
    }
  }
}
