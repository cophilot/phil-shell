import { Entry } from './Entry';

export class Executable extends Entry {
  public readonly HELP: string[] = [];

  constructor(name: string, public readonly exec: Execute, help?: string[]) {
    super(name);
    if (help) {
      this.HELP = help;
    }
  }

  execute(args: string[]): string[] {
    return this.exec.execute(args);
  }
}

interface Execute {
  execute(args: string[]): string[];
}
