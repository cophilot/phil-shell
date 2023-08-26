import { AppComponent } from 'src/app/app.component';
import { Executable } from '../Executable';
import { AppearanceService } from 'src/app/services/appearance.service';
import { SynonymManager } from '../SynonymManager';
import { System } from '../System';

export function get_sys() {
  return new Executable('sys', {
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
          }
          if (args[1] === 'get') {
            result = [
              `Offset left: ${AppearanceService.offsetLeft}`,
              `Offset top: ${AppearanceService.offsetTop}`,
            ];
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
  });
}
