import { Injectable } from '@angular/core';
import { BashFile } from 'src/utils/BashFile';
import { Dir } from 'src/utils/Dir';
import { System } from 'src/utils/System';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  static getLocalDirectory(): Dir {
    let localX = localStorage.getItem('localDirectory');
    if (localX) {
      console.log(localX);
      return Dir.fromJSON(JSON.parse(localX));
    }
    const local = new Dir('local');
    const scripts = new Dir('scripts');
    scripts.add(
      new BashFile('onboot', [
        '# This file will be executed on boot',
        '',
        'cd ~',
        './scripts/Welcome2.ph',
        '',
        "# After editing this file, run 'lost save' to save it to local storage",
      ])
    );
    local.add(scripts);
    return local;
  }

  static saveLocalDirectory() {
    localStorage.setItem('localDirectory', JSON.stringify(System.LOCAL));
  }

  static clear() {
    localStorage.clear();
  }
}
