import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attribute-directives',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attribute-directives.html',
})
export class AttributeDirectives {
  customClass = {
    color: 'red',
    fontSize: '24px'
  };
}
