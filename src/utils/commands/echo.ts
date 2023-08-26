import { Executable } from '../Executable';

export function get_echo() {
  return new Executable('echo', {
    execute: (args) => {
      if (args.length === 0) {
        return [`echo: missing operand`];
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
      return [text];
    },
    executeAsync: async (args) => {
      throw new Error('Method not implemented.');
    },
  });
}
