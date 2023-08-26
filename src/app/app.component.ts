import { Component } from '@angular/core';
import { System } from 'src/utils/System';
import { AppearanceService } from './services/appearance.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'phil-shell';

  ngOnInit() {
    AppearanceService.init();

    System.onBoot();
  }

  static goToEnd() {
    window.scrollTo(0, document.body.scrollHeight);
  }
}
