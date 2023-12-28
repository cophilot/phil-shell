import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppearanceService {
  static isMobile = false;
  static showHeader = true;
  static offsetLeft = 100;
  static offsetTop = 100;
  static currentTheme = 'dark';
  static availableThemes = [
    'light',
    'dark',
    'funky',
    'barbie',
    'linux',
    'powershell',
    'ocean',
    'forest',
    'sunset',
    'midnight',
    'desert',
    'royal',
    'retro',
  ];

  static init() {
    AppearanceService.detectPrefersColorScheme();
    AppearanceService.isMobile = window.innerWidth < 800;
    if (AppearanceService.isMobile) {
      AppearanceService.offsetLeft = 10;
    }
  }

  static setTheme(theme: string): boolean {
    if (AppearanceService.availableThemes.includes(theme)) {
      document.documentElement.setAttribute('data-theme', theme);
      AppearanceService.currentTheme = theme;
      return true;
    }
    return false;
  }

  static detectPrefersColorScheme() {
    let theme = 'dark';
    // Detect if prefers-color-scheme is supported
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      // Set colorScheme to Dark if prefers-color-scheme is dark. Otherwise, set it to Light.
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    this.setTheme(theme);
  }
}
