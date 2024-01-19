import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName() {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            main.cli.ts --<${chalk.blue('command')}> [${chalk.cyan('--arguments')}]
        Команды:
            ${chalk.cyan('--version')}:                   ${chalk.magenta('# выводит номер версии')}
            ${chalk.cyan('--help')}:                      ${chalk.magenta('# печатает этот текст')}
            ${chalk.cyan('--import')} <path>:             ${chalk.magenta('# импортирует данные из TSV')}
            ${chalk.cyan('--generate')} <n> <path> <url>: ${chalk.magenta('# генерирует произвольное количество тестовых данных')}
    `);
  }
}
