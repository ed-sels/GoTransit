import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DataBinding } from './data-binding/data-binding';
import { Directives } from './directives/directives';
// import {NgFor} from './ng-for/ng-for';
// import { SwitchCase } from './switch-case/switch-case';
import { AttributeDirectives } from './attribute-directives/attribute-directives';
import { Signals } from './signals/signals';
import { Lsignals } from './lsignals/lsignals';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    // RouterLink,
    // RouterLinkActive
    // Directives,
    // NgFor,
    // SwitchCase,
    // AttributeDirectives,
    // Signals,
  // Lsignals
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Practice');
}
