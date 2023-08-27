import { Executable } from 'src/utils/Executable';
import { PXMPackage } from '../PXMPackage';

export function get_math_package() {
  return new PXMPackage('math', '1.0', 'Math package', [
    new Executable('add', {
      execute: (args) => {
        if (args.length != 2) return ['add: missing operand'];
        const a = parseInt(args[0]);
        const b = parseInt(args[1]);
        if (isNaN(a) || isNaN(b)) return ['add: invalid operand'];
        return [a + b + ''];
      },
      executeAsync: async (args) => {
        throw new Error('Method not implemented.');
      },
    }),

    new Executable('minus', {
      execute: (args) => {
        if (args.length != 2) return ['minus: missing operand'];
        const a = parseInt(args[0]);
        const b = parseInt(args[1]);
        if (isNaN(a) || isNaN(b)) return ['minus: invalid operand'];
        return [a - b + ''];
      },
      executeAsync: async (args) => {
        throw new Error('Method not implemented.');
      },
    }),

    new Executable('multiply', {
      execute: (args) => {
        if (args.length != 2) return ['multiply: missing operand'];
        const a = parseInt(args[0]);
        const b = parseInt(args[1]);
        if (isNaN(a) || isNaN(b)) return ['multiply: invalid operand'];
        return [a * b + ''];
      },
      executeAsync: async (args) => {
        throw new Error('Method not implemented.');
      },
    }),

    new Executable('divide', {
      execute: (args) => {
        if (args.length != 2) return ['divide: missing operand'];
        const a = parseInt(args[0]);
        const b = parseInt(args[1]);
        if (isNaN(a) || isNaN(b)) return ['divide: invalid operand'];
        return [a / b + ''];
      },
      executeAsync: async (args) => {
        throw new Error('Method not implemented.');
      },
    }),
    new Executable('sinus', {
      execute: (args) => {
        if (args.length != 1) return ['sinus: missing operand'];
        const a = parseInt(args[0]);
        if (isNaN(a)) return ['sinus: invalid operand'];
        return [Math.sin(a) + ''];
      },
      executeAsync: async (args) => {
        throw new Error('Method not implemented.');
      },
    }),
    new Executable('cosinus', {
      execute: (args) => {
        if (args.length != 1) return ['cosinus: missing operand'];
        const a = parseInt(args[0]);
        if (isNaN(a)) return ['cosinus: invalid operand'];
        return [Math.sin(a) + ''];
      },
      executeAsync: async (args) => {
        throw new Error('Method not implemented.');
      },
    }),
  ]);
}
