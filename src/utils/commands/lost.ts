import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Executable } from '../Executable';
import { HistoryManager } from '../HistoryManager';

export function get_lost() {
  return new Executable(
    'lost',
    {
      execute: (args) => {
        if (args.length != 1) {
          return [`lost: missing operand`];
        }
        switch (args[0]) {
          case 'save':
            LocalStorageService.saveLocalDirectory();
            return ["'local' directory saved"];
          case 'clear':
            LocalStorageService.clear();
            return ["'local' directory cleared"];
          default:
            return [`lost: '${args[0]}' is not a command`];
        }
      },
      executeAsync: async (args) => {
        throw new Error('Method not implemented.');
      },
    },
    [
      ' ',
      '**************************',
      '*** local storage HELP ***',
      '**************************',
      ' ',
      'Access the local storage of your browser to save and load the /usr/local directory',
      ' ',
      'lost save',
      'save the /usr/local directory in the local storage',
      ' ',
      'lost clear',
      'clear the /usr/local directory in the local storage',
      ' ',
    ]
  );
}
