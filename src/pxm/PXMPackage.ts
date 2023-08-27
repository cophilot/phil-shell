import { Dir } from 'src/utils/Dir';
import { Executable } from 'src/utils/Executable';

export class PXMPackage {
  readonly name: string;
  readonly version: string;
  readonly description: string;
  readonly folder: Dir;
  readonly dependencies: string[] = [];
  constructor(
    name: string,
    version: string,
    description: string,
    executables: Executable[],
    dependencies: string[] = []
  ) {
    this.name = name;
    this.version = version;
    this.description = description;
    this.folder = new Dir(name);
    this.folder.setWritable(false);
    this.folder.addEntries(executables);
    this.dependencies = dependencies;
  }
}
