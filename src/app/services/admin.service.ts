import { Injectable } from '@angular/core';
import { UserDataService } from './user-data.service';
import { TripService } from '../trip.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private userDataService: UserDataService,
    private tripService: TripService
  ) {}

  getAllUsers() {
    return this.userDataService.getAllUsers();
  }

  getAllBookings() {
    const users = this.getAllUsers();
    const bookings: any[] = [];

    users.forEach(user => {
      if (user.bookings && user.bookings.length > 0) {
        user.bookings.forEach((booking: any) => {
          bookings.push({
            ...booking,
            userName: `${user.firstName} ${user.lastName}`,
            userEmail: user.email
          });
        });
      }
    });

    return bookings.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
  }

  getStats() {
    const users = this.getAllUsers();
    const bookings = this.getAllBookings();
    const trips = this.tripService.getTrips();

    const totalRevenue = bookings
      .filter((b: any) => b.status !== 'Cancelled')
      .reduce((sum: number, b: any) => sum + (b.amount || 0), 0);

    return {
      totalUsers: users.length,
      totalTrips: trips.length,
      totalBookings: bookings.length,
      totalRevenue,
      activeBookings: bookings.filter((b: any) => b.status === 'Upcoming').length,
      cancelledBookings: bookings.filter((b: any) => b.status === 'Cancelled').length,
      completedBookings: bookings.filter((b: any) => b.status === 'Completed').length
    };
  }

  deleteUser(email: string) {
    this.userDataService.deleteUser(email);
  }

  cancelBooking(userEmail: string, ref: string) {
    const user = this.userDataService.getUserByEmail(userEmail);
    if (user && user.bookings) {
      const booking = user.bookings.find((b: any) => b.ref === ref);
      if (booking) {
        booking.status = 'Cancelled';
        this.userDataService.updateUser(userEmail, { bookings: user.bookings });
      }
    }
  }
}
