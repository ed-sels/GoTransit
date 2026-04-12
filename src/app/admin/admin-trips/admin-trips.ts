import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripService } from '../../trip.service';

@Component({
  selector: 'app-admin-trips',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-trips.html',
  styleUrl: './admin-trips.css'
})
export class AdminTrips implements OnInit {

  trips: any[] = [];
  showForm = false;
  isEditing = false;
  editingTripId: number | null = null;
  showDeleteConfirm = false;
  deletingTripId: number | null = null;
  searchQuery = '';

  tripForm: any = {
    from: '',
    to: '',
    date: '',
    departureTime: '',
    arrivalTime: '',
    seats: 0,
    price: 0,
    pickupPoints: []
  };

  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.loadTrips();
  }

  loadTrips() {
    this.trips = this.tripService.getTrips();
  }

  get filteredTrips() {
    if (!this.searchQuery.trim()) return this.trips;
    const q = this.searchQuery.toLowerCase();
    return this.trips.filter(t =>
      t.from.toLowerCase().includes(q) ||
      t.to.toLowerCase().includes(q) ||
      t.date.includes(q)
    );
  }

  openAddForm() {
    this.showForm = true;
    this.isEditing = false;
    this.editingTripId = null;
    this.resetForm();
  }

  openEditForm(trip: any) {
    this.showForm = true;
    this.isEditing = true;
    this.editingTripId = trip.id;
    this.tripForm = {
      from: trip.from,
      to: trip.to,
      date: trip.date,
      departureTime: trip.departureTime,
      arrivalTime: trip.arrivalTime,
      seats: trip.seats,
      price: trip.price,
      pickupPoints: trip.pickupPoints ? trip.pickupPoints.map((p: any) => ({ ...p })) : []
    };
  }

  closeForm() {
    this.showForm = false;
    this.isEditing = false;
    this.editingTripId = null;
    this.resetForm();
  }

  resetForm() {
    this.tripForm = {
      from: '',
      to: '',
      date: '',
      departureTime: '',
      arrivalTime: '',
      seats: 0,
      price: 0,
      pickupPoints: []
    };
  }

  addPickupPoint() {
    this.tripForm.pickupPoints.push({ name: '', price: 0 });
  }

  removePickupPoint(index: number) {
    this.tripForm.pickupPoints.splice(index, 1);
  }

  saveTrip() {
    if (!this.tripForm.from || !this.tripForm.to || !this.tripForm.date) return;

    if (this.isEditing && this.editingTripId !== null) {
      this.tripService.updateTrip(this.editingTripId, { ...this.tripForm });
    } else {
      this.tripService.addTrip({ ...this.tripForm });
    }

    this.loadTrips();
    this.closeForm();
  }

  confirmDelete(tripId: number) {
    this.showDeleteConfirm = true;
    this.deletingTripId = tripId;
  }

  cancelDelete() {
    this.showDeleteConfirm = false;
    this.deletingTripId = null;
  }

  deleteTrip() {
    if (this.deletingTripId !== null) {
      this.tripService.deleteTrip(this.deletingTripId);
      this.loadTrips();
    }
    this.cancelDelete();
  }
}
