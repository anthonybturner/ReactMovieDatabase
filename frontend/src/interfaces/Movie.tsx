export interface Movie {
  popularity: any;
  original_language: any;
  original_title: string;
  runtime: any;
  vote_average: any;
  id: number;
  title: string;
  overview?: string;
  poster_path?: string;
  url: string;
  release_date: string;
  // add more fields depending on API response
}
