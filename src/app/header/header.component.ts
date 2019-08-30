import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  search(query) {
    console.log(query);
    this.router.navigateByUrl('/search/' + query);
    //this.router.navigate(['/search', query]);
  }

}
