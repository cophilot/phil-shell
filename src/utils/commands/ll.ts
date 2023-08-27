import { Dir } from '../Dir';
import { Entry } from '../Entry';
import { Executable } from '../Executable';
import { System } from '../System';
import { SynonymManager } from '../SynonymManager';

export function get_ll() {
  return new Executable(
    'll',
    {
      execute: (args) => {
        if (args.length > 1) {
          return [`ll: too many arguments`];
        }

        const colorEntries = (entry: Entry) => {
          if (entry instanceof Dir) {
            return SynonymManager.colorString(entry.name, '#08458f');
          }
          if (entry instanceof Executable) {
            return SynonymManager.colorString(entry.name, '#28865c');
          }

          return entry.name;
        };

        let path = System.currentPath as Entry[];

        if (args.length === 1) {
          let newPath = System.resolveNewPath(args[0]);
          if (newPath === undefined) {
            return [`ll: ${args[0]}: No such file or directory`];
          }
          path = newPath;
        }

        if (!(path[path.length - 1] instanceof Dir)) {
          return [
            path[path.length - 1].getPermissionFlagAsString() +
              ` 1 phil phil 4096 May 15 2022 ${colorEntries(
                path[path.length - 1]
              )}`,
          ];
        }
        const dir = path[path.length - 1] as Dir;
        const entries = dir.getEntries();
        let result = [
          'total ' + dir.getTotalEntriesCount(),
          dir.getPermissionFlagAsString() +
            ' 5 phil phil 4096 May 15 2022 ' +
            SynonymManager.colorString('.', '#08458f') +
            '/',
        ];
        if (dir.name != '') {
          result.push(
            dir.getPermissionFlagAsString() +
              ' 5 phil phil 4096 May 15 2022 ' +
              SynonymManager.colorString('..', '#08458f') +
              '/'
          );
        }
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i];
          result.push(
            entry.getPermissionFlagAsString() +
              ' 5 phil phil 4096 May 15 2022 ' +
              colorEntries(entry)
          );
        }
        return result;
      },
      executeAsync: async (args) => {
        throw new Error('Method not implemented.');
      },
    },
    [
      'List information about the FILEs (the current directory by default).',
      'ls [dir]?',
    ]
  );
}
