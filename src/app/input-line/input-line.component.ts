import { Component } from '@angular/core';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-input-line',
  templateUrl: './input-line.component.html',
  styleUrls: ['./input-line.component.scss'],
})
export class InputLineComponent {
  dirString: string = 'phil@phil-shell:~$';
  inputValue: string = '';

  constructor(private historyService: HistoryService) {}

  onKey(event: any) {
    if (event.keyCode === 13) {
      this.historyService.addLine(this.dirString + ' ' + this.inputValue);
      this.inputValue = '';
    }
  }
}
