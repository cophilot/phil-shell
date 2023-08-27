import { BashFile } from './BashFile';
import { Entry } from './Entry';
import { File } from './File';
import { PermissionFlag } from './PermissionFlag';

export class Dir extends Entry {
  entries: Entry[] = [];

  type: string = 'dir';

  constructor(name: string) {
    super(name);
    this.permissionFlags.push(PermissionFlag.READ);
    this.permissionFlags.push(PermissionFlag.WRITE);
  }

  add(entry: Entry): void {
    this.entries.push(entry);
    this.sortAlaphabetically();
  }

  addEntries(entries: Entry[]): void {
    entries.forEach((entry) => this.entries.push(entry));
    this.sortAlaphabetically();
  }

  getEntry(name: string): Entry | undefined {
    return this.entries.find((entry) => entry.name === name);
  }

  getEntryDeep(name: string): Entry | undefined {
    for (let entry of this.entries) {
      if (entry.name === name) {
        return entry;
      }
      if (entry instanceof Dir) {
        const foundEntry = entry.getEntryDeep(name);
        if (foundEntry) {
          return foundEntry;
        }
      }
    }
    return undefined;
  }

  removeEntry(name: string): void {
    this.entries = this.entries.filter((entry) => entry.name !== name);
  }

  getEntries(): Entry[] {
    return this.entries;
  }

  getTotalEntriesCount(): number {
    let count = 0;
    for (let entry of this.entries) {
      if (entry instanceof Dir) {
        count += entry.getTotalEntriesCount();
      }
      count++;
    }
    return count;
  }

  static fromJSON(json: any): Dir {
    const dir = new Dir(json.name);
    dir.permissionFlags = json.permissionFlags;
    dir.entries = json.entries.map((entry: any) => {
      if (entry.type === 'dir') {
        return Dir.fromJSON(entry);
      }
      if (entry.type === 'file') {
        return File.fromJSON(entry);
      }
      if (entry.type === 'bashfile') {
        return BashFile.fromJSON(entry);
      }
      return undefined;
    });
    return dir;
  }

  private sortAlaphabetically(): void {
    this.entries.sort((a, b) => a.name.localeCompare(b.name));
  }

  override setExecutable(executable: boolean): void {
    // do nothing here dir can't be executable
  }

  override setReadable(readable: boolean): void {
    // do nothing here dir must be readable
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
}
