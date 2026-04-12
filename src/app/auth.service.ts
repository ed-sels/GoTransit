import { Injectable } from '@angular/core';
import { UserDataService } from './services/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: any = null;

  constructor(private userDataService: UserDataService) {}

  login(email: string, password: string): boolean {
    let user = this.userDataService.getUserByEmail(email);

    if (!user || user.password !== password) {
      return false;
    }
    
    this.currentUser = { ...user };
    return true;
  }

  signup(data: any): boolean {
    let user = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phone: '',
      joinDate: new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }),
      bookings: []
    };
    this.userDataService.addUser(user);
    this.currentUser = { ...user };
    return true;
  }

  getUser() {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  logout() {
    this.currentUser = null;
  }

  deleteUser() {
    if (this.currentUser) {
      this.userDataService.deleteUser(this.currentUser.email);
    }
    this.currentUser = null;
  }

  updateUser(data: any) {
    if (this.currentUser) {
      Object.assign(this.currentUser, data);
      this.userDataService.updateUser(this.currentUser.email, data);
    }
  }

  addBooking(booking: any) {
    if (this.currentUser) {
      if (!this.currentUser.bookings) {
        this.currentUser.bookings = [];
      }
      this.currentUser.bookings.push(booking);
      this.userDataService.updateUser(this.currentUser.email, { bookings: this.currentUser.bookings });
    }
  }

  cancelBooking(ref: string) {
    if (this.currentUser && this.currentUser.bookings) {
      const booking = this.currentUser.bookings.find((b: any) => b.ref === ref);
      if (booking) {
        booking.status = 'Cancelled';
        this.userDataService.updateUser(this.currentUser.email, { bookings: this.currentUser.bookings });
      }
    }
  }
}
