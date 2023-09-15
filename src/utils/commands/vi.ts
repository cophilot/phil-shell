import { BashFile } from '../BashFile';
import { Dir } from '../Dir';
import { Entry } from '../Entry';
import { Executable } from '../Executable';
import { File } from '../File';
import { System } from '../System';

export function get_vi() {
  return new Executable(
    'vi',
    {
      execute: (args) => {
        if (args.length != 1) {
          return [`vi: too many arguments`];
        }
        let newPath = System.resolveNewPath(args[0]);
        if (newPath == undefined) {
          let fileName = args[0];
          let path = System.currentPath as Entry[];
          if (args[0].includes('/')) {
            let pathArr = args[0].split('/');
            let fileName1 = pathArr.pop();
            let path1 = System.resolveNewPath(pathArr.join('/'));
            if (path1 == undefined || fileName1 == undefined) {
              return [`vi: ${args[0]}: No such file`];
            }
            path = path1;
            fileName = fileName1;
          }
          if (path[path.length - 1] instanceof Dir) {
            let dir = path[path.length - 1] as Dir;
            if (!dir.isWritable()) {
              return [`vi: ${args[0]}: Permission denied`];
            }
            let newFile: Entry;
            if (fileName.endsWith('.ph')) {
              newFile = new BashFile(fileName);
            } else {
              newFile = new File(fileName);
            }
            dir.add(newFile);
            System.ACTIVEFILE = newFile;
            return [args[0] + ' created'];
          }
          return [`vi: ${args[0]}: No such file`];
        }
        let file = newPath[newPath.length - 1];
        if (file instanceof Dir) {
          return [`vi: ${args[0]}: Is a directory`];
        }
        if (!file.isReadable()) {
          return [`vi: ${args[0]}: Permission denied`];
        }
        System.ACTIVEFILE = file;
        return [];
      },
      executeAsync: async (args) => {
        throw new Error('Method not implemented.');
      },
    },
    [
      ' ',
      '**************************',
      '*** visual editor HELP ***',
      '**************************',
      ' ',
      'Create or edit a file',
      ' ',
      'vi [file]',
      "Create or edit the file 'file'",
      ' ',
      'In the editor, you can use the following commands:',
      ' ',
      'i',
      'Insert mode',
      ' ',
      'esc',
      'Command mode',
      ' ',
      ':w',
      'Save the file',
      ' ',
      ':q',
      'Quit the editor',
      ' ',
      ':wq',
      'Save and quit',
      ' ',
    ]
  );
}
