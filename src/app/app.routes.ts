import { Routes } from '@angular/router';
import { DataBinding } from './data-binding/data-binding';
import { NgFor } from './ng-for/ng-for';
import { Login } from './login/login';
import { App } from './app';
import { Home } from './home/home';
import { BuiltInPipes } from './built-in-pipes/built-in-pipes';
import { About } from './about/about';
import { Signup } from './signup/signup';
import { Trips } from './trips/trips';
import { Contact } from './contact/contact';
import { SeatSelection } from './seat-selection/seat-selection';
import { Profile } from './profile/profile';
import { BookingConfirmation } from './booking-confirmation/booking-confirmation';
import { TripInformation } from './trip-information/trip-information';
import { Storage } from './storage/storage';
import { Ticket } from './ticket/ticket';
import { AdminLayout } from './admin/admin-layout/admin-layout';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { AdminTrips } from './admin/admin-trips/admin-trips';
import { AdminUsers } from './admin/admin-users/admin-users';
import { AdminBookings } from './admin/admin-bookings/admin-bookings';
import { AdminProfile } from './admin/admin-profile/admin-profile';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'data-binding', component: DataBinding},
  {path: 'NgFor', component: NgFor},
  {path: 'Login', component: Login},
  {path: 'built-in-pipes', component: BuiltInPipes},
  {path: 'about', component: About},
  {path: 'signup', component: Signup},
  {path: 'trips', component: Trips},
  {path: 'contact', component: Contact},
  {path: 'seat-selection', component: SeatSelection},
  {path: 'trip-information', component: TripInformation},
  {path: 'profile', component: Profile},
  {path: 'booking-confirmation', component: BookingConfirmation},
  {path: 'ticket/:ref', component: Ticket},
  {path: 'storage', component: Storage},

  // Admin routes
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '', component: AdminDashboard },
      { path: 'trips', component: AdminTrips },
      { path: 'users', component: AdminUsers },
      { path: 'bookings', component: AdminBookings },
      { path: 'profile', component: AdminProfile }
    ]
  }
];
