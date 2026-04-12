import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Header } from '../header/header';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-trip-information',
  standalone: true,
  imports: [CommonModule, Header],
  templateUrl: './trip-information.html',
  styleUrl: './trip-information.css'
})
export class TripInformation {

  trip: any;
  selectedPickup: string = '';
  currentPrice: number = 0;

  constructor(
    private tripService: TripService,
    private router: Router
  ) {}

  ngOnInit() {
    this.trip = this.tripService.getTrip();

    if (!this.trip) {
      this.router.navigate(['/trips']);
      return;
    }

    // Default to origin (full price)
    this.selectedPickup = this.trip.from;
    this.currentPrice = this.trip.price;
  }

  selectPickup(name: string, price: number) {
    this.selectedPickup = name;
    this.currentPrice = price;
  }

  selectOrigin() {
    this.selectedPickup = this.trip.from;
    this.currentPrice = this.trip.price;
  }

  get formattedDate(): string {
    if (!this.trip?.date) return '';
    const date = new Date(this.trip.date);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  get travelDuration(): string {
    if (!this.trip) return '';
    const dep = this.parseTime(this.trip.departureTime);
    const arr = this.parseTime(this.trip.arrivalTime);
    if (!dep || !arr) return '';
    const diffMs = arr.getTime() - dep.getTime();
    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);
    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
  }

  private parseTime(timeStr: string): Date | null {
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return null;
    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const period = match[3].toUpperCase();
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    const d = new Date(2026, 0, 1, hours, minutes);
    return d;
  }

  continueToSeats() {
    // Store the selected pickup and adjusted price
    this.tripService.setPassenger({
      pickupPoint: this.selectedPickup,
      price: this.currentPrice
    });
    this.router.navigate(['/seat-selection']);
  }

  goBack() {
    this.router.navigate(['/trips']);
  }
}
