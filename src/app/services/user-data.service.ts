import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private users: any[] = [];

  getUserByEmail(email: string) {
    return this.users.find(u => u.email === email);
  }

  addUser(userData: any) {
    this.users.push(userData);
  }

  updateUser(email: string, updatedData: any) {
    const userIndex = this.users.findIndex(u => u.email === email);
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updatedData };
    }
  }

  deleteUser(email: string) {
    this.users = this.users.filter(u => u.email !== email);
  }
}
