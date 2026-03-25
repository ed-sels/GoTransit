import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { CustomPipe } from '../custom-pipe';
import { PurePipe } from '../pure-pipe';

@Component({
  selector: 'app-built-in-pipes',
  imports: [CommonModule,
    // CustomPipe,
    PurePipe
  ],
  templateUrl: './built-in-pipes.html',
  styleUrl: './built-in-pipes.css',
})
export class BuiltInPipes {
  mobileNumber: any = 592782912;

  angularPipes: string = "use pipes to format data in angular templates";

  personData = {
    name: "Edwin Mottey",
    age: 25,
    dateOfBirth: new Date(1998, 11, 17)
  }

  currentDate: Date = new Date();

  items = of([ 'Apple', 'Banana', 'Cherry']);
}
