import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../header/header';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './seat-selection.html',
  styleUrl: './seat-selection.css'
})
export class SeatSelection {

  trip: any;
  passenger: any;

  seats: any[] = [];
  seatRows: any[][] = [];
  backRow: any[] = [];
  selectedSeats: number[] = [];


  constructor(
    private tripService: TripService,
    private router: Router
  ) {}

  ngOnInit() {

    this.trip = this.tripService.getTrip();
    this.passenger = this.tripService.getPassenger();

    const bookedSeats = [3, 7, 12, 18, 25, 33];

    // Generate 40 seats total
    for (let i = 1; i <= 40; i++) {
      this.seats.push({
        number: i,
        selected: false,
        booked: bookedSeats.includes(i)
      });
    }

    // Rows 1-9: 4 seats each (2 left + 2 right) = 36 seats
    for (let r = 0; r < 9; r++) {
      const start = r * 4;
      this.seatRows.push(this.seats.slice(start, start + 4));
    }

    // Back row: seats 37-40 (4 seats spanning the full width)
    this.backRow = this.seats.slice(36, 40);

  }

  get seatPrice(): number {
    return this.passenger?.price || this.trip?.price || 0;
  }

  toggleSeat(seat: any) {

    if (seat.booked) return;

    seat.selected = !seat.selected;

    if (seat.selected) {
      this.selectedSeats.push(seat.number);
    } else {
      this.selectedSeats =
        this.selectedSeats.filter(s => s !== seat.number);
    }

  }

  confirmBooking() {

    this.tripService.setSeats(this.selectedSeats);
    this.router.navigate(['/booking-confirmation']);

  }

}
