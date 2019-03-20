import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Movie } from '../model/movie';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  films: Movie[] = [{title: 'Alita : Battle Angel'}, {title: 'Mirai, ma petite soeur'}, {title: 'Captain Marvel'}];
  constructor(private readonly router: Router) {}

  navig(film: string): void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          'film': film
      }
  };
    this.router.navigate(['/details'], navigationExtras);
  }
  ngOnInit() {}
}
