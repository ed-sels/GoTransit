import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  trips = [
    {
      id: 1,
      from: 'Accra',
      to: 'Kumasi',
      date: '2026-03-05',
      departureTime: '08:00 AM',
      arrivalTime: '12:30 PM',
      seats: 12,
      price: 120
    },
    {
      id: 2,
      from: 'Accra',
      to: 'Cape Coast',
      date: '2026-03-05',
      departureTime: '09:30 AM',
      arrivalTime: '01:00 PM',
      seats: 3,
      price: 80
    },
    {
      id: 3,
      from: 'Accra',
      to: 'Ho',
      date: '2026-03-05',
      departureTime: '09:30 AM',
      arrivalTime: '01:00 PM',
      seats: 15,
      price: 50
    }
  ];

  selectedTrip: any = null;
  selectedSeats: number[] = [];

  passenger = {
    name: '',
    phone: '',
    pickupPoint: ''
  };

  getTrips() {
    return this.trips;
  }

  setTrip(trip: any) {
    this.selectedTrip = trip;
  }

  getTrip() {
    return this.selectedTrip;
  }

  setSeats(seats: number[]) {
    this.selectedSeats = seats;
  }

  getSeats() {
    return this.selectedSeats;
  }

  setPassenger(data: any) {
    this.passenger = data;
  }

  getPassenger() {
    return this.passenger;
  }

}
