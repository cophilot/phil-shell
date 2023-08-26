import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  backgroundClick() {}

  getShowHeader() {
    return AppComponent.showHeader;
  }

  getOffsetLeft() {
    return AppComponent.offsetLeft;
  }

  getOffsetTop() {
    return AppComponent.offsetTop;
  }
}
