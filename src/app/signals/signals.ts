import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  imports: [],
  templateUrl: './signals.html',
  styleUrl: './signals.css',
})
export class Signals {
  counter = signal(0);

  //Another way to declare a signal is by using the WritableStream interface. This allows us to create a signal that can be updated from outside the component. For example, we can create a counter signal that can be incremented from a button click:
  // counter:WritableStream<number> = signal(0);

  // constructor(){
  //   this.counter.set(5);
  // }

  onIncrement() {
    this.counter.update(value => value + 1);
  }
}
