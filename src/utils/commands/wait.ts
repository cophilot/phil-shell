import { Executable } from '../Executable';
import { HistoryManager } from '../HistoryManager';

export function get_wait() {
  return new Executable(
    'wait',
    {
      execute: (args) => {
        console.log(args);
        throw new Error('Method not implemented.');
      },
      executeAsync: async (args) => {
        if (args.length == 0 || args.length > 2) {
          return [`wait: invalid argument`];
        }
        const time = parseInt(args[0]);
        if (isNaN(time)) {
          return [`wait: invalid argument`];
        }
        let quietly = false;
        if (args.length == 2) {
          if (args[1] == 'quietly' || args[1] == 'q' || args[1] == '-q') {
            quietly = true;
          } else {
            return [`wait: invalid argument`];
          }
        }
        if (!quietly) {
          HistoryManager.addLine(`waiting ${time}ms...`);
        }
        return new Promise((resolve) => {
          setTimeout(resolve, time);
        }).then(() => {
          if (!quietly) {
            return ['done'];
          }
          return [];
        });
      },
    },
    [],
    true
  );
}
