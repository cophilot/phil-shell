import { BashFile } from '../BashFile';
import { Dir } from '../Dir';
import { Executable } from '../Executable';
import { File } from '../File';
import { System } from '../System';

export function get_cat() {
  return new Executable(
    'cat',
    {
      execute: (args) => {
        if (args.length != 1) {
          return [`cat: missing operand`];
        }

        const path = System.resolveNewPath(args[0]);
        if (path == undefined) {
          return [`cat: ${args[0]}: No such file or directory`];
        }
        const file = path[path.length - 1];
        if (file instanceof Dir) {
          return [`cat: ${args[0]}: Is a directory`];
        }
        if (file instanceof BashFile) {
          return file.content;
        }
        if (file instanceof Executable) {
          return [`cat: ${args[0]}: Is an executable`];
        }
        if (file instanceof File) {
          return file.content;
        }

        return [`cat: ${args[0]}: No such file or directory`];
      },
      executeAsync: async (args) => {
        throw new Error('Method not implemented.');
      },
    },
    [
      ' ',
      '************************',
      '*** concatenate HELP ***',
      '************************',
      ' ',
      'Print the content of a file in the terminal',
      ' ',
      'cat [file]',
      "Print the content of the file 'file' in the terminal",
      ' ',
    ]
  );
}
