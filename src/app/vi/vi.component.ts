import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { AppearanceService } from '../services/appearance.service';
import { System } from 'src/utils/System';
import { HistoryManager } from 'src/utils/HistoryManager';

@Component({
  selector: 'app-vi',
  templateUrl: './vi.component.html',
  styleUrls: ['./vi.component.scss'],
})
export class ViComponent {
  text: string = 'text';
  control: string = 'control';

  inControlMode: boolean = true;

  @Input()
  set file(file: any) {
    this.text = file.content.join('\n');
    this.inControlMode = true;
    this.control = '';
  }

  @ViewChild('textAreaEdit') textArea: any;
  @ViewChild('controlInput') controlInput: any;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.inControlMode = true;
      this.control = '';
      this.controlInput.nativeElement.focus();
    }
    if (event.key === 'i' && this.inControlMode) {
      this.inControlMode = false;
      this.control = '--INSERT--';
      setTimeout(() => {
        this.textArea.nativeElement.focus();
      }, 100);
    }
    if (event.key === 'o' && this.inControlMode) {
      this.inControlMode = false;
      this.control = '--INSERT--';
      this.text += '\n';
      setTimeout(() => {
        this.textArea.nativeElement.focus();
      }, 100);
    }
    if (event.key === 'Enter' && this.inControlMode) {
      this.resolveControl();
    }
  }

  getTextInControlMode() {
    let x = this.text;
    for (let i = 0; i < 100; i++) {
      x += '\n~';
    }
    return x;
  }
  resolveControl() {
    if (!this.control.startsWith(':')) {
      this.control = '';
      return;
    }
    let command = this.control.substring(1);
    if (command.includes('w')) {
      if (System.ACTIVEFILE.isWritable()) {
        System.ACTIVEFILE.content = this.text.split('\n');
      } else {
        this.control = `vi: write: ${System.ACTIVEFILE.name}: Permission denied`;
        HistoryManager.addLine(
          `vi: write: ${System.ACTIVEFILE.name}: Permission denied`
        );
      }
      this.control = '';
    }
    if (command.includes('q')) {
      System.ACTIVEFILE = undefined;
    }
  }

  getOffsetLeft(): number {
    return AppearanceService.offsetLeft;
  }
  getOffsetTop(): number {
    return AppearanceService.offsetTop;
  }

  getTextAreaHeight(): number {
    return window.innerHeight - AppearanceService.offsetTop - 100;
  }
}
