import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { AppearanceService } from '../services/appearance.service';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private scroller: ViewportScroller, private router: Router) {}

  backgroundClick() {}

  getShowHeader() {
    return AppearanceService.showHeader;
  }

  getOffsetLeft() {
    return AppearanceService.offsetLeft;
  }

  getOffsetTop() {
    return AppearanceService.offsetTop;
  }

  onLineExecuted() {
    let element = document.getElementById('eID');
    if (element) {
      console.log('line executed');

      element.scrollIntoView();
    }
  }
}
