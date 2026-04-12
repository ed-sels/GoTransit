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

    if (!user) {
      user = {
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
            ref: 'BK-H7L2M1',
            route: 'Accra → Ho',
            date: '2026-03-12',
            seats: [10],
            status: 'Upcoming',
            amount: 50
          }
        ]
      };
      this.userDataService.addUser(user);
    }
    
    this.currentUser = { ...user };
    return true;
  }

  signup(data: any): boolean {
    let user = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
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
}
