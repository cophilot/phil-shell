import { Compiler } from '../Compiler';
import { Executable } from '../Executable';

export function get_rp() {
  return new Executable(
    'rp',
    {
      execute: (args) => {
        throw new Error('Method not implemented.');
      },
      executeAsync: async (args) => {
        if (args.length <= 1) {
          return [`rp: too few arguments`];
        }
        const times = parseInt(args[0]);
        if (isNaN(times)) {
          return [`repeat: ${args[0]} is not a number`];
        }
        const command = args.slice(1).join(' ');
        for (let i = 0; i < times; i++) {
          await Compiler.compileLine(command);
        }
        return [];
      },
    },
    [
      ' ',
      '*********************',
      '*** repeat HELP ***',
      '*********************',
      ' ',
      'Repeat a command a number of times',
      ' ',
      'repeat [times] [command]',
      'Repeat a command a number of times',
      ' ',
    ],
    true
  );
}
