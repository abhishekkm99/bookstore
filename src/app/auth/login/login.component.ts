import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as data from './../../../../data.json';

interface UsersData {
  id: number;
  userName: string;
  Password: string;
  Phone: string;
  Email: string;
  UserType: string;
  WishList: [];
  Completed: [];
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  products: any = (data as any).default;
  users: UsersData[];
  email: any = '';
  password: any = '';
  id: any;
  isUserLoggedIn: string = '';

  constructor(public route: Router) {
    this.users = [];
    this.id = -1;
  }

  ngOnInit(): void {
    this.users = this.products.Users;
    console.log(this.users);
  }

  login() {
    console.log(this.email);
    console.log(this.password);
    if (this.email === '' || this.password === '') {
      alert('Please enter email and password');
      return;
    }
    let userFound = false;
    this.users.map((user) => {
      if (user.Email === this.email) {
        if (user.Password === this.password) {
          this.id = user.id;
          this.isUserLoggedIn = 'true';
          localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn);
          localStorage.setItem('id', this.id);
          userFound = true;
          this.route.navigateByUrl('/home');
        }
      }
    });
    if (!userFound) {
      alert('User Not found');
    }
  }
}
