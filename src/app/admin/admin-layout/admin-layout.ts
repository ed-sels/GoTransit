import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterModule,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

import { AuthService } from '../../auth.service';

import {
  LucideAngularModule,
  UserPen,
  BookOpenText,
  Users,
  SquareChartGantt,
  LayoutDashboard,
  LogOut,
  House
} from 'lucide-angular';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
  CommonModule,
  RouterModule,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  LucideAngularModule
],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {

  readonly UserPen = UserPen;
  readonly BookOpenText = BookOpenText;
  readonly Users = Users;
  readonly SquareChartGantt = SquareChartGantt;
  readonly LayoutDashboard = LayoutDashboard;
  readonly LogOut = LogOut;
  readonly House = House;

  sidebarCollapsed = false;
  mobileSidebarOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn() || !this.authService.isAdmin()) {
      this.router.navigate(['/Login']);
    }
  }

  get user() {
    return this.authService.getUser();
  }

  getInitials(): string {
    const user = this.user;

    if (!user) return 'A';

    const first = user.firstName?.[0] || '';
    const last = user.lastName?.[0] || '';

    return (first + last).toUpperCase() || 'A';
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  toggleMobileSidebar() {
    this.mobileSidebarOpen = !this.mobileSidebarOpen;
  }

  closeMobileSidebar() {
    this.mobileSidebarOpen = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/Login']);
  }

  goToPublicSite() {
    this.router.navigate(['/']);
  }
}