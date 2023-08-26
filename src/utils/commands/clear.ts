import { Executable } from '../Executable';
import { HistoryManager } from '../HistoryManager';

export function get_clear() {
  return new Executable('clear', {
    execute: (args) => {
      if (args.length > 0) {
        return [`clear: too many arguments`];
      }
      HistoryManager.clear();
      return [];
    },
    executeAsync: async (args) => {
      throw new Error('Method not implemented.');
    },
  });
}
