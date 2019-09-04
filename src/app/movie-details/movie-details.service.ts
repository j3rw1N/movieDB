import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

  private apiEndPoint: any;

  constructor(private http: HttpClient) { }

  getMovieDetails(movieID) {
    return this.http.get(movieID)
      .pipe(
        retry(3), // retry a failed request up to 3 times
      );

  }

  getComments(movieID) {
    this.apiEndPoint = 'http://localhost:3000/comments?movieID=' + movieID;
    return this.http.get(this.apiEndPoint)
      .pipe(
        retry(3), // retry a failed request up to 3 times
      );
  }

  postComment(movieID, comment) {
    this.apiEndPoint = 'http://localhost:3000/comments';
    return this.http.post(this.apiEndPoint, comment)
      .pipe(
        retry(3), // retry a failed request up to 3 times
      );
  }

  editComment(commentID, comment) {
    this.apiEndPoint = 'http://localhost:3000/comments/' + commentID;
    return this.http.put(this.apiEndPoint, comment)
      .pipe(
        retry(3), // retry a failed request up to 3 times
      );
  }

  deleteComment(commentID) {
    this.apiEndPoint = 'http://localhost:3000/comments/' + commentID;
    return this.http.delete(this.apiEndPoint)
      .pipe(
        retry(3), // retry a failed request up to 3 times
      );
  }

}
