import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css'
})
export class AdminUsers implements OnInit {

  users: any[] = [];
  searchQuery = '';
  expandedUser: string | null = null;
  showDeleteConfirm = false;
  deletingUserEmail: string | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.adminService.getAllUsers();
  }

  get filteredUsers() {
    if (!this.searchQuery.trim()) return this.users;
    const q = this.searchQuery.toLowerCase();
    return this.users.filter(u =>
      u.firstName?.toLowerCase().includes(q) ||
      u.lastName?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q)
    );
  }

  toggleExpand(email: string) {
    this.expandedUser = this.expandedUser === email ? null : email;
  }

  getInitials(user: any): string {
    const first = user.firstName?.[0] || '';
    const last = user.lastName?.[0] || '';
    return (first + last).toUpperCase() || '?';
  }

  getBookingCount(user: any): number {
    return user.bookings?.length || 0;
  }

  getTotalSpent(user: any): number {
    return user.bookings?.reduce((sum: number, b: any) => sum + (b.amount || 0), 0) || 0;
  }

  confirmDelete(email: string) {
    this.showDeleteConfirm = true;
    this.deletingUserEmail = email;
  }

  cancelDelete() {
    this.showDeleteConfirm = false;
    this.deletingUserEmail = null;
  }

  deleteUser() {
    if (this.deletingUserEmail) {
      this.adminService.deleteUser(this.deletingUserEmail);
      this.loadUsers();
    }
    this.cancelDelete();
  }
}
