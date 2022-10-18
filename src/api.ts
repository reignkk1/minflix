const API_KEY = "8241c9e572307b4650571632b7266d66";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  name: string;
  first_air_date: string;
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
  overview: string;
}

interface IKey {
  key: string;
}

export interface IGetVideo {
  results: IKey[];
}

export async function getMovie(category: String) {
  return await fetch(
    `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=ko-KR&page=1&region=kr`
  ).then((response) => response.json());
}

export async function getMovieDetail(movieId: string | undefined) {
  return await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export async function getMovieVideo(movieId: string | undefined) {
  return await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export interface IGetTv {
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export async function getTv(category: String) {
  return await fetch(
    `https://api.themoviedb.org/3/tv/${category}?api_key=${API_KEY}&language=ko-KR&page=1`
  ).then((response) => response.json());
}

export async function getTvDetail(movieId: string | undefined) {
  return await fetch(
    `https://api.themoviedb.org/3/tv/${movieId}?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export async function getTvVideo(movieId: string | undefined) {
  return await fetch(
    `https://api.themoviedb.org/3/tv/${movieId}/videos?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export interface ISearch {
  keyword?: string;
}

export async function getSearchMovie(keyword: string | null) {
  return await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${keyword}&page=1&include_adult=false`
  ).then((response) => response.json());
}
