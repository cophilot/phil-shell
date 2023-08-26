export class SynonymManager {
  static getBoolean(value: string): boolean | null {
    value = value.toLowerCase();
    if (
      value === 'on' ||
      value === 'true' ||
      value === 'enable' ||
      value === '1'
    ) {
      return true;
    } else if (
      value === 'off' ||
      value === 'false' ||
      value === 'disable' ||
      value === '0'
    ) {
      return false;
    }
    return null;
  }

  static isQuietly(args: string[]): boolean {
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '-q' || args[i] === '--quiet') {
        args.splice(i, 1);
        i--;
        return true;
      }
    }
    return false;
  }

  static colorString(str: string, color: string): string {
    return '$$$' + color + '~~~' + str + '$$$';
  }
}
