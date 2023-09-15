import { Executable } from '../Executable';

export function get_time() {
  return new Executable(
    'time',
    {
      execute: (args) => {
        if (args.length > 0) {
          return [`time: too many arguments`];
        }
        return [new Date().toLocaleTimeString()];
      },
      executeAsync: async (args) => {
        throw new Error('Method not implemented.');
      },
    },
    [
      ' ',
      '*****************************',
      '*** time HELP ***',
      '*****************************',
      ' ',
      'Print the current time',
      ' ',
      'time',
      'Print the current time',
      ' ',
    ]
  );
}
