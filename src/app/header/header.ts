import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  dropdownOpen = false;
  mobileMenuOpen = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  get user() {
    return this.authService.getUser();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getInitials(): string {
    const user = this.user;
    if (!user) return '?';
    const first = user.firstName?.[0] || '';
    const last = user.lastName?.[0] || '';
    return (first + last).toUpperCase() || user.email?.[0]?.toUpperCase() || '?';
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.dropdownOpen = false;
    this.router.navigate(['/Login']);
  }

  goToProfile() {
    this.dropdownOpen = false;
    this.router.navigate(['/profile']);
  }

  goToBookings() {
    this.dropdownOpen = false;
    this.router.navigate(['/profile']);
  }

  goToAdmin() {
    this.dropdownOpen = false;
    this.router.navigate(['/admin']);
  }
}
