import { Entry } from './Entry';
import { SynonymManager } from './SynonymManager';

export class Executable extends Entry {
  public readonly HELP: string[] = [];
  public readonly IS_ASYNC: boolean = false;

  constructor(
    name: string,
    public readonly exec: Execute,
    help?: string[],
    async = false
  ) {
    super(name);
    if (help) {
      this.HELP = help;
    }

    this.IS_ASYNC = async;
  }

  execute(args: string[]): string[] {
    let quiet = false;
    if (SynonymManager.isQuietly(args)) {
      quiet = true;
    }
    let result = this.exec.execute(args);
    if (!quiet) {
      return result;
    }
    return [];
  }

  async executeAsync(args: string[]): Promise<string[]> {
    return this.exec.executeAsync(args);
  }
}

interface Execute {
  execute(args: string[]): string[];
  executeAsync(args: string[]): Promise<string[]>;
}
