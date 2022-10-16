const API_KEY = "8241c9e572307b4650571632b7266d66";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
}

export interface IGetMovies {
  dates: { maximun: string; minimum: string };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

interface IGenres {
  id: number;
  name: string;
}

export interface IGetDetail {
  genres: IGenres[];
  runtime: number;
  tagline: string;
}

interface IKey {
  key: string;
}

export interface IGetVideo {
  results: IKey[];
}

export function getMovie(category: String) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
  ).then((response) => response.json());
}

export function getMovieDetail(movieId: string | undefined) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function getMovieVideo(movieId: string | undefined) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}
