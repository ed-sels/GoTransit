import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: any = null;

  login(email: string, password: string): boolean {
    this.currentUser = {
      firstName: email.split('@')[0],
      lastName: '',
      email: email,
      phone: '',
      joinDate: new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }),
      bookings: [
        {
          ref: 'BK-A3F7K2',
          route: 'Accra → Kumasi',
          date: '2026-03-05',
          seats: [4, 5],
          status: 'Completed',
          amount: 240
        },
        {
          ref: 'BK-M9X1P8',
          route: 'Accra → Cape Coast',
          date: '2026-03-12',
          seats: [10],
          status: 'Upcoming',
          amount: 80
        },
        {
          ref: 'BK-M9X1P8',
          route: 'Accra → Ho',
          date: '2026-03-12',
          seats: [10],
          status: 'Upcoming',
          amount: 50
        }
      ]
    };
    return true;
  }

  signup(data: any): boolean {
    this.currentUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: '',
      joinDate: new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }),
      bookings: []
    };
    return true;
  }

  getUser() {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  logout() {
    this.currentUser = null;
  }

  updateUser(data: any) {
    if (this.currentUser) {
      Object.assign(this.currentUser, data);
    }
  }
}
