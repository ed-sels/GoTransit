import { Component } from '@angular/core';

@Component({
  selector: 'app-storage',
  imports: [],
  templateUrl: './storage.html',
  styleUrl: './storage.css',
})
export class Storage {

  sessionValue : string = " ";

  setSession(){
    sessionStorage.setItem('name', 'session');
    sessionStorage.setItem('pass', 'session123');
  }

  getSession(){
    // this.sessionValue = sessionStorage.getItem('name');
  }

  removeSession(){
    sessionStorage.removeItem('pass');
  }

  clearSession(){
    sessionStorage.clear();
    this.sessionValue = " ";
  }
}
