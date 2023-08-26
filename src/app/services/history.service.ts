import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  history: string[] = [];

  constructor() {
    //this.getWelcome();
  }

  addLine(line: string) {
    this.history.push(line);
  }

  getHistory() {
    return this.history;
  }

  getWelcome() {
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
