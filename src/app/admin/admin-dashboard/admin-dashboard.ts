import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { TripService } from '../../trip.service';
import { BadgePlus, Banknote, BookOpenText, Bus, House, LucideAngularModule, Users } from 'lucide-angular';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {

  readonly Users = Users;
  readonly Bus = Bus;
  readonly BookOpenText = BookOpenText;
  readonly BadgePlus = BadgePlus;
  readonly House = House;
  readonly Banknote = Banknote;

  stats: any = {};
  recentBookings: any[] = [];
  topRoutes: any[] = [];

  constructor(
    private adminService: AdminService,
    private tripService: TripService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.stats = this.adminService.getStats();
    this.recentBookings = this.adminService.getAllBookings().slice(0, 5);
    this.calculateTopRoutes();
  }

  calculateTopRoutes() {
    const bookings = this.adminService.getAllBookings();
    const routeMap: { [key: string]: number } = {};

    bookings.forEach(b => {
      if (b.route) {
        routeMap[b.route] = (routeMap[b.route] || 0) + 1;
      }
    });

    this.topRoutes = Object.entries(routeMap)
      .map(([route, count]) => ({ route, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed': return 'status-completed';
      case 'Upcoming': return 'status-upcoming';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  }
}
