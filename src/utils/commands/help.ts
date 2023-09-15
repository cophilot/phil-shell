import { Executable } from '../Executable';
import { SynonymManager } from '../SynonymManager';
import { System } from '../System';

export function get_help() {
  return new Executable(
    'help',
    {
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
        let exec = System.getExecutable(args[0]);
        if (exec == undefined) {
          return [`help: command not found: ${args[0]}`];
        }
        if (exec.HELP.length === 0) {
          return [`help: no help message for ${args[0]}`];
        }
        return exec.HELP;
      },
      executeAsync: async (args) => {
        throw new Error('Method not implemented.');
      },
    },
    [
      ' ',
      '*****************',
      '*** help HELP ***',
      '*****************',
      ' ',
      'Print the help messages',
      ' ',
      'help',
      'Print the help message',
      ' ',
      'help [command]',
      "Print the help message for the command 'command'",
      ' ',
    ]
  );
}
