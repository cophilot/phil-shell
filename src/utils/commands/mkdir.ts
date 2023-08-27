import { Dir } from '../Dir';
import { Entry } from '../Entry';
import { Executable } from '../Executable';
import { HistoryManager } from '../HistoryManager';
import { System } from '../System';

export function get_mkdir() {
  return new Executable('mkdir', {
    execute: (args) => {
      if (args.length === 0) {
        return [`mkdir: missing operand`];
      }
      if (args.length > 1) {
        return [`mkdir: too many arguments`];
      }
      if (
        args[0].includes('/') ||
        args[0] === '..' ||
        args[0] === '.' ||
        args[0] === '~' ||
        args[0] === ' ' ||
        args[0] === ''
      ) {
        return [`mkdir: cannot create directory '${args[0]}': Invalid name`];
      }
      if (!System.getCurrentDir().isWritable()) {
        return [
          `mkdir: cannot create directory '${args[0]}': Permission denied`,
        ];
      }
      if (System.getCurrentDir().getEntry(args[0]) !== undefined) {
        return [`mkdir: cannot create directory '${args[0]}': File exists`];
      }
      System.getCurrentDir().add(new Dir(args[0]) as Entry);
      return [args[0] + ' created successfully!'];
    },
    executeAsync: async (args) => {
      throw new Error('Method not implemented.');
    },
  });
}
