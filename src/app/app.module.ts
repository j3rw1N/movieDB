import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule, Title } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
  { path: '', component: DiscoverComponent },
  { path: 'movie/:id',      component: MovieDetailsComponent },
  { path: 'search/:query/:page', component: SearchComponent},
  { path: 'favourites/:page', component: FavouritesComponent}
];


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DiscoverComponent } from './discover/discover.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SearchComponent } from './search/search.component';
import { FavouritesComponent } from './favourites/favourites.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DiscoverComponent,
    MovieDetailsComponent,
    SearchComponent,
    FavouritesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true,
        scrollPositionRestoration: 'enabled'
      } // <-- debugging purposes only
    ),
    FormsModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
