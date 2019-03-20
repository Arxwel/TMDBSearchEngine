import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Movie } from '../model/movie';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  movie: string;
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.movie = params['film'] ;
  });
   }

  ngOnInit() {
  }

}
