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
      arrivalTime: '01:00 PM',
      seats: 12,
      price: 120,
      pickupPoints: [
        { name: 'Circle', price: 115 },
        { name: 'Kaneshie', price: 110 },
        { name: 'Nsawam', price: 95 },
        { name: 'Nkawkaw', price: 70 },
        { name: 'Ejisu', price: 40 }
      ]
    },
    {
      id: 2,
      from: 'Accra',
      to: 'Cape Coast',
      date: '2026-03-05',
      departureTime: '09:30 AM',
      arrivalTime: '01:00 PM',
      seats: 3,
      price: 80,
      pickupPoints: [
        { name: 'Kaneshie', price: 75 },
        { name: 'Kasoa', price: 65 },
        { name: 'Winneba', price: 45 },
        { name: 'Mankessim', price: 30 }
      ]
    },
    {
      id: 3,
      from: 'Accra',
      to: 'Ho',
      date: '2026-03-05',
      departureTime: '09:30 AM',
      arrivalTime: '01:00 PM',
      seats: 15,
      price: 50,
      pickupPoints: [
        { name: 'Madina', price: 45 },
        { name: 'Akosombo', price: 30 },
        { name: 'Kpong', price: 20 }
      ]
    },
    {
      id: 4,
      from: 'Accra',
      to: 'Sunyani',
      date: '2026-03-05',
      departureTime: '08:00 AM',
      arrivalTime: '03:30 PM',
      seats: 20,
      price: 140,
      pickupPoints: [
        { name: 'Nsawam', price: 125 },
        { name: 'Bunso', price: 100 },
        { name: 'Koforidua', price: 90 },
        { name: 'Kumasi', price: 80 }
      ]
    },
    {
      id: 5,
      from: 'Accra',
      to: 'Tamale',
      date: '2026-03-05',
      departureTime: '08:00 AM',
      arrivalTime: '06:00 PM',
      seats: 20,
      price: 180,
      pickupPoints: [
        { name: 'Nsawam', price: 170 },
        { name: 'Koforidua', price: 150 },
        { name: 'Kumasi', price: 130 },
        { name: 'Sunyani', price: 110 }
      ]
    },
    {
      id: 6,
      from: 'Accra',
      to: 'Wa',
      date: '2026-03-05',
      departureTime: '08:00 AM',
      arrivalTime: '08:00 PM',
      seats: 20,
      price: 200,
      pickupPoints: [
        { name: 'Nsawam', price: 180 },
        { name: 'Koforidua', price: 160 },
        { name: 'Kumasi', price: 140 },
        { name: 'Sunyani', price: 110 },
        {name: 'Tamale', price: 70}
      ]
    },
    {
      id: 6,
      from: 'Wa',
      to: 'Accra',
      date: '2026-03-05',
      departureTime: '08:00 AM',
      arrivalTime: '08:00 PM',
      seats: 20,
      price: 200,
      pickupPoints: [
        {name: 'Tamale', price: 180},
        { name: 'Sunyani', price: 160 },
        { name: 'Kumasi', price: 140 },
        { name: 'Koforidua', price: 100 },
        ]
    },
  ];

  selectedTrip: any = null;
  selectedSeats: number[] = [];

  passenger = {
    name: '',
    phone: ''
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
