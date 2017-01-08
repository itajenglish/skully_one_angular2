import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from './movie';
import { MovieService } from './movie.service';

@Component({
  moduleId: module.id,
  selector: 'my-movies',
  templateUrl: 'movies.component.html',
  styleUrls: ['movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  selectedMovie: Movie;
  addingMovie = false;
  error: any;

  constructor(
    private router: Router,
    private movieService: MovieService) { }

  getMovies(): void {
    this.movieService
      .getMovies()
      .then(movies => this.movies = movies)
      .catch(error => this.error = error);
  }

  addmovie(): void {
    this.addingMovie = true;
    this.selectedMovie = null;
  }

  close(savedmovie: movie): void {
    this.addingMovie = false;
    if (savedMovie) { this.getMovies(); }
  }

  deletemovie(movie: movie, event: any): void {
    event.stopPropagation();
    this.movieService
      .delete(movie)
      .then(res => {
        this.movies = this.movies.filter(h => h !== movie);
        if (this.selectedMovie === movie) { this.selectedMovie = null; }
      })
      .catch(error => this.error = error);
  }

  ngOnInit(): void {
    this.getMovies();
  }

  onSelect(movie: Movie): void {
    this.selectedMovie = movie;
    this.addingMovie = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedMovie.id]);
  }
}
