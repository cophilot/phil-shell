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
