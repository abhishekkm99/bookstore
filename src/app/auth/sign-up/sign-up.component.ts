import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  UserType: string = 'Customer';
  Phone: string = '';
  Email: string = '';
  Password: string = '';
  ConfirmPassword: string = '';
  userName: string = '';

  constructor(public route: Router) {}

  ngOnInit(): void {}

  signup() {
    console.log('signup');
    if (
      this.userName !== '' &&
      this.Phone !== '' &&
      this.Email !== '' &&
      this.Password !== '' &&
      this.ConfirmPassword !== ''
    ) {
      if (this.Password === this.ConfirmPassword) {
        let newUser: any = {
          id: Math.floor(Math.random() * 100) + 2,
          userName: this.userName,
          Email: this.Email,
          Phone: this.Phone,
          Password: this.Password,
          UserType: this.UserType,
          WishList: [],
          Completed: [],
        };
        localStorage.setItem('isUserLoggedIn', 'true');
        localStorage.setItem('id', newUser.id);
        localStorage.setItem('newUser', JSON.stringify(newUser));
        this.route.navigateByUrl('/home');
      } else {
        alert('Please enter Password and ConfirmPassword same');
      }
    } else {
      alert('Please fill all the details');
    }
  }
}
