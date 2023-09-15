import { Executable } from '../Executable';

export function get_reboot() {
  return new Executable(
    'reboot',
    {
      execute: (args) => {
        if (args.length > 0) {
          return [`reboot: too many arguments`];
        }
        window.location.reload();
        return ['rebooting...'];
      },
      executeAsync: async (args) => {
        throw new Error('Method not implemented.');
      },
    },
    [
      ' ',
      '*******************',
      '*** reboot HELP ***',
      '*******************',
      ' ',
      'Reboot the terminal',
      ' ',
      'reboot',
      'Reboot the terminal',
      ' ',
    ]
  );
}
