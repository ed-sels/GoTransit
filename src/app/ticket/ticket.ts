import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from '../header/header';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, Header],
  templateUrl: './ticket.html',
  styleUrl: './ticket.css'
})
export class Ticket implements OnInit {

  booking: any = null;
  userName = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    if (!user) {
      this.router.navigate(['/Login']);
      return;
    }

    this.userName = (user.firstName + ' ' + user.lastName).trim() || user.email;

    const ref = this.route.snapshot.paramMap.get('ref');
    if (ref && user.bookings) {
      this.booking = user.bookings.find((b: any) => b.ref === ref);
    }

    if (!this.booking) {
      this.router.navigate(['/profile']);
    }
  }

  printTicket() {
    window.print();
  }

  goBack() {
    this.router.navigate(['/profile']);
  }
}
