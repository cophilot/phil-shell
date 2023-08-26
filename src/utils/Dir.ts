import { Entry } from './Entry';

export class Dir extends Entry {
  entries: Entry[] = [];

  constructor(name: string) {
    super(name);
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

  getEntries(): Entry[] {
    return this.entries;
  }

  private sortAlaphabetically(): void {
    this.entries.sort((a, b) => a.name.localeCompare(b.name));
  }
}
