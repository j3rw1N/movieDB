import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MovieDetailsService} from './movie-details.service';
import { Title } from '@angular/platform-browser';
import {FavouritesService} from '../favourites/favourites.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  providers: [MovieDetailsService, FavouritesService]
})
export class MovieDetailsComponent implements OnInit {
  movieID: any;
  movie: any;
  error: any;
  url: any;
  temp: any;
  isFav: boolean;
  isEdit: boolean;
  comments: any;
  comment: any;
  addComm: any;
  editComm: any;
  editCommID: any;
  constructor(
    private route: ActivatedRoute,
    private movieDetailsService: MovieDetailsService,
    private titleService: Title,
    private favoriteService: FavouritesService
  ) { }

  showMovieDetails(murl) {
    this.movieDetailsService.getMovieDetails(murl)
      .subscribe(
        (data) => this.movie = data, // success path
        error => this.error = error // error path
      );
  }

  addToFav() {
    this.favoriteService.addToFav(this.movie)
      .subscribe(
        (data) => {
          this.isFav = true;
          }, // success path
        error => this.error = error
      );
  }

  deleteFromFav() {
    this.favoriteService.deleteFromFav(this.movieID)
    .subscribe(
      (data) => {
        this.isFav = false;
      }, // success path
      error => this.error = error
    );
  }

  checkFav() {
    this.favoriteService.checkFav(this.movieID)
      .subscribe(
        (data) => {
          this.isFav = data.body != '{}';
        }, // success path
        error => this.error = error
      );
  }

  getComments() {
    this.movieDetailsService.getComments(this.movieID)
      .subscribe(
        (data) => this.comments = data,
        error => this.error = error
      );
  }

  addComment(comment) {
    this.comment = {
      "movieID": this.movieID,
      "comment": comment
    };
    this.movieDetailsService.postComment(this.movieID, this.comment)
      .subscribe(
        (data) => {
            this.temp = data;
            this.addComm = '';
            this.getComments();
          },
        error => this.error = error
      );

  }

  delComment(commentID) {
    this.movieDetailsService.deleteComment(commentID)
      .subscribe(
        (data) => {
          this.temp = data;
          this.getComments();
        },
        error => this.error = error
      );

  }

  showEdit(commentID, comment) {
    this.isEdit = true;
    this.editCommID = commentID;
    this.editComm = comment;
  }

  editComment(comment) {
    this.comment = {
      "movieID": this.movieID,
      "comment": comment
    };
    this.movieDetailsService.editComment(this.editCommID, this.comment)
      .subscribe(
        (data) => {
          this.temp = data;
          this.isEdit = false;
          this.getComments();
        },
        error => this.error = error
      );
  }


  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.movieID = params.get('id');
    });
    this.isEdit = false;
    this.url =  'https://api.themoviedb.org/3/movie/' + this.movieID + '?api_key=6f805b75b38620ddbeab2da1b2db1b69&language=en-US';
    this.showMovieDetails(this.url);
    this.checkFav();
    this.getComments();
  }

}
