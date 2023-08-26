import { Component } from '@angular/core';
import { HistoryManager } from 'src/utils/HistoryManager';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  getHistory() {
    return HistoryManager.getHistory();
  }
}
