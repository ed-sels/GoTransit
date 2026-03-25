import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-switch-case',
  imports: [CommonModule],
  templateUrl: './switch-case.html',
  styleUrl: './switch-case.css',
})
export class SwitchCase {
  grade:number = 0;

  set(x:number){
    this.grade = x;
}
}