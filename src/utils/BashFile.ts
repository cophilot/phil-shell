import { InputLineComponent } from 'src/app/input-line/input-line.component';
import { Compiler } from './Compiler';
import { Executable } from './Executable';
import { File } from './File';

export class BashFile extends Executable {
  content: string[] = [];

  constructor(name: string, content?: string[], replace = true) {
    if (!name.trim().endsWith('.sh') && replace) {
      name += '.sh';
    }
    super(
      name,
      {
        execute: (args) => [],
        executeAsync: (args) => Promise.resolve([]),
      },
      [],
      true
    );
    if (content) {
      this.content = content;
    }
  }

  override async executeAsync(args: string[]): Promise<string[]> {
    InputLineComponent.LOCK = true;
    for (let line of this.content) {
      line = line.trim();
      if (line.startsWith('#')) {
        continue;
      }
      await Compiler.compileLine(line);
    }
    InputLineComponent.LOCK = false;
    return Promise.resolve([]);
  }
}
