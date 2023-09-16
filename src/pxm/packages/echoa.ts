import { Executable } from 'src/utils/Executable';
import { PXMPackage } from '../PXMPackage';
import { SynonymManager } from '../../utils/SynonymManager';
import { HistoryManager } from 'src/utils/HistoryManager';

export function get_echoa_package() {
  return new PXMPackage('echoa', '1.0', 'Advanced echo commands', [
    new Executable(
      'echoc',
      {
        execute: (args) => {
          if (args.length < 2) {
            return [`echoc: missing operand`];
          }
          let color = args[0];
          let text = args.slice(1).join(' ');
          if (
            (text.startsWith('"') && text.endsWith('"')) ||
            (text.startsWith("'") && text.endsWith("'"))
          ) {
            text = text.substring(1, text.length - 1);
          } else {
            text = text.trim();
          }
          return [SynonymManager.colorString(text, color)];
        },
        executeAsync: async (args) => {
          throw new Error('Method not implemented.');
        },
      },
      [
        ' ',
        '******************',
        '*** echoc HELP ***',
        '******************',
        ' ',
        'Echo with color',
        ' ',
        'echoc [color] [text]',
        'Echo text with color',
        ' ',
      ]
    ),
    new Executable(
      'echol',
      {
        execute: (args) => {
          if (args.length < 2) {
            return [`echol: missing operand`];
          }
          let color = args[0];
          let text = args.slice(1).join(' ');
          if (
            (text.startsWith('"') && text.endsWith('"')) ||
            (text.startsWith("'") && text.endsWith("'"))
          ) {
            text = text.substring(1, text.length - 1);
          } else {
            text = text.trim();
          }
          return [SynonymManager.linkString(text, color)];
        },
        executeAsync: async (args) => {
          throw new Error('Method not implemented.');
        },
      },
      [
        ' ',
        '******************',
        '*** echol HELP ***',
        '******************',
        ' ',
        'Echo with link',
        ' ',
        'echol [link] [text]',
        'Echo text with link',
        ' ',
      ]
    ),
    new Executable(
      'echob',
      {
        execute: (args) => {
          if (args.length < 1) {
            return [`echob: missing operand`];
          }
          let text = args.join(' ');
          if (
            (text.startsWith('"') && text.endsWith('"')) ||
            (text.startsWith("'") && text.endsWith("'"))
          ) {
            text = text.substring(1, text.length - 1);
          } else {
            text = text.trim();
          }
          HistoryManager.appendAtLastLine(text);
          return [];
        },
        executeAsync: async (args) => {
          throw new Error('Method not implemented.');
        },
      },
      [
        ' ',
        '******************',
        '*** echob HELP ***',
        '******************',
        ' ',
        'Echo in the last line',
        ' ',
        'echob [text]',
        'Echo text in the last line',
        ' ',
      ]
    ),
  ]);
}
