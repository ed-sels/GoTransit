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

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'data-binding', component: DataBinding},
  {path: 'NgFor', component: NgFor},
  {path: 'Login', component: Login},
  {path: 'built-in-pipes', component: BuiltInPipes},
  {path: 'about', component: About},
  {path: 'signup', component: Signup},
  {path: 'trips', component: Trips},
  {path: 'about', component: About},
  {path: 'contact', component: Contact},
  {path: 'seat-selection', component: SeatSelection},
  {path: 'trip-information', component: TripInformation},
  {path: 'profile', component: Profile},
  {path: 'booking-confirmation', component: BookingConfirmation},
  {path: 'storage', component: Storage}
];
