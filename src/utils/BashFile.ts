import { InputLineComponent } from 'src/app/input-line/input-line.component';
import { Compiler } from './Compiler';
import { Executable } from './Executable';
import { PermissionFlag } from './PermissionFlag';

export class BashFile extends Executable {
  content: string[] = [];

  type: string = 'bashfile';

  constructor(name: string, content?: string[], replace = true) {
    if (!name.trim().endsWith('.ph') && replace) {
      name += '.ph';
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
    this.permissionFlags.push(PermissionFlag.READ);
    this.permissionFlags.push(PermissionFlag.WRITE);
    this.permissionFlags.push(PermissionFlag.EXECUTE);
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

  override setExecutable(executable: boolean): void {
    if (executable && !this.permissionFlags.includes(PermissionFlag.EXECUTE)) {
      this.permissionFlags.push(PermissionFlag.EXECUTE);
    }
    if (!executable && this.permissionFlags.includes(PermissionFlag.EXECUTE)) {
      this.permissionFlags = this.permissionFlags.filter(
        (flag) => flag !== PermissionFlag.EXECUTE
      );
    }
  }

  override setReadable(readable: boolean): void {
    if (readable && !this.permissionFlags.includes(PermissionFlag.READ)) {
      this.permissionFlags.push(PermissionFlag.READ);
    }
    if (!readable && this.permissionFlags.includes(PermissionFlag.READ)) {
      this.permissionFlags = this.permissionFlags.filter(
        (flag) => flag !== PermissionFlag.READ
      );
    }
  }

  override setWritable(writable: boolean): void {
    if (writable && !this.permissionFlags.includes(PermissionFlag.WRITE)) {
      this.permissionFlags.push(PermissionFlag.WRITE);
    }
    if (!writable && this.permissionFlags.includes(PermissionFlag.WRITE)) {
      this.permissionFlags = this.permissionFlags.filter(
        (flag) => flag !== PermissionFlag.WRITE
      );
    }
  }

  static fromJSON(json: any): BashFile {
    const file = new BashFile(json.name);
    file.permissionFlags = json.permissionFlags;
    file.content = json.content;
    return file;
  }
}
