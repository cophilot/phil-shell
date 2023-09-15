import { InputLineComponent } from 'src/app/input-line/input-line.component';
import { Executable } from '../Executable';
import { HistoryManager } from '../HistoryManager';

export function get_shutdown() {
  return new Executable(
    'shutdown',
    {
      execute: (args) => {
        if (args.length > 0) {
          return [`clear: too many arguments`];
        }
        HistoryManager.addLine('Shutting down...');
        HistoryManager.addLine('Have a nice day!');
        HistoryManager.addLine(' ');
        HistoryManager.addLine('by Philipp B.');
        setTimeout(() => {
          window.location.href = 'https://philipp-bonin.com/';
        }, 2000);

        return [];
      },
      executeAsync: async (args) => {
        throw new Error('Method not implemented.');
      },
    },
    [
      ' ',
      '*********************',
      '*** shutdown HELP ***',
      '*********************',
      ' ',
      'Shutdown the terminal',
      ' ',
      'shutdown',
      'Shutdown the terminal',
      ' ',
    ]
  );
}
