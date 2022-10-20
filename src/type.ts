export interface IGetTv {
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  name: string;
  overview: string;
  release_date: string;
  first_air_date: string;
}

export interface IGetMovies {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
export interface IGetDetail {
  genres: IGenres[];
  runtime: number;
  tagline: string;
  overview: string;
}

interface IGenres {
  id: number;
  name: string;
}

export interface IGetVideo {
  results: IKey[];
}

interface IKey {
  key: string;
}

export interface ISearch {
  keyword?: string;
}
