import { Component } from '@angular/core';
import { Compiler } from 'src/utils/Compiler';
import { HistoryManager } from 'src/utils/HistoryManager';
import { System } from 'src/utils/System';

@Component({
  selector: 'app-input-line',
  templateUrl: './input-line.component.html',
  styleUrls: ['./input-line.component.scss'],
})
export class InputLineComponent {
  public static LOCK = false;

  dirString: string =
    'phil@phil-shell:' + System.getCurrentPathAsString() + '$';
  inputValue: string = '';
  commandHistoryIndex = 0;

  ngOnInit() {
    this.setDirString();
  }

  onKey(event: any) {
    // enter
    if (event.keyCode === 13) {
      HistoryManager.addLine(this.dirString + ' ' + this.inputValue);
      InputLineComponent.LOCK = true;
      Compiler.compileLine(this.inputValue).then(() => {
        InputLineComponent.LOCK = false;
        HistoryManager.addCommand(this.inputValue);
        this.inputValue = '';
        this.setDirString();

        this.commandHistoryIndex = 0;
      });
    }
    if (event.keyCode === 38) {
      if (
        this.commandHistoryIndex < HistoryManager.getCommandHistory().length
      ) {
        this.inputValue =
          HistoryManager.getCommandHistory()[this.commandHistoryIndex];
        this.commandHistoryIndex++;
      }
    }
    if (event.keyCode === 40) {
      if (this.commandHistoryIndex > 0) {
        this.commandHistoryIndex--;
        this.inputValue =
          HistoryManager.getCommandHistory()[this.commandHistoryIndex];
      } else {
        this.inputValue = '';
      }
    }
  }

  setDirString() {
    if (System.getCurrentPathAsString() == System.getUserPathAsString()) {
      this.dirString = 'phil@phil-shell:~$';
    } else {
      this.dirString =
        'phil@phil-shell:' + System.getCurrentPathAsString() + '$';
    }
  }

  getLock() {
    return InputLineComponent.LOCK;
  }
}
