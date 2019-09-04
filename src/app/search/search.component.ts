import {Component, Injectable, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {SearchService} from './search.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  results: any;
  error: any;
  query: any;
  qURL: any;
  page: any;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private titleService: Title,
    private router: Router
  ) { }

  searchMovie(query) {
    this.searchService.getSearchItem(query)
      .subscribe(
        (data) => this.results = data, // success path
        error => this.error = error // error path
      );
  }

  public setTitle() {
    this.titleService.setTitle( this.query + ' - mDB' );
  }

  pageChanged(event) {
    this.changePage(event);
  }

  changePage(page) {
    this.router.navigateByUrl('/search/' + this.query + '/' + page);
  }

  initFn() {
    this.route.paramMap.subscribe(params => {
      this.query = params.get('query');
      this.page = params.get('page');
    });
    // tslint:disable-next-line:max-line-length
    this.qURL =  'https://api.themoviedb.org/3/search/movie?api_key=6f805b75b38620ddbeab2da1b2db1b69&language=en-US&page=' + this.page + '&include_adult=false&query=' + this.query;
    this.searchMovie(this.qURL);
  }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.initFn();
    });
  }

}
