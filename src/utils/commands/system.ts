import { AppComponent } from 'src/app/app.component';
import { Executable } from '../Executable';
import { System } from '../System';

export function get_system() {
  return new Executable('system', {
    execute: (args) => {
      if (args.length === 0) {
        return [`system: missing operand`];
      }
      let quietly = false;
      for (let i = 0; i < args.length; i++) {
        if (args[i] === '-q' || args[i] === '--quiet') {
          quietly = true;
          args.splice(i, 1);
          i--;
        }
      }
      let result: string[] = [];
      switch (args[0]) {
        case 'version':
          result = [System.VERSION];
          break;
        case 'license':
          result = ['MIT License'];
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
          window.open('');
          result = [];
          break;
        case 'theme':
          if (args.length < 2) {
            return [`system: missing operand`];
          }
          switch (args[1]) {
            case 'light':
              AppComponent.lightMode();
              result = ['Light mode activated'];
              break;
            case 'dark':
              AppComponent.darkMode();
              result = ['Dark mode activated'];
              break;
            case 'funky':
              AppComponent.funkyMode();
              result = ['Funky mode activated'];
              break;
            case 'matrix':
              AppComponent.matrixMode();
              result = ['Matrix mode activated'];
              break;
            default:
              return [`system: ${args[1]}: invalid argument`];
          }
          break;
        case 'header':
          if (args.length < 2) {
            return [`system: missing operand`];
          }
          if (
            args[1] === 'on' ||
            args[1] === 'true' ||
            args[1] === 'enable' ||
            args[1] === '1'
          ) {
            AppComponent.showHeader = true;
            result = ['Header on'];
          } else if (
            args[1] === 'off' ||
            args[1] === 'false' ||
            args[1] === 'disable' ||
            args[1] === '0'
          ) {
            AppComponent.showHeader = false;
            result = ['Header off'];
          } else {
            return [`system: ${args[1]}: invalid argument`];
          }
          break;

        case 'offset':
          if (args.length < 2) {
            return [`system: missing operand`];
          }
          if (args[1] === 'reset') {
            AppComponent.offsetLeft = 100;
            AppComponent.offsetTop = 100;
            result = [`Offset reset`];
          }
          if (args[1] === 'get') {
            result = [
              `Offset left: ${AppComponent.offsetLeft}`,
              `Offset top: ${AppComponent.offsetTop}`,
            ];
          }

          if (args.length < 3) {
            return [`system: missing operand`];
          }
          const offset = parseInt(args[2]);
          if (isNaN(offset) || offset < 0) {
            return [`system: ${args[2]}: invalid argument`];
          }
          if (args[1] === 'left') {
            AppComponent.offsetLeft = offset;
            result = [`Offset left set to ${offset}`];
          } else if (args[1] === 'top') {
            AppComponent.offsetTop = offset;
            result = [`Offset top set to ${offset}`];
          } else {
            return [`system: ${args[1]}: invalid argument`];
          }
          break;

        default:
          return [`system: ${args[0]}: command not found`];
      }
      if (!quietly) {
        return result;
      }
      return [];
    },
    executeAsync: async (args) => {
      throw new Error('Method not implemented.');
    },
  });
}
