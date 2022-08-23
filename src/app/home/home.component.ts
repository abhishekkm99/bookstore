import { Component, OnInit } from '@angular/core';
import * as data from './../../../data.json';
import { Router } from '@angular/router';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any = (data as any).default;
  books: BooksData[];
  booksFromDataFile: BooksData[];
  users: UsersData[];
  isUserLoggedIn: string = '';
  isUserActive = false;
  userId: any;
  user: any;
  countWishList: any = 0;
  completedAndWishListBooksOfUser: any;

  constructor(public route: Router) {
    this.books = [];
    this.booksFromDataFile = [];
    this.user = [];
    this.books = this.products.Books;
    this.users = this.products.Users;
    this.booksFromDataFile = this.products.Books;
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
    if (
      localStorage.getItem('isUserLoggedIn') !== '' &&
      localStorage.getItem('isUserLoggedIn') !== null
    ) {
      this.isUserLoggedIn = localStorage.getItem('isUserLoggedIn') || '';
      this.userId = localStorage.getItem('id') || '';
      console.log(this.userId);
      this.user = this.users.filter((u) => {
        console.log(u.id);
        console.log(this.userId);
        return u.id == this.userId;
      });
      console.log('user', this.user);
      this.isUserActive = true;
      this.completedAndWishListBooksOfUser = this.user[0].WishList;
      let newEleWishList: any = [];
      if (localStorage.getItem('newEleWishList') !== null) {
        if (localStorage.getItem('newEleWishList') !== '') {
          let data = localStorage.getItem('newEleWishList') || '';
          newEleWishList = JSON.parse(data);
        }
      }
      let newEleCompleteList: any = [];
      if (localStorage.getItem('newEleCompleteList') !== null) {
        if (localStorage.getItem('newEleCompleteList') !== '') {
          let dataa = localStorage.getItem('newEleCompleteList') || '';
          newEleCompleteList = JSON.parse(dataa);
        }
      }
      console.log(
        'completedAndWishListBooksOfUser : ',
        this.completedAndWishListBooksOfUser
      );
      this.completedAndWishListBooksOfUser = [
        ...this.completedAndWishListBooksOfUser,
        ...this.user[0].Completed,
        ...newEleWishList,
        ...newEleCompleteList,
      ];
      console.log(
        'completedAndWishListBooksOfUser : ',
        this.completedAndWishListBooksOfUser
      );
      this.books = this.books.filter((book) => {
        console.log(book.id);
        console.log(this.completedAndWishListBooksOfUser.includes(book.id));
        return !this.completedAndWishListBooksOfUser.includes(book.id);
      });
      this.countWishList = this.user[0].WishList.length + newEleWishList.length;
    }
  }

  ngOnInit(): void {}

  logout() {
    localStorage.setItem('isUserLoggedIn', '');
    localStorage.setItem('id', '');
    localStorage.setItem('newEleWishList', '');
    localStorage.setItem('newEleCompleteList', '');
    localStorage.setItem('newUser', '');
    if (localStorage.getItem('isUserLoggedIn') === '') {
      this.isUserLoggedIn = '';
      this.isUserActive = false;
    }
    this.books = this.products.Books;
  }

  addtoWishList(id: any) {
    try {
      console.log('addtoWishList', id);
      if (
        localStorage.getItem('isUserLoggedIn') !== '' &&
        localStorage.getItem('isUserLoggedIn') !== null
      ) {
        let newEleWishList: any = [];
        if (localStorage.getItem('newEleWishList') !== null) {
          if (localStorage.getItem('newEleWishList') !== '') {
            let data = localStorage.getItem('newEleWishList') || '';
            newEleWishList = JSON.parse(data);
          }
        }
        newEleWishList.push(id);
        console.log('newEleWishList : ', newEleWishList);
        localStorage.setItem('newEleWishList', JSON.stringify(newEleWishList));
        this.completedAndWishListBooksOfUser.push(id);
        this.books = this.books.filter((book) => {
          return !this.completedAndWishListBooksOfUser.includes(book.id);
        });
        this.countWishList = this.countWishList + 1;
      } else {
        this.route.navigateByUrl('/login');
      }
    } catch (e) {
      alert('error');
    }
  }

  addToComplete(id: any) {
    try {
      console.log('addToComplete', id);
      if (
        localStorage.getItem('isUserLoggedIn') !== '' &&
        localStorage.getItem('isUserLoggedIn') !== null
      ) {
        let newEleCompleteList: any = [];
        if (localStorage.getItem('newEleCompleteList') !== null) {
          if (localStorage.getItem('newEleCompleteList') !== '') {
            let data = localStorage.getItem('newEleCompleteList') || '';
            newEleCompleteList = JSON.parse(data);
          }
        }
        newEleCompleteList.push(id);
        console.log('newEleCompleteList : ', newEleCompleteList);
        localStorage.setItem(
          'newEleCompleteList',
          JSON.stringify(newEleCompleteList)
        );
        this.completedAndWishListBooksOfUser.push(id);
        this.books = this.books.filter((book) => {
          return !this.completedAndWishListBooksOfUser.includes(book.id);
        });
      } else {
        this.route.navigateByUrl('/login');
      }
    } catch (e) {
      alert('error');
    }
  }
}
