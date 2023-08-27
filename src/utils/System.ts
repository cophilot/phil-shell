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

    bash.setWritable(false);

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
        'wait 100 -q',
        'echo "                  welcome to                "',
        'wait 100 -q',
        'echo " "',
        'wait 100 -q',
        'echo "        _     _ _            _          _ _ "',
        'wait 100 -q',
        'echo "       | |   (_) |          | |        | | |"',
        'wait 100 -q',
        'echo "  _ __ | |__  _| |______ ___| |__   ___| | |"',
        'wait 100 -q',
        'echo " |  _ \\|  _ \\| | |______/ __|  _ \\ / _ \\ | |"',
        'wait 100 -q',
        'echo " | |_) | | | | | |      \\__ \\ | | |  __/ | |"',
        'wait 100 -q',
        'echo " | .__/|_| |_|_|_|      |___/_| |_|\\___|_|_|"',
        'wait 100 -q',
        'echo " | |"',
        'wait 100 -q',
        'echo " |_|"',
        'wait 100 -q',
        'echo " "',
        'echo "Version"',
        'sys version',
        'echo " "',
        'echo "Need help? Type \'help\'"',
      ])
    );
    let delay = 50;
    scripts.add(
      new BashFile('Welcome2', [
        'clear',
        'sys theme random -q',
        'echo " "',
        'echo " "',
        'echo " "',
        'echo " "',
        'echo " "',
        'echo " "',
        'echo " "',
        'echo " "',
        'echo " "',
        'echo " "',
        'echo " "',
        'wait ' + delay + ' -q',
        'clear',
        'echo "  "',
        'echo "  "',
        'echo "  "',
        'echo "  "',
        'echo "  "',
        'echo " |"',
        'echo " |"',
        'echo " |"',
        'echo " |"',
        'echo " |"',
        'echo "  "',
        'wait ' + delay + ' -q',
        'clear',
        'echo "    "',
        'echo "    "',
        'echo "    "',
        'echo "    "',
        'echo "  _ "',
        'echo " |  "',
        'echo " | |"',
        'echo " | ."',
        'echo " | |"',
        'echo " |_|"',
        'echo "    "',
        'wait ' + delay + ' -q',
        'clear',
        'echo "      "',
        'echo "      "',
        'echo "      "',
        'echo "      "',
        'echo "  _ __"',
        'echo " |  _ "',
        'echo " | |_)"',
        'echo " | .__"',
        'echo " | |  "',
        'echo " |_|  "',
        'echo "      "',
        'wait ' + delay + ' -q',
        'clear',
        'echo "        "',
        'echo "        "',
        'echo "        "',
        'echo "       |"',
        'echo "  _ __ |"',
        'echo " |  _ \\"',
        'echo " | |_) |"',
        'echo " | .__/|"',
        'echo " | |    "',
        'echo " |_|    "',
        'echo "        "',
        'wait ' + delay + ' -q',
        'clear',
        'echo "          "',
        'echo "          "',
        'echo "        _ "',
        'echo "       | |"',
        'echo "  _ __ | |"',
        'echo " |  _ \\| "',
        'echo " | |_) | |"',
        'echo " | .__/|_|"',
        'echo " | |      "',
        'echo " |_|      "',
        'echo "          "',
        'wait ' + delay + ' -q',
        'clear',
        'echo "            "',
        'echo "            "',
        'echo "        _   "',
        'echo "       | |  "',
        'echo "  _ __ | |__"',
        'echo " |  _ \\|  _"',
        'echo " | |_) | | |"',
        'echo " | .__/|_| |"',
        'echo " | |        "',
        'echo " |_|        "',
        'echo "            "',
        'wait ' + delay + ' -q',
        'clear',
        'echo "              "',
        'echo "              "',
        'echo "        _     "',
        'echo "       | |   ("',
        'echo "  _ __ | |__  "',
        'echo " |  _ \\|  _  "',
        'echo " | |_) | | | |"',
        'echo " | .__/|_| |_|"',
        'echo " | |          "',
        'echo " |_|          "',
        'echo "              "',
        'wait ' + delay + ' -q',
        'clear',
        'echo "                "',
        'echo "                "',
        'echo "        _     _ "',
        'echo "       | |   (_)"',
        'echo "  _ __ | |__  _|"',
        'echo " |  _ \\|  _ \\|"',
        'echo " | |_) | | | | |"',
        'echo " | .__/|_| |_|_|"',
        'echo " | |            "',
        'echo " |_|            "',
        'echo "                "',
        'wait ' + delay + ' -q',
        'clear',
        'echo "                  "',
        'echo "                  "',
        'echo "        _     _ _ "',
        'echo "       | |   (_) |"',
        'echo "  _ __ | |__  _| |"',
        'echo " |  _ \\|  _ \\| |"',
        'echo " | |_) | | | | | |"',
        'echo " | .__/|_| |_|_|_|"',
        'echo " | |              "',
        'echo " |_|              "',
        'echo "                  "',
        'wait ' + delay + ' -q',
        'clear',
        'echo "                  we"',
        'echo "                    "',
        'echo "        _     _ _   "',
        'echo "       | |   (_) |  "',
        'echo "  _ __ | |__  _| |__"',
        'echo " |  _ \\|  _ \\| | |"',
        'echo " | |_) | | | | | |  "',
        'echo " | .__/|_| |_|_|_|  "',
        'echo " | |                "',
        'echo " |_|                "',
        'echo "                    "',
        'wait ' + delay + ' -q',
        'clear',
        'echo "                  welc"',
        'echo "                      "',
        'echo "        _     _ _     "',
        'echo "       | |   (_) |    "',
        'echo "  _ __ | |__  _| |____"',
        'echo " |  _ \\|  _ \\| | |__"',
        'echo " | |_) | | | | | |    "',
        'echo " | .__/|_| |_|_|_|    "',
        'echo " | |                  "',
        'echo " |_|                  "',
        'echo "                      "',
        'wait ' + delay + ' -q',
        'clear',
        'echo "                  welcom"',
        'echo "                        "',
        'echo "        _     _ _       "',
        'echo "       | |   (_) |      "',
        'echo "  _ __ | |__  _| |______"',
        'echo " |  _ \\|  _ \\| | |____"',
        'echo " | |_) | | | | | |      "',
        'echo " | .__/|_| |_|_|_|      "',
        'echo " | |                    "',
        'echo " |_|                    "',
        'echo "                        "',
        'wait ' + delay + ' -q',
        'clear',
        'echo "                  welcome "',
        'echo "                          "',
        'echo "        _     _ _         "',
        'echo "       | |   (_) |        "',
        'echo "  _ __ | |__  _| |______ _"',
        'echo " |  _ \\|  _ \\| | |______"',
        'echo " | |_) | | | | | |      \\"',
        'echo " | .__/|_| |_|_|_|      |_"',
        'echo " | |                      "',
        'echo " |_|                      "',
        'echo "                          "',
        'wait ' + delay + ' -q',
        'clear',
        'echo "                  welcome to"',
        'echo "                            "',
        'echo "        _     _ _           "',
        'echo "       | |   (_) |          "',
        'echo "  _ __ | |__  _| |______ ___"',
        'echo " |  _ \\|  _ \\| | |______/ "',
        'echo " | |_) | | | | | |      \\__"',
        'echo " | .__/|_| |_|_|_|      |___"',
        'echo " | |                        "',
        'echo " |_|                        "',
        'echo "                            "',
        'wait ' + delay + ' -q',

        'clear',
        'echo "                  welcome to  "',
        'echo "                              "',
        'echo "        _     _ _            _"',
        'echo "       | |   (_) |          | "',
        'echo "  _ __ | |__  _| |______ ___| "',
        'echo " |  _ \\|  _ \\| | |______/ __"',
        'echo " | |_) | | | | | |      \\__  "',
        'echo " | .__/|_| |_|_|_|      |___/_"',
        'echo " | |                          "',
        'echo " |_|                          "',
        'echo "                              "',
        'wait ' + delay + ' -q',

        'clear',
        'echo "                  welcome to    "',
        'echo "                                "',
        'echo "        _     _ _            _  "',
        'echo "       | |   (_) |          | | "',
        'echo "  _ __ | |__  _| |______ ___| |_"',
        'echo " |  _ \\|  _ \\| | |______/ __| "',
        'echo " | |_) | | | | | |      \\__ \\ "',
        'echo " | .__/|_| |_|_|_|      |___/_| "',
        'echo " | |                            "',
        'echo " |_|                            "',
        'echo "                                "',
        'wait ' + delay + ' -q',

        'clear',
        'echo "                  welcome to      "',
        'echo "                                  "',
        'echo "        _     _ _            _    "',
        'echo "       | |   (_) |          | |   "',
        'echo "  _ __ | |__  _| |______ ___| |__ "',
        'echo " |  _ \\|  _ \\| | |______/ __|  _"',
        'echo " | |_) | | | | | |      \\__ \\ | "',
        'echo " | .__/|_| |_|_|_|      |___/_| |_"',
        'echo " | |                              "',
        'echo " |_|                              "',
        'echo "                                  "',
        'wait ' + delay + ' -q',

        'clear',
        'echo "                  welcome to        "',
        'echo "                                    "',
        'echo "        _     _ _            _      "',
        'echo "       | |   (_) |          | |     "',
        'echo "  _ __ | |__  _| |______ ___| |__   "',
        'echo " |  _ \\|  _ \\| | |______/ __|  _  "',
        'echo " | |_) | | | | | |      \\__ \\ | | "',
        'echo " | .__/|_| |_|_|_|      |___/_| |_| "',
        'echo " | |                                "',
        'echo " |_|                                "',
        'echo "                                    "',
        'wait ' + delay + ' -q',

        'clear',
        'echo "                  welcome to          "',
        'echo "                                      "',
        'echo "        _     _ _            _        "',
        'echo "       | |   (_) |          | |       "',
        'echo "  _ __ | |__  _| |______ ___| |__   __"',
        'echo " |  _ \\|  _ \\| | |______/ __|  _ \\ "',
        'echo " | |_) | | | | | |      \\__ \\ | | | "',
        'echo " | .__/|_| |_|_|_|      |___/_| |_|\\_"',
        'echo " | |                                  "',
        'echo " |_|                                  "',
        'echo "                                      "',
        'wait ' + delay + ' -q',

        'clear',
        'echo "                  welcome to            "',
        'echo "                                        "',
        'echo "        _     _ _            _          "',
        'echo "       | |   (_) |          | |        |"',
        'echo "  _ __ | |__  _| |______ ___| |__   ___|"',
        'echo " |  _ \\|  _ \\| | |______/ __|  _ \\ / "',
        'echo " | |_) | | | | | |      \\__ \\ | | |  _"',
        'echo " | .__/|_| |_|_|_|      |___/_| |_|\\___"',
        'echo " | |                                    "',
        'echo " |_|                                    "',
        'echo "                                        "',
        'wait ' + delay + ' -q',

        'clear',
        'echo "                  welcome to              "',
        'echo "                                          "',
        'echo "        _     _ _            _          _ "',
        'echo "       | |   (_) |          | |        | |"',
        'echo "  _ __ | |__  _| |______ ___| |__   ___| |"',
        'echo " |  _ \\|  _ \\| | |______/ __|  _ \\ / _ "',
        'echo " | |_) | | | | | |      \\__ \\ | | |  __/"',
        'echo " | .__/|_| |_|_|_|      |___/_| |_|\\___|_"',
        'echo " | |                                      "',
        'echo " |_|                                      "',
        'echo "                                          "',
        'wait ' + delay + ' -q',

        'clear',
        'echo "                  welcome to                "',
        'echo "                                            "',
        'echo "        _     _ _            _          _ _ "',
        'echo "       | |   (_) |          | |        | | |"',
        'echo "  _ __ | |__  _| |______ ___| |__   ___| | |"',
        'echo " |  _ \\|  _ \\| | |______/ __|  _ \\ / _ \\"',
        'echo " | |_) | | | | | |      \\__ \\ | | |  __/ |"',
        'echo " | .__/|_| |_|_|_|      |___/_| |_|\\___|_|_"',
        'echo " | |                                        "',
        'echo " |_|                                        "',
        'echo "                                            "',
        'wait ' + delay + ' -q',

        'clear',
        'echo "                  welcome to                  "',
        'echo "                                              "',
        'echo "        _     _ _            _          _ _   "',
        'echo "       | |   (_) |          | |        | | |  "',
        'echo "  _ __ | |__  _| |______ ___| |__   ___| | |  "',
        'echo " |  _ \\|  _ \\| | |______/ __|  _ \\ / _ \\ |"',
        'echo " | |_) | | | | | |      \\__ \\ | | |  __/ | |"',
        'echo " | .__/|_| |_|_|_|      |___/_| |_|\\___|_|_| "',
        'echo " | |                                          "',
        'echo " |_|                                          "',
        'echo "                                              "',
        'wait ' + delay + ' -q',

        'clear',
        'echo "                  welcome to                    "',
        'echo "                                                "',
        'echo "        _     _ _            _          _ _     "',
        'echo "       | |   (_) |          | |        | | |    "',
        'echo "  _ __ | |__  _| |______ ___| |__   ___| | |    "',
        'echo " |  _ \\|  _ \\| | |______/ __|  _ \\ / _ \\ | |"',
        'echo " | |_) | | | | | |      \\__ \\ | | |  __/ | |  "',
        'echo " | .__/|_| |_|_|_|      |___/_| |_|\\___|_|_|   "',
        'echo " | |                                            "',
        'echo " |_|                                            "',
        'echo "                                                "',
        'wait ' + delay + ' -q',

        'echo "Version"',
        'sys version',
        'echo " "',
        'echo "Need help? Type \'help\'"',
      ])
    );
    scripts.add(
      new BashFile('onboot', [
        '# This file will be executed on boot',
        'cd ~',
        './scripts/Welcome2.ph',
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
    Compiler.compileLine('./home/phil/scripts/onboot.ph');
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
