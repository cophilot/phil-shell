import { Dir } from './Dir';
import { Entry } from './Entry';
import { File } from './File';
import { Executable } from './Executable';
import { HistoryManager } from './HistoryManager';

export class System {
  public static BASH: Dir = System.getBashDir();
  public static ROOT: Dir = System.getRoot();
  public static currentPath: Dir[] = [
    System.ROOT,
    /*     System.ROOT.getEntry('bin') as Dir,
    System.BASH, */
  ];

  static getRoot(): Dir {
    const root = new Dir('');
    const bin = new Dir('bin');
    bin.add(System.BASH);
    root.add(bin);

    const home = new Dir('home');
    home.add(System.getUserDir());
    root.add(home);

    return root;
  }

  static getBashDir(): Dir {
    const bash = new Dir('bash');

    // pwd
    bash.add(
      new Executable('pwd', {
        execute: (args) => {
          if (args.length > 0) {
            return [`pwd: too many arguments`];
          }
          return [System.getCurrentPathAsString()];
        },
      })
    );

    // clear
    bash.add(
      new Executable('clear', {
        execute: (args) => {
          if (args.length > 0) {
            return [`clear: too many arguments`];
          }
          HistoryManager.clear();
          return [];
        },
      })
    );

    // cd
    bash.add(
      new Executable('cd', {
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
      })
    );

    // ls
    bash.add(
      new Executable(
        'ls',
        {
          execute: (args) => {
            if (args.length > 1) {
              return [`ls: too many arguments`];
            }

            const colorEntries = (entry: Entry) => {
              if (entry instanceof Dir) {
                return '$$$#08458f~~~' + entry.name + '$$$';
              }
              if (entry instanceof Executable) {
                return '$$$#28865c~~~' + entry.name + '$$$';
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
        },
        [
          'List information about the FILEs (the current directory by default).',
          'ls [dir]?',
        ]
      )
    );

    // sudo
    bash.add(
      new Executable('sudo', {
        execute: (args) => {
          return ['$$$red~~~ERROR$$$: Permission denied'];
        },
      })
    );

    // echo
    bash.add(
      new Executable('echo', {
        execute: (args) => {
          return [args.join(' ').replace(/"/g, '')];
        },
      })
    );

    /* // cat
    bash.add(
      new Executable('cat', {
        execute: (args) => {
          if (args.length === 0) {
            return [`cat: missing operand`];
          }
          if (args.length > 1) {
            return [`cat: too many arguments`];
          }
          const file = System.getCurrentDir().getEntry(args[0]);
          if (file === undefined) {
            return [`cat: ${args[0]}: No such file or directory`];
          }
          if (file instanceof Dir) {
            return [`cat: ${args[0]}: Is a directory`];
          }
          return [file.name];
        },
      })
    ); */

    return bash;
  }

  static getUserDir(): Dir {
    const userDir = new Dir('phil');

    const projects = new Dir('projects');
    const skills = new Dir('skills');
    const contact = new Dir('contact');
    const about = new Dir('about');

    userDir.addEntries([projects, skills, contact, about]);
    return userDir;
  }

  static resolveNewPath(path: string): Entry[] | undefined {
    if (path === '') {
      return [System.ROOT];
    }

    if (path === '~') {
      return this.resolveNewPath(System.getUserPathAsString());
    }

    if (path.startsWith('~/')) {
      return this.resolveNewPath(
        System.getUserPathAsString() + path.substring(1)
      );
    }

    if (path.startsWith('/')) {
      return this.resolveNewPathFromRoot(path);
    }

    return this.resolveNewPathFromCurrent(path);
  }

  private static resolveNewPathFromRoot(path: string): Entry[] | undefined {
    let newPath: Entry[] = [];
    let currentDir = System.ROOT;
    newPath.push(currentDir);
    const dirs = path.split('/').slice(1);
    for (let i = 0; i < dirs.length; i++) {
      const entry = currentDir.getEntry(dirs[i]);
      if (entry === undefined) {
        return undefined;
      }
      if (!(entry instanceof Dir)) {
        if (i !== dirs.length - 1) {
          return undefined;
        } else {
          newPath.push(entry);
          return newPath;
        }
      }

      newPath.push(entry);
      currentDir = entry;
    }
    return newPath;
  }

  private static resolveNewPathFromCurrent(path: string): Entry[] | undefined {
    let newPath: Entry[] = [];
    this.currentPath.forEach((entry) => newPath.push(entry));
    let currentDir = System.getCurrentDir();
    let dirs = [];
    if (path.includes('/')) {
      dirs = path.split('/');
    } else {
      dirs = [path];
    }

    console.log(dirs);
    for (let i = 0; i < dirs.length; i++) {
      const entry = currentDir.getEntry(dirs[i]);
      if (entry === undefined) {
        return undefined;
      }
      if (!(entry instanceof Dir)) {
        if (i !== dirs.length - 1) {
          return undefined;
        } else {
          newPath.push(entry);
          return newPath;
        }
      }

      newPath.push(entry);
      currentDir = entry;
    }
    return newPath;
  }

  static getCurrentPathAsString(): string {
    let path = System.currentPath.map((dir) => dir.name).join('/');
    if (path === '') {
      path = '/';
    }
    return path;
  }

  static getCurrentDir(): Dir {
    return System.currentPath[System.currentPath.length - 1];
  }

  static getUserPathAsString(): string {
    return '/home/phil';
  }
  static getBashPathAsString(): string {
    return '/bin/bash';
  }

  static getExecutable(name: string): Executable | undefined {
    if (name.startsWith('./')) {
      name = name.substring(2);
      const ex = System.getCurrentDir().getEntry(name);
      if (ex === undefined || !(ex instanceof Executable)) {
        return undefined;
      }
      return ex;
    }

    const ex = System.BASH.getEntry(name);
    if (ex === undefined || !(ex instanceof Executable)) {
      return undefined;
    }
    return ex;
  }
}
