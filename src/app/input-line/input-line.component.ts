import {
  Component,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
} from '@angular/core';
import { Compiler } from 'src/utils/Compiler';
import { HistoryManager } from 'src/utils/HistoryManager';
import { System } from 'src/utils/System';

@Component({
  selector: 'app-input-line',
  templateUrl: './input-line.component.html',
  styleUrls: ['./input-line.component.scss'],
})
export class InputLineComponent {
  @Output() lineExecuted: EventEmitter<string> = new EventEmitter();

  public static LOCK = false;

  @ViewChild('inputBox') inputBox: any;

  dirString: string =
    'phil@phil-shell:' + System.getCurrentPathAsString() + '$';
  inputValue: string = '';
  commandHistoryIndex = 0;

  ngOnInit() {
    this.setDirString();
  }

  @HostListener('document:click', ['$event'])
  focusInput() {
    this.inputBox.nativeElement.focus();
  }

  @HostListener('document:keydown.tab', ['$event'])
  onTab(event: any) {
    // prevent tab from changing focus
    event.preventDefault();
    this.inputBox.nativeElement.focus();
    if (this.inputValue === '' || this.inputValue.endsWith(' ')) {
      this.inputValue += '  ';
      return;
    }
    const lastWord = this.inputValue.split(' ').pop();
    if (lastWord === undefined) return;
    const currentDir = System.getCurrentDir();
    const entries = currentDir.getEntries();
    const matches = entries
      .filter((entry) => entry.name.startsWith(lastWord))
      .map((entry) => entry.name);
    if (matches.length === 1) {
      const adding = matches[0].replace(lastWord, '');
      this.inputValue += adding;
      return;
    }
    const commonPrefix = matches.reduce((a: string, b: string) => {
      let i = 0;
      while (a[i] === b[i]) {
        i++;
        if (i === a.length) break;
        if (i === b.length) break;
      }
      return a.slice(0, i);
    }, matches[0]);
    this.inputValue = this.inputValue.replace(lastWord, commonPrefix);
    this.inputBox.nativeElement.focus();
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
        // get height of page and scroll to bottom
        this.lineExecuted.emit();
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
    this.inputBox.nativeElement.focus();
  }

  setDirString() {
    if (
      System.getCurrentPathAsString().startsWith(System.getUserPathAsString())
    ) {
      this.dirString =
        'phil@phil-shell:' +
        System.getCurrentPathAsString().replace(
          System.getUserPathAsString(),
          '~'
        ) +
        '$';
    } else {
      this.dirString =
        'phil@phil-shell:' + System.getCurrentPathAsString() + '$';
    }
  }

  getLock() {
    return InputLineComponent.LOCK;
  }
}
