import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  private listUrl: any;
  private postUrl: any;

  constructor(private http: HttpClient) { }
  getFavList(page) {
    this.listUrl = 'http://localhost:3000/movies?_page=' + (page - 1);
    return this.http.get(this.listUrl, {observe: 'response'})
      .pipe(
        retry(3), // retry a failed request up to 3 times
      );
  }

  addToFav(movieID) {
    this.postUrl = 'http://localhost:3000/movies';
    return this.http.post(this.postUrl, movieID);
  }

  deleteFromFav(movieID) {
    this.postUrl = 'http://localhost:3000/movies/' + movieID;
    return this.http.delete(this.postUrl);
  }

  checkFav(movieID) {
    this.postUrl = 'http://localhost:3000/movies/' + movieID;
    return this.http.get(this.postUrl, {observe: 'response'})
      .pipe(
        retry(3), // retry a failed request up to 3 times
      );
  }

}
