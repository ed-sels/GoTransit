import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.css'
})
export class AdminProfile implements OnInit {

  user: any = null;
  isEditing = false;
  editForm: any = {};
  showPasswordForm = false;
  passwords = {
    current: '',
    newPassword: '',
    confirm: ''
  };
  passwordError = '';
  passwordSuccess = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  getInitials(): string {
    if (!this.user) return 'A';
    const first = this.user.firstName?.[0] || '';
    const last = this.user.lastName?.[0] || '';
    return (first + last).toUpperCase() || 'A';
  }

  startEdit() {
    this.isEditing = true;
    this.editForm = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone || ''
    };
  }

  cancelEdit() {
    this.isEditing = false;
  }

  saveProfile() {
    this.authService.updateUser(this.editForm);
    this.user = this.authService.getUser();
    this.isEditing = false;
  }

  togglePasswordForm() {
    this.showPasswordForm = !this.showPasswordForm;
    this.passwords = { current: '', newPassword: '', confirm: '' };
    this.passwordError = '';
    this.passwordSuccess = '';
  }

  changePassword() {
    this.passwordError = '';
    this.passwordSuccess = '';

    if (this.passwords.current !== this.user.password) {
      this.passwordError = 'Current password is incorrect.';
      return;
    }

    if (this.passwords.newPassword.length < 6) {
      this.passwordError = 'New password must be at least 6 characters.';
      return;
    }

    if (this.passwords.newPassword !== this.passwords.confirm) {
      this.passwordError = 'New passwords do not match.';
      return;
    }

    this.authService.updateUser({ password: this.passwords.newPassword });
    this.user = this.authService.getUser();
    this.passwordSuccess = 'Password updated successfully!';
    this.passwords = { current: '', newPassword: '', confirm: '' };

    setTimeout(() => {
      this.showPasswordForm = false;
      this.passwordSuccess = '';
    }, 2000);
  }
}
