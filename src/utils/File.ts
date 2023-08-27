import { Entry } from './Entry';
import { PermissionFlag } from './PermissionFlag';

export class File extends Entry {
  content: string[] = [];

  type: string = 'file';

  constructor(name: string, content?: string[]) {
    super(name);
    if (content) {
      this.content = content;
    }
    this.permissionFlags.push(PermissionFlag.READ);
    this.permissionFlags.push(PermissionFlag.WRITE);
  }

  override setExecutable(executable: boolean): void {
    // do nothing here file can't be executable
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

  static fromJSON(json: any): File {
    const file = new File(json.name);
    file.permissionFlags = json.permissionFlags;
    file.content = json.content;
    return file;
  }
}
