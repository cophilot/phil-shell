import { Component } from '@angular/core';
import { Compiler } from 'src/utils/Compiler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  getHelp() {
    Compiler.compileLine('help');
  }
}
