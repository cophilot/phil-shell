import { PermissionFlag } from './PermissionFlag';

export class Entry {
  readonly name: string;
  protected permissionFlags: PermissionFlag[] = [];

  constructor(name: string) {
    this.name = name;
  }

  getPermissionFlagAsString(): string {
    let result = this.isReadable() ? 'r' : '-';
    result += this.isWritable() ? 'w' : '-';
    result += this.isExecutable() ? 'x' : '-';

    return result;
  }

  isReadable(): boolean {
    return this.permissionFlags.includes(PermissionFlag.READ);
  }

  isWritable(): boolean {
    return this.permissionFlags.includes(PermissionFlag.WRITE);
  }

  isExecutable(): boolean {
    return this.permissionFlags.includes(PermissionFlag.EXECUTE);
  }

  setReadable(readable: boolean): void {
    throw new Error('Method not implemented.');
  }

  setWritable(writable: boolean): void {
    throw new Error('Method not implemented.');
  }

  setExecutable(executable: boolean): void {
    throw new Error('Method not implemented.');
  }

  setPermissionFlags(flags: PermissionFlag[]): void {
    if (flags.includes(PermissionFlag.READ)) {
      this.setReadable(true);
    } else {
      this.setReadable(false);
    }

    if (flags.includes(PermissionFlag.WRITE)) {
      this.setWritable(true);
    } else {
      this.setWritable(false);
    }

    if (flags.includes(PermissionFlag.EXECUTE)) {
      this.setExecutable(true);
    } else {
      this.setExecutable(false);
    }
  }
}
