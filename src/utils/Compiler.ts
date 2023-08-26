import { Executable } from './Executable';
import { HistoryManager } from './HistoryManager';
import { System } from './System';

export class Compiler {
  static async compileLine(line: string): Promise<void> {
    if (line.length === 0) return;
    line = line.trim();

    let words = line.split(' ');
    let command = words[0];
    let args = words.slice(1);

    let executable = System.getExecutable(command);

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

      return Promise.resolve();
    }
    executable = executable as Executable;
    if (executable.IS_ASYNC) {
      let output = await executable.executeAsync(args);
      HistoryManager.addLines(output);
    } else {
      HistoryManager.addLines(executable.execute(args));
    }
    return Promise.resolve();
  }
}
