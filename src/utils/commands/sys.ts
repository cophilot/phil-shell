import { AppComponent } from 'src/app/app.component';
import { Executable } from '../Executable';
import { AppearanceService } from 'src/app/services/appearance.service';
import { SynonymManager } from '../SynonymManager';
import { System } from '../System';

export function get_sys() {
  return new Executable(
    'sys',
    {
      execute: (args) => {
        if (args.length === 0) {
          return [`sys: missing operand`];
        }
        let result: string[] = [];
        switch (args[0]) {
          case 'version':
            result = [System.VERSION];
            break;
          case 'license':
            result = [
              'MIT License',
              ' ',
              'Copyright (c) 2023 Philipp B.',
              'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),',
              'to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, ',
              'and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:',
              ' ',
              'The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.',
              ' ',
              'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, ',
              'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, ',
              'DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR ',
              'THE USE OR OTHER DEALINGS IN THE SOFTWARE.',
            ];
            break;
          case 'author':
            result = ['Philipp B.'];
            break;
          case 'website':
            // open website
            window.open('https://philipp-bonin.com', '_blank');
            result = [];
            break;
          case 'github':
            // open github
            window.location.href = 'https://github.com/phil1436/phil-shell';
            result = ['Redirecting to GitHub...'];
            break;
          case 'theme':
            if (args.length < 2) {
              return [`sys: missing operand`];
            }

            if (args[1] == 'current') {
              return [AppearanceService.currentTheme];
            }

            if (args[1] == 'list') {
              return AppearanceService.availableThemes;
            }

            if (args[1] == 'random') {
              let randomTheme =
                AppearanceService.availableThemes[
                  Math.floor(
                    Math.random() * AppearanceService.availableThemes.length
                  )
                ];
              AppearanceService.setTheme(randomTheme);
              return [randomTheme + ' theme activated'];
            }

            if (AppearanceService.setTheme(args[1].toLowerCase())) {
              result = [args[1] + ' theme activated'];
            } else {
              return [`Theme not valid: ${args[1]}`];
            }
            break;
          case 'header':
            if (args.length < 2) {
              return [`sys: missing operand`];
            }
            let onoff = SynonymManager.getBoolean(args[1]);
            if (onoff === null) {
              return [`sys: ${args[1]}: invalid argument`];
            }
            AppearanceService.showHeader = onoff;
            result = [`Header ${onoff ? 'enabled' : 'disabled'}`];
            break;

          case 'offset':
            if (args.length < 2) {
              return [`sys: missing operand`];
            }
            if (args[1] === 'reset') {
              AppearanceService.offsetLeft = 100;
              AppearanceService.offsetTop = 100;
              result = [`Offset reset`];
              return result;
            }
            if (args[1] === 'get') {
              result = [
                `Offset left: ${AppearanceService.offsetLeft}`,
                `Offset top: ${AppearanceService.offsetTop}`,
              ];
              return result;
            }

            if (args.length < 3) {
              return [`sys: missing operand`];
            }
            const offset = parseInt(args[2]);
            if (isNaN(offset) || offset < 0) {
              return [`sys: ${args[2]}: invalid argument`];
            }
            if (args[1] === 'left') {
              AppearanceService.offsetLeft = offset;
              result = [`Offset left set to ${offset}`];
            } else if (args[1] === 'top') {
              AppearanceService.offsetTop = offset;
              result = [`Offset top set to ${offset}`];
            } else {
              return [`sys: ${args[1]}: invalid argument`];
            }
            break;

          default:
            return [`sys: ${args[0]}: command not found`];
        }

        return result;
      },
      executeAsync: async (args) => {
        throw new Error('Method not implemented.');
      },
    },
    [
      ' ',
      '*******************',
      '*** system HELP ***',
      '*******************',
      ' ',
      'Print and configure system information',
      ' ',
      'sys version',
      'Print the version of the shell',
      ' ',
      'sys license',
      'Print the license of the shell',
      ' ',
      'sys author',
      'Print the author of the shell',
      ' ',
      'sys website',
      'Open the website of the author',
      ' ',
      'sys github',
      'Open the GitHub repository of the shell',
      ' ',
      'sys theme [theme]',
      'Change the theme of the shell',
      ' ',
      'sys theme current',
      'Print the current theme of the shell',
      ' ',
      'sys theme list',
      'Print all available themes',
      ' ',
      'sys theme random',
      'Set a random theme',
      ' ',
      'sys header [on/off]',
      'Enable or disable the header',
      ' ',
      'sys offset [left/top] [value]',
      'Set the offset of the header',
      ' ',
      'sys offset reset',
      'Reset the offset of the header',
      ' ',
      'sys offset get',
      'Print the current offset',
      ' ',
    ]
  );
}
