import { Component, OnInit } from '@angular/core';
import * as data from './../../../data.json';

interface BooksData {
  id: Number;
  author: String;
  country: String;
  imageLink: String;
  language: String;
  link: String;
  pages: Number;
  title: String;
  year: Number;
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
  selector: 'app-completed-list',
  templateUrl: './completed-list.component.html',
  styleUrls: ['./completed-list.component.css'],
})
export class CompletedListComponent implements OnInit {
  products: any = (data as any).default;
  users: UsersData[];
  books: BooksData[];
  isUserLoggedIn: string = '';
  isUserActive = false;
  userId: any;
  user: any;
  countCompletedList: any = 0;

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

      let newEleCompleteList: any = [];
      if (localStorage.getItem('newEleCompleteList') !== null) {
        if (localStorage.getItem('newEleCompleteList') !== '') {
          let data = localStorage.getItem('newEleCompleteList') || '';
          newEleCompleteList = JSON.parse(data);
        }
      }

      let userCompletedList = [
        ...this.user[0].Completed,
        ...newEleCompleteList,
      ];

      this.books = this.books.filter((book) => {
        console.log(book.id);
        console.log(this.user[0].Completed.includes(book.id));
        return userCompletedList.includes(book.id);
      });
      this.countCompletedList = userCompletedList.length;
      console.log(this.books);
      console.log(this.countCompletedList);
    }
  }

  ngOnInit(): void {}
}
