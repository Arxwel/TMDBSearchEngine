import { Component } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Movie, TMDBResponse } from "../model/movie";
import { AlertController, LoadingController } from "@ionic/angular";
import { apiKey } from "src/tmdb";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  films: Promise<Movie[]>;
  film: Movie;
  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {}

  getMovies(search: any): void {
    let val: string = search.target.value.trim();
    if (val.length < 3) {
      this.films = Promise.resolve([]);
    } else {
      this.films = this.searchMovies(val);
    }
  }

  async getRandomMovie() {
    this.discoverMovies().then(value => {
      this.film = value[Math.floor(Math.random() * value.length)];
      this.presentAlertRandom();
    });
  }

  private discoverMovies(): Promise<Movie[]> {
    return this.askTMDB("discover", {});
  }
  async presentAlertRandom() {
    const alert = await this.alertController.create({
      header: this.film.title,
      message: this.film.overview,
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary"
        },
        {
          text: "Show Details",
          handler: () => {
            this.showDetails(this.film);
          }
        }
      ]
    });
    await alert.present();
  }

  private searchMovies(search: string): Promise<Movie[]> {
    return this.askTMDB("search", { query: search });
  }

  private async askTMDB(api: string, params: object): Promise<Movie[]> {
    const loading = await this.loadingController.create({
      message: "Please Wait..."
    });
    await loading.present();
    const { results } = await this.http
      .get<TMDBResponse>(`http://api.themoviedb.org/3/${api}/movie`, {
        params: { api_key: apiKey, ...params }
      })
      .toPromise();
    await loading.dismiss();
    return results;
  }

  showDetails(film: Movie): void {
    const navigationExtras: NavigationExtras = {
      state: film
      /*,
      queryParams: {
          'title': film.title,
          'img': film.poster_path,
          'date': film.release_date,
          'overview': film.overview,
      }
      */
    };
    this.router.navigate(["/details"], navigationExtras);
  }
}
