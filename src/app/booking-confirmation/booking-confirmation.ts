import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Header } from '../header/header';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-booking-confirmation',
  standalone: true,
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './booking-confirmation.html',
  styleUrl: './booking-confirmation.css'
})
export class BookingConfirmation {

  trip: any;
  selectedSeats: number[] = [];
  passenger: any;
  paymentMethod = '';
  momoNumber = '';
  momoProvider = '';
  cardNumber = '';
  cardExpiry = '';
  cardCvv = '';
  isProcessing = false;
  bookingComplete = false;
  bookingRef = '';

  constructor(
    private tripService: TripService,
    private router: Router
  ) {}

  ngOnInit() {
    this.trip = this.tripService.getTrip();
    this.selectedSeats = this.tripService.getSeats();
    this.passenger = this.tripService.getPassenger();

    if (!this.trip || this.selectedSeats.length === 0) {
      this.router.navigate(['/trips']);
    }
  }

  get totalPrice(): number {
    return this.selectedSeats.length * (this.trip?.price || 0);
  }

  get isPaymentValid(): boolean {
    if (!this.paymentMethod) return false;

    if (this.paymentMethod === 'momo') {
      return this.momoProvider.length > 0 && this.momoNumber.length >= 10;
    }
    if (this.paymentMethod === 'card') {
      return this.cardNumber.length >= 16 && this.cardExpiry.length >= 5 && this.cardCvv.length >= 3;
    }
    if (this.paymentMethod === 'cash') {
      return true;
    }
    return false;
  }

  confirmPayment() {
    if (!this.isPaymentValid) return;

    this.isProcessing = true;

    // Simulate payment processing
    setTimeout(() => {
      this.isProcessing = false;
      this.bookingComplete = true;
      this.bookingRef = 'BK-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    }, 2000);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  bookAnother() {
    this.router.navigate(['/trips']);
  }
}
