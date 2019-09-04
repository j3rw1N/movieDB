import { Component, OnInit } from '@angular/core';
import {DiscoverService} from './discover.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css'],
  providers: [DiscoverService]
})
export class DiscoverComponent implements OnInit {
  error: any;
  headers: string[];
  movies: any;
  constructor(private discoverService: DiscoverService) { }
  showConfig() {
    this.discoverService.getConfig()
      .subscribe(
        (data) => this.movies = { ...data }, // success path
        error => this.error = error // error path
      );
  }
  ngOnInit() {
    this.showConfig();
  }

}
