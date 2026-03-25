import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Trip {
  id: number;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  seats: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class TripService {

  // store trips
  private trips: Trip[] = [
    { id: 1, from: 'Accra', to: 'Kumasi', date: '2026-03-05', departureTime: '08:00', arrivalTime: '12:30', seats: 12, price: 120 },
    { id: 2, from: 'Accra', to: 'Cape Coast', date: '2026-03-05', departureTime: '09:30', arrivalTime: '13:00', seats: 3, price: 80 },
    { id: 3, from: 'Kumasi', to: 'Tamale', date: '2026-03-06', departureTime: '07:00', arrivalTime: '15:00', seats: 0, price: 200 }
  ];

  // selected trip for booking
  private selectedTripSubject = new BehaviorSubject<Trip | null>(null);
  selectedTrip$ = this.selectedTripSubject.asObservable();

  constructor() { }

  getTrips() {
    return [...this.trips]; // return a copy
  }

  selectTrip(trip: Trip) {
    this.selectedTripSubject.next(trip);
  }

  bookSeats(tripId: number, seatsBooked: number) {
    const trip = this.trips.find(t => t.id === tripId);
    if (trip) {
      trip.seats -= seatsBooked;
      this.selectTrip(trip); // update selectedTrip in case seat selection page shows live seats
    }
  }
}