import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MovieDetailsService} from './movie-details.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  providers: [MovieDetailsService]
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  error: any;
  url: any;
  constructor(
    private route: ActivatedRoute, private movieDetailsService: MovieDetailsService, private titleService: Title
  ) { }
  showConfig(murl) {
    this.movieDetailsService.getConfig(murl)
      .subscribe(
        (data) => this.movie = data, // success path
        error => this.error = error // error path
      );
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.movie = params.get('id');
    });
    this.url =  'https://api.themoviedb.org/3/movie/'+this.movie+'?api_key=6f805b75b38620ddbeab2da1b2db1b69&language=en-US';
    this.showConfig(this.url);
  }

}
