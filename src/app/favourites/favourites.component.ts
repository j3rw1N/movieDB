import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchService} from '../search/search.service';
import {FavouritesService} from './favourites.service';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  results: any;
  error: any;
  page: any;
  total_count: any;

  constructor(
    private route: ActivatedRoute,
    private favouriteService: FavouritesService,
    private router: Router
  ) { }

  getFavList(page) {
    this.favouriteService.getFavList(page)
      .subscribe(
        (data) => {
                    this.results = data.body;
                    this.total_count = data.headers.get('X-Total-Count');
        }, // success path
        error => this.error = error // error path
      );
  }


  pageChanged(event) {
    this.changePage(event);
  }

  changePage(page) {
    this.router.navigateByUrl('/favourites/' + page);
  }

  initFn() {
    this.route.paramMap.subscribe(params => {
      this.page = params.get('page');
    });
    this.getFavList(this.page);
  }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.initFn();
    });
  }

}
