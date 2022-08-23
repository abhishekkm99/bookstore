import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import * as data from './../../../data.json';

interface BooksData {
  id: number;
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
}

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
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
})
export class WishListComponent implements OnInit {
  products: any = (data as any).default;
  users: UsersData[];
  books: BooksData[];
  isUserLoggedIn: string = '';
  isUserActive = false;
  userId: any;
  user: any;
  countWishList: any = 0;

  constructor() {
    this.books = [];
    this.users = [];
    this.books = this.products.Books;
    this.users = this.products.Users;
    console.log(this.books);
    let newUser;
    if (localStorage.getItem('newUser') !== null) {
      if (localStorage.getItem('newUser') !== '') {
        let d = localStorage.getItem('newUser') || '';
        newUser = JSON.parse(d);
        this.users.push(newUser);
      }
    }

    console.log('this.users : ', this.users);
    if (localStorage.getItem('isUserLoggedIn') !== '') {
      this.isUserLoggedIn = localStorage.getItem('isUserLoggedIn') || '';
      this.userId = localStorage.getItem('id') || '';
      this.user = this.users.filter((user) => {
        console.log(user.id);
        console.log(this.userId);
        return user.id == this.userId;
      });
      console.log('user', this.user);
      this.isUserActive = true;
      let newEleWishList: any = [];
      if (localStorage.getItem('newEleWishList') !== null) {
        if (localStorage.getItem('newEleWishList') !== '') {
          let data = localStorage.getItem('newEleWishList') || '';
          newEleWishList = JSON.parse(data);
        }
      }

      let userWishList = [...this.user[0].WishList, ...newEleWishList];

      this.books = this.books.filter((book) => {
        console.log(book.id);
        console.log(userWishList.includes(book.id));
        return userWishList.includes(book.id);
      });
      this.countWishList = userWishList.length;
      console.log(this.books);
      console.log(userWishList);
    }
  }

  ngOnInit(): void {}
}
