import { Executable } from 'src/utils/Executable';
import { PXMPackage } from '../PXMPackage';

export function get_math_package() {
  return new PXMPackage('math', '1.0', 'Math package', [
    new Executable(
      'add',
      {
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
      },
      [
        ' ',
        '****************',
        '*** add HELP ***',
        '****************',
        ' ',
        'Add two numbers',
        ' ',
        'add [a] [b]',
        'Add a and b',
        ' ',
      ]
    ),

    new Executable(
      'subtract',
      {
        execute: (args) => {
          if (args.length != 2) return ['subtract: missing operand'];
          const a = parseInt(args[0]);
          const b = parseInt(args[1]);
          if (isNaN(a) || isNaN(b)) return ['subtract: invalid operand'];
          return [a - b + ''];
        },
        executeAsync: async (args) => {
          throw new Error('Method not implemented.');
        },
      },
      [
        ' ',
        '*********************',
        '*** subtract HELP ***',
        '*********************',
        ' ',
        'Subtract two numbers',
        ' ',
        'subtract [a] [b]',
        'Subtract b from a',
        ' ',
      ]
    ),

    new Executable(
      'multiply',
      {
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
      },
      [
        ' ',
        '****************',
        '*** multiply HELP ***',
        '****************',
        ' ',
        'Multiply two numbers',
        ' ',
        'multiply [a] [b]',
        'Multiply a and b',
        ' ',
      ]
    ),

    new Executable(
      'divide',
      {
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
      },
      [
        ' ',
        '*******************',
        '*** divide HELP ***',
        '*******************',
        ' ',
        'Divide two numbers',
        ' ',
        'divide [a] [b]',
        'Divide a by b',
        ' ',
      ]
    ),
    new Executable(
      'sinus',
      {
        execute: (args) => {
          if (args.length != 1) return ['sinus: missing operand'];
          const a = parseInt(args[0]);
          if (isNaN(a)) return ['sinus: invalid operand'];
          return [Math.sin(a) + ''];
        },
        executeAsync: async (args) => {
          throw new Error('Method not implemented.');
        },
      },
      [
        ' ',
        '*******************',
        '*** sinus HELP ***',
        '*******************',
        ' ',
        'Get sinus of a number',
        ' ',
        'sinus [a]',
        'Get sinus of a',
        ' ',
      ]
    ),
    new Executable(
      'cosinus',
      {
        execute: (args) => {
          if (args.length != 1) return ['cosinus: missing operand'];
          const a = parseInt(args[0]);
          if (isNaN(a)) return ['cosinus: invalid operand'];
          return [Math.sin(a) + ''];
        },
        executeAsync: async (args) => {
          throw new Error('Method not implemented.');
        },
      },
      [
        ' ',
        '********************',
        '*** cosinus HELP ***',
        '********************',
        ' ',
        'Get cosinus of a number',
        ' ',
        'cosinus [a]',
        'Get cosinus of a',
        ' ',
      ]
    ),
  ]);
}
