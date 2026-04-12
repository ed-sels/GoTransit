import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private users: any[] = [];
  private readonly STORAGE_KEY = 'app_users_storage';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        this.users = JSON.parse(data);
        // Ensure admin user always exists
        if (!this.users.find(u => u.email === 'admin@gotransit.com')) {
          this.users.push(this.getDefaultAdmin());
          this.saveToStorage();
        }
      } else {
        this.users = [
          this.getDefaultAdmin(),
          {
            firstName: 'Demo',
            lastName: 'User',
            email: 'demo@example.com',
            password: 'password123',
            phone: '',
            role: 'user',
            joinDate: new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }),
            bookings: []
          }
        ];
        this.saveToStorage();
      }
    }
  }

  private getDefaultAdmin() {
    return {
      firstName: 'Admin',
      lastName: 'GoTransit',
      email: 'admin@gotransit.com',
      password: 'admin123',
      phone: '',
      role: 'admin',
      joinDate: new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }),
      bookings: []
    };
  }

  private saveToStorage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.users));
    }
  }

  getUserByEmail(email: string) {
    return this.users.find(u => u.email === email);
  }

  getAllUsers() {
    return this.users.filter(u => u.role !== 'admin');
  }

  addUser(userData: any) {
    if (!userData.role) {
      userData.role = 'user';
    }
    this.users.push(userData);
    this.saveToStorage();
  }

  updateUser(email: string, updatedData: any) {
    const userIndex = this.users.findIndex(u => u.email === email);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updatedData };
      this.saveToStorage();
    }
  }

  deleteUser(email: string) {
    this.users = this.users.filter(u => u.email !== email);
    this.saveToStorage();
  }
}


