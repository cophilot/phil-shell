import { Executable } from '../Executable';
import { SynonymManager } from '../SynonymManager';

export function get_help() {
  return new Executable('help', {
    execute: (args) => {
      if (args.length > 1) {
        return [`help: too many arguments`];
      }
      if (args.length === 0) {
        return [
          ' ',
          ' **********************************',
          ' *** ' +
            SynonymManager.colorString('Welcome to the help center', 'red') +
            ' ***',
          ' **********************************',
          ' ',
          ' help: print this help message',
          ' help [command]: print help message for [command]',
          ' ',
        ];
      }
      return [];
    },
    executeAsync: async (args) => {
      throw new Error('Method not implemented.');
    },
  });
}
