import { Dir } from './Dir';
import { Entry } from './Entry';
import { Executable } from './Executable';
import { BashFile } from './BashFile';
import { Compiler } from './Compiler';
import { get_pwd } from './commands/pwd';
import { get_clear } from './commands/clear';
import { get_cd } from './commands/cd';
import { get_ls } from './commands/ls';
import { get_sudo } from './commands/sudo';
import { get_echo } from './commands/echo';
import { get_reboot } from './commands/reboot';
import { get_wait } from './commands/wait';
import { get_system } from './commands/system';
import { get_time } from './commands/time';
import { get_date } from './commands/date';

export class System {
  public static VERSION = '1.0';
  public static BASH: Dir = System.getBashDir();
  public static ROOT: Dir = System.getRoot();
  public static currentPath: Dir[] = [System.ROOT];

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
    bash.add(get_pwd());

    // clear
    bash.add(get_clear());

    // cd
    bash.add(get_cd());

    // ls
    bash.add(get_ls());

    // sudo
    bash.add(get_sudo());

    // echo
    bash.add(get_echo());

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

    bash.add(get_reboot());

    bash.add(get_wait());

    bash.add(get_system());

    bash.add(get_time());

    bash.add(get_date());

    return bash;
  }

  static getUserDir(): Dir {
    const userDir = new Dir('phil');
    const scripts = new Dir('scripts');
    userDir.add(scripts);

    scripts.add(
      new BashFile('HelloWorld', [
        '# Hello World Script',
        "echo 'Hello World!'",
      ])
    );
    scripts.add(
      new BashFile('Welcome', [
        'wait 100 q',
        'echo "                  welcome to                "',
        'wait 100 q',
        'echo " "',
        'wait 100 q',
        'echo "        _     _ _            _          _ _ "',
        'wait 100 q',
        'echo "       | |   (_) |          | |        | | |"',
        'wait 100 q',
        'echo "  _ __ | |__  _| |______ ___| |__   ___| | |"',
        'wait 100 q',
        'echo " |  _ \\|  _ \\| | |______/ __|  _ \\ / _ \\ | |"',
        'wait 100 q',
        'echo " | |_) | | | | | |      \\__ \\ | | |  __/ | |"',
        'wait 100 q',
        'echo " | .__/|_| |_|_|_|      |___/_| |_|\\___|_|_|"',
        'wait 100 q',
        'echo " | |"',
        'wait 100 q',
        'echo " |_|"',
        'wait 100 q',
        'echo " "',
        'echo "Version"',
        'system version',
        'echo " "',
      ])
    );
    scripts.add(
      new BashFile('onboot', [
        '# This file will be executed on boot',
        'cd ~',
        './scripts/Welcome.sh',
      ])
    );
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
      if (dirs[i] === '.') continue;
      if (dirs[i] === '..') {
        if (newPath.length === 1) {
          return undefined;
        }
        newPath.pop();
        currentDir = newPath[newPath.length - 1] as Dir;
        continue;
      }

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
    for (let i = 0; i < dirs.length; i++) {
      if (dirs[i] === '.') continue;
      if (dirs[i] === '..') {
        if (newPath.length === 1) {
          return undefined;
        }
        newPath.pop();
        currentDir = newPath[newPath.length - 1] as Dir;
        continue;
      }
      const entry = currentDir.getEntry(dirs[i]);
      if (entry === undefined) {
        return undefined;
      }
      if (!(entry instanceof Dir)) {
        if (i !== dirs.length - 1) {
          console.log('entry undefined2');
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

  static onBoot(): void {
    Compiler.compileLine('./home/phil/scripts/onboot.sh');
  }

  static getExecutable(name: string): Executable | undefined {
    if (name.startsWith('./')) {
      const path = System.resolveNewPath(name);

      if (path !== undefined && path[path.length - 1] instanceof Executable) {
        return path[path.length - 1] as Executable;
      }
    }

    const ex = System.BASH.getEntry(name);
    if (ex === undefined || !(ex instanceof Executable)) {
      return undefined;
    }
    return ex;
  }
}
