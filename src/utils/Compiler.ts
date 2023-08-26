import { Executable } from './Executable';
import { HistoryManager } from './HistoryManager';
import { System } from './System';

export class Compiler {
  static compileLine(line: string) {
    if (line.length === 0) return;
    line = line.trim();

    let words = line.split(' ');
    let command = words[0];
    let args = words.slice(1);

    const executable = System.getExecutable(command);

    if (executable === undefined) {
      if (command.startsWith('./')) {
        HistoryManager.addLine(
          `${
            System.getCurrentPathAsString() + command.slice(1)
          }: command not found`
        );
      } else {
        HistoryManager.addLine(
          `${System.getBashPathAsString() + '/' + command}: command not found`
        );
      }

      return;
    }
    HistoryManager.addLines((executable as Executable).execute(args));
  }
}
