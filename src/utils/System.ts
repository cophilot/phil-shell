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
import { get_sys } from './commands/sys';
import { get_time } from './commands/time';
import { get_date } from './commands/date';
import { get_help } from './commands/help';
import { get_shutdown } from './commands/shutdown';
import { get_cat } from './commands/cat';
import { get_ll } from './commands/ll';
import { get_mkdir } from './commands/mkdir';
import { get_pxm } from './commands/pxm';
import { getUserDir } from './dirs/UserDir';
import { PhilExtensionManager } from 'src/pxm/PhilExtensionManager';
import { get_vi } from './commands/vi';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { get_lost } from './commands/lost';

export class System {
  public static VERSION = '1.0';
  public static BASH: Dir = System.getBashDir();
  public static LOCAL: Dir = LocalStorageService.getLocalDirectory();
  public static ROOT: Dir = System.getRoot();
  public static currentPath: Dir[] = [System.ROOT];

  public static ACTIVEFILE: any | undefined = undefined;

  static getRoot(): Dir {
    const root = new Dir('');

    // /bin/bash
    const bin = new Dir('bin');
    bin.setWritable(false);
    bin.add(System.BASH);
    root.add(bin);

    // /pxm_modules
    System.BASH.add(PhilExtensionManager.PXM_MODULES);

    // /home/phil
    const home = new Dir('home');
    home.add(getUserDir());
    root.add(home);

    // /home/phil
    const usr = new Dir('usr');
    usr.setWritable(false);
    usr.add(System.LOCAL);

    root.add(usr);

    return root;
  }

  private static getBashDir(): Dir {
    const bash = new Dir('bash');

    bash.add(get_pwd());
    bash.add(get_clear());
    bash.add(get_cd());
    bash.add(get_ls());
    bash.add(get_sudo());
    bash.add(get_echo());
    bash.add(get_reboot());
    bash.add(get_wait());
    bash.add(get_sys());
    bash.add(get_time());
    bash.add(get_date());
    bash.add(get_help());
    bash.add(get_shutdown());
    bash.add(get_cat());
    bash.add(get_ll());
    bash.add(get_mkdir());
    bash.add(get_pxm());
    bash.add(get_vi());
    bash.add(get_lost());

    bash.setWritable(false);

    return bash;
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

    if (path == '/') {
      return [System.ROOT];
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
    Compiler.compileLine('./usr/local/scripts/onboot.ph');
  }

  static getExecutable(name: string): Executable | undefined {
    if (name.startsWith('./')) {
      const path = System.resolveNewPath(name);

      if (path !== undefined && path[path.length - 1] instanceof Executable) {
        return path[path.length - 1] as Executable;
      }
    }

    return System.getSystemCommands(name);
  }

  static getSystemCommands(name: string): Executable | undefined {
    const ex = System.BASH.getEntryDeep(name);
    if (ex === undefined || !(ex instanceof Executable)) {
      return undefined;
    }
    return ex;
  }

  static isSystemCommandNameFree(name: string): boolean {
    return System.getSystemCommands(name) === undefined;
  }
}
