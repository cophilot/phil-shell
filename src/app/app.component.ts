import { Component } from '@angular/core';
import { System } from 'src/utils/System';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  static showHeader = true;
  static offsetLeft = 100;
  static offsetTop = 100;

  title = 'phil-shell';

  ngOnInit() {
    if (this.detectPrefersColorScheme() === 'dark') {
      AppComponent.darkMode();
    } else {
      AppComponent.lightMode();
    }
    System.onBoot();
  }

  detectPrefersColorScheme(): string {
    // Detect if prefers-color-scheme is supported
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      // Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise, set it to Light.
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } else {
      // If the browser does not support prefers-color-scheme, set the default to dark.
      return 'dark';
    }
  }

  public static darkMode() {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  public static lightMode() {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  public static funkyMode() {
    document.documentElement.setAttribute('data-theme', 'funky');
  }
  public static matrixMode() {
    document.documentElement.setAttribute('data-theme', 'matrix');
  }
}
