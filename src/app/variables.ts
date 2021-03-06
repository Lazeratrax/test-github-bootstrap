import { IGithubParams } from "./interfaces/search.interface";

export const ADRESS: string = `https://api.github.com/search/users`;

export const ADRESS_USER: string = `https://api.github.com/users/`;

export const PAGE_SIZE: number = 10;
export const MAX_RESULTS = PAGE_SIZE;

export const PART: string = `snippet`;
export const QUERY: string = ``;

export const IS_FAVORITE: boolean = false;
export const PAGE_TOKEN: string = ``;

export const FAVORITE_REPO_LS_KEY: string = 'favorite-repo';

export const DEFAULT_PARAMS: IGithubParams =
{
  q: '',
  per_page: 20,
  page: 1
};

export const DETAIL_PARAMS =
{
  q: '',
  per_page: 20,
  page: 1,
};
export const QUERY_STRING = '';