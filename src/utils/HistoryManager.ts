export class HistoryManager {
  private static history: string[] = [];
  private static commandHistory: string[] = [];

  static addLine(line: string) {
    this.history.push(line);
  }

  static addLines(lines: string[]) {
    lines.forEach((line) => this.history.push(line));
  }

  static getHistory() {
    return this.history;
  }

  static clear() {
    this.history = [];
  }

  static addCommand(command: string) {
    this.commandHistory.unshift(command);
  }

  static getCommandHistory() {
    return this.commandHistory;
  }

  static getWelcome() {
    this.history.push('                  welcome to                ');
    this.history.push('');

    /*     `
#######_     _ _            _          _ _n
######| |   (_) |          | |        | | |n
 _ __ | |__  _| |______ ___| |__   ___| | |n
| '_ \| '_ \| | |______/ __| '_ \ / _ \ | |n
| |_) | | | | | |      \__ \ | | |  __/ | |n
| .__/|_| |_|_|_|      |___/_| |_|\___|_|_|n
| |n
|_|n
`
      .split('n')
      .forEach((line) => this.history.push(line)); */
    `
################_/        _/  _/                        _/                  _/  _/   n
#####_/_/_/    _/_/_/        _/                _/_/_/  _/_/_/      _/_/    _/  _/n
####_/    _/  _/    _/  _/  _/  _/_/_/_/_/  _/_/      _/    _/  _/_/_/_/  _/  _/ n
###_/    _/  _/    _/  _/  _/                  _/_/  _/    _/  _/        _/  _/  n
##_/_/_/    _/    _/  _/  _/              _/_/_/    _/    _/    _/_/_/  _/  _/   n
#_/                                                                              n
_/n
`
      .split('n')
      .forEach((line) => this.history.push(line));
    this.history.push(' ');
    this.history.push(' ');
  }
}
