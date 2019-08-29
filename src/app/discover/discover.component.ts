import { Component, OnInit } from '@angular/core';
import {Movies, DiscoverService} from './discover.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css'],
  providers: [DiscoverService]
})
export class DiscoverComponent implements OnInit {
  error: any;
  headers: string[];
  movies: Movies;
  constructor(private discoverService: DiscoverService) { }
  showConfig() {
    this.discoverService.getConfig()
      .subscribe(
        (data: Movies) => this.movies = { ...data }, // success path
        error => this.error = error // error path
      );
  }
  ngOnInit() {
    this.showConfig();
  }

}
