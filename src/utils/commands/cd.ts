import { Dir } from '../Dir';
import { Executable } from '../Executable';
import { System } from '../System';

export function get_cd() {
  return new Executable('cd', {
    execute: (args) => {
      if (args.length > 1) {
        return [`cd: too many arguments`];
      }

      if (args.length === 0) {
        System.currentPath = [System.ROOT];
        return [];
      }

      if (args[0] === '..') {
        if (System.currentPath.length === 1) {
          return [`cd: can't go back from root`];
        }
        System.currentPath.pop();
        return [];
      }

      if (args[0] === '.') {
        return [];
      }

      const newPath = System.resolveNewPath(args[0]);

      if (newPath === undefined) {
        return [`cd: ${args[0]}: No such file or directory`];
      }
      if (!(newPath[newPath.length - 1] instanceof Dir)) {
        return [`cd: ${args[0]}: Not a directory`];
      }
      System.currentPath = newPath as Dir[];
      return [];
    },
    executeAsync: async (args) => {
      throw new Error('Method not implemented.');
    },
  });
}
