import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Header } from '../header/header';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, Header],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  user: any = null;
  activeTab = 'overview';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    if (!this.user) {
      this.router.navigate(['/Login']);
    }
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  getInitials(): string {
    if (!this.user) return '';
    const first = this.user.firstName?.[0] || '';
    const last = this.user.lastName?.[0] || '';
    return (first + last).toUpperCase() || this.user.email?.[0]?.toUpperCase() || '?';
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Completed': return 'status-completed';
      case 'Upcoming': return 'status-upcoming';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  }

  get totalTrips(): number {
    return this.user?.bookings?.length || 0;
  }

  get totalSpent(): number {
    return this.user?.bookings?.reduce((sum: number, b: any) => sum + b.amount, 0) || 0;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/Login']);
  }
}
