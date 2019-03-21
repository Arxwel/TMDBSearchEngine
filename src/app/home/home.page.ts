import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../model/movie';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private readonly router: Router, private readonly http: HttpClient) {}
  films: Movie[] = [{title: 'Alita : Battle Angel'}, {title: 'Mirai, ma petite soeur'}, {title: 'Captain Marvel'}];

  getMovies(search: any): void {
    console.log('yolo'); // search.target.value);
    /*
    $http({
      method: 'GET',
      url: 'http://api.themoviedb.org/3/search/movie',
      params: { api_key: 'ebb02613ce5a2ae58fde00f4db95a9c1', query: search.target.value }
    }).then(function successCallback(response) {
        console.log(response);
      }, function errorCallback(response) {
        console.log(response);
      });
    */
  }

  navig(film: string): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          'film': film
      }
  };
    this.router.navigate(['/details'], navigationExtras);
  }
}
