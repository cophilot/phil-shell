import { AppearanceService } from 'src/app/services/appearance.service';
import { Dir } from '../Dir';
import { Entry } from '../Entry';
import { Executable } from '../Executable';
import { System } from '../System';
import { SynonymManager } from '../SynonymManager';

export function get_ls() {
  return new Executable(
    'ls',
    {
      execute: (args) => {
        if (args.length > 1) {
          return [`ls: too many arguments`];
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

        if (args.length === 0) {
          return [
            System.getCurrentDir().getEntries().map(colorEntries).join(' '),
          ];
        }

        const path = System.resolveNewPath(args[0]);
        if (path === undefined) {
          return [`ls: ${args[0]}: No such file or directory`];
        }
        if (!(path[path.length - 1] instanceof Dir)) {
          return [`ls: ${args[0]}: Not a directory`];
        }
        return [
          (path[path.length - 1] as Dir)
            .getEntries()
            .map(colorEntries)
            .join(' '),
        ];
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
