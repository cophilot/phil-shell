import { Executable } from '../Executable';
import { SynonymManager } from '../SynonymManager';
import { System } from '../System';

export function get_help() {
  return new Executable(
    'help',
    {
      execute: (args) => {
        if (args.length > 1) {
          return [`help: too many arguments`];
        }
        if (args.length === 0) {
          return [
            ' ',
            ' **********************************',
            ' *** ' +
              SynonymManager.colorString('Welcome to the help center', 'red') +
              ' ***',
            ' **********************************',
            ' ',
            ' Welcome to the ' +
              SynonymManager.colorString('phil-shell', 'red') +
              '!',
            ' ',
            ' Explore my skills, projects, and more in a unique and interactive way.',
            ' With the familiarity of a Linux terminal, you can navigate through my portfolio,',
            ' execute commands to learn about my projects, and witness my technical expertise firsthand.',
            ' Dive into a dynamic showcase of my skills and accomplishments, where every click brings you',
            ' closer to understanding the world of web development, coding, and innovation.',
            ' Step into the future of exploring personal websites, where the power of the command line',
            ' meets the creativity of the digital world.',
            ' ',
            ' **********************************',
            ' ',
            ' Navigation:',
            ' ',
            ' To navigate through the directories, you can use the following commands:',
            ' ',
            ' cd [directory]   - Change the current directory to [directory]',
            ' ls               - List the content of the current directory',
            ' pwd              - Print the current directory',
            ' ',
            ' **********************************',
            ' ',
            ' Commands:',
            ' ',
            ' You can find all commands in the /bin/bash directory.',
            ' To execute a command, type the name of the command and press enter.',
            ' To get more information about a command, type help [command].',
            ' You can execute every command quietly by adding a "-q" flag at the end of the command.',
            ' ',
            ' **********************************',
            ' ',
            ' .ph files:',
            ' ',
            ' .ph files are executable files. You can execute them with "./[file]".',
            ' You can create new .ph files with the "vi" command.',
            ' ',
            ' **********************************',
            ' ',
            ' You can find out more about me in the /home/phil directory.',
            ' ',
            ' **********************************',
            ' ',
            ' You can write your own files in the /usr/local directory.',
            ' Use the "lost" command to store the files in your browser storage, so you can access them later.',
            ' The file /usr/local/scripts/onboot.ph will be executed when you start the shell again.',
            ' Configure this file to your needs.',
            ' ',
            ' **********************************',
            ' ',
            ' Phil eXtension Manager:',
            ' ',
            ' You can install new commands with the "pxm" command.',
            ' Use "pxm install [package]" to install a new package.',
            ' You can find the new commands in the /bin/bash/pxm_modules/[package] directory.',
            ' ',
            ' **********************************',
            ' ',
            ' If you still dont know how to use this shell, please visit my ' +
              SynonymManager.linkString(
                'website',
                'https://philipp-bonin.com/'
              ) +
              '.',
            ' ',
            ' Have fun!',
            ' ',
          ];
        }
        let exec = System.getExecutable(args[0]);
        if (exec == undefined) {
          return [`help: command not found: ${args[0]}`];
        }
        if (exec.HELP.length === 0) {
          return [`help: no help message for ${args[0]}`];
        }
        return exec.HELP;
      },
      executeAsync: async (args) => {
        throw new Error('Method not implemented.');
      },
    },
    [
      ' ',
      '*****************',
      '*** help HELP ***',
      '*****************',
      ' ',
      'Print the help messages',
      ' ',
      'help',
      'Print the help message',
      ' ',
      'help [command]',
      "Print the help message for the command 'command'",
      ' ',
    ]
  );
}
