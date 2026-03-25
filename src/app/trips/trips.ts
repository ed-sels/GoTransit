import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Header } from "../header/header";
import { TripService } from '../trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trips',
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './trips.html',
  styleUrl: './trips.css',
})

export class Trips {

  trips: any[] = [];
  filteredTrips: any[] = [];

  search = {
    from: '',
    to: '',
    date: ''
  };

  constructor(
    private tripService: TripService,
    private router: Router
  ) {}

  ngOnInit(){
    this.trips = this.tripService.getTrips();
    this.filteredTrips = [...this.trips];
  }

  filterTrips() {
    this.filteredTrips = this.trips.filter(trip =>
      (!this.search.from || trip.from.toLowerCase().includes(this.search.from.toLowerCase())) &&
      (!this.search.to || trip.to.toLowerCase().includes(this.search.to.toLowerCase())) &&
      (!this.search.date || trip.date === this.search.date)
    );
  }

  resetSearch() {
    this.search = {
      from: '',
      to: '',
      date: ''
    };

    this.filteredTrips = [...this.trips];
  }

  bookTrip(trip:any){
    this.tripService.setTrip(trip);
    this.router.navigate(['/seat-selection']);
  }

}
