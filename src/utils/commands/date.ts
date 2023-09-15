import { Executable } from '../Executable';

export function get_date() {
  return new Executable(
    'date',
    {
      execute: (args) => {
        if (args.length > 0) {
          return [`time: too many arguments`];
        }
        return [new Date().toLocaleDateString()];
      },
      executeAsync: async (args) => {
        throw new Error('Method not implemented.');
      },
    },
    [
      ' ',
      '*****************',
      '*** date HELP ***',
      '*****************',
      ' ',
      'Print the current date',
      ' ',
      'date',
      'Print the current date',
      ' ',
    ]
  );
}
