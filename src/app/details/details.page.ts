import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { Movie } from '../model/movie';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
  movie: Movie;
  constructor(private readonly router: Router) {
    this.movie = this.router.getCurrentNavigation().extras.state as Movie;
    this.movie.poster_path = this.getImageUrl(this.movie.poster_path);
    this.movie.backdrop_path = this.getImageUrl(this.movie.backdrop_path);
  }
  getImageUrl(image: string): string {
    return `https://image.tmdb.org/t/p/w780${image}`;
    }
}
