import { Entry } from './Entry';

export class File extends Entry {
  content: string[] = [];

  constructor(name: string, content?: string[]) {
    super(name);
    if (content) {
      this.content = content;
    }
  }
}
