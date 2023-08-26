import { Executable } from '../Executable';

export function get_sudo() {
  return new Executable('sudo', {
    execute: (args) => {
      return ['$$$red~~~ERROR$$$: Permission denied'];
    },
    executeAsync: async (args) => {
      throw new Error('Method not implemented.');
    },
  });
}
