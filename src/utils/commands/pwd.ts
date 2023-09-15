import { Executable } from '../Executable';
import { System } from '../System';

export function get_pwd() {
  return new Executable(
    'pwd',
    {
      execute: (args) => {
        if (args.length > 0) {
          return [`pwd: too many arguments`];
        }
        return [System.getCurrentPathAsString()];
      },
      executeAsync: async (args) => {
        throw new Error('Method not implemented.');
      },
    },

    [
      ' ',
      '************************************',
      '*** print working directory HELP ***',
      '************************************',
      ' ',
      'Print the current working directory',
      ' ',
      'pwd',
      'Print the current working directory',
      ' ',
    ]
  );
}
