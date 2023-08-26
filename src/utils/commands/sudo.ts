import { Executable } from '../Executable';
import { SynonymManager } from '../SynonymManager';

export function get_sudo() {
  return new Executable('sudo', {
    execute: (args) => {
      return [
        SynonymManager.colorString('ERROR', 'red') + ' Permission denied',
      ];
    },
    executeAsync: async (args) => {
      throw new Error('Method not implemented.');
    },
  });
}
