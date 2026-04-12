import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-bookings.html',
  styleUrl: './admin-bookings.css'
})
export class AdminBookings implements OnInit {

  allBookings: any[] = [];
  statusFilter = 'all';
  searchQuery = '';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.allBookings = this.adminService.getAllBookings();
  }

  get filteredBookings() {
    let result = this.allBookings;

    if (this.statusFilter !== 'all') {
      result = result.filter(b => b.status === this.statusFilter);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(b =>
        b.route?.toLowerCase().includes(q) ||
        b.userName?.toLowerCase().includes(q) ||
        b.ref?.toLowerCase().includes(q)
      );
    }

    return result;
  }

  get totalRevenue() {
    return this.filteredBookings
      .filter(b => b.status !== 'Cancelled')
      .reduce((sum, b) => sum + (b.amount || 0), 0);
  }

  setFilter(status: string) {
    this.statusFilter = status;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed': return 'status-completed';
      case 'Upcoming': return 'status-upcoming';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  }

  cancelBooking(booking: any) {
    if (booking.status === 'Upcoming') {
      this.adminService.cancelBooking(booking.userEmail, booking.ref);
      this.loadBookings();
    }
  }
}
