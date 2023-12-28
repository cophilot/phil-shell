import { Executable } from '../Executable';
import { HistoryManager } from '../HistoryManager';
import { SynonymManager } from '../SynonymManager';

export function get_wait() {
  return new Executable(
    'wait',
    {
      execute: (args) => {
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
        let quietly = SynonymManager.isQuietly(args);

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
    [
      ' ',
      '*****************',
      '*** wait HELP ***',
      '*****************',
      ' ',
      'Wait for a specified amount of time',
      ' ',
      'wait [time]',
      'Wait for [time] milliseconds',
      ' ',
    ],
    true
  );
}
