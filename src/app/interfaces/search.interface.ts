export interface ISearchString {
  search_string: string;
}


export interface IRepository {
  id: number;
  name: string;
  full_name: string;
  size: string;
  forks_count: string;
  created_at: string;
  html_url: string;
  description: string;
  stargazers_count: string;
  open_issues_count: string;

  owner: {
    avatar_url: string,
    login: string;
    html_url: string
  };
}
export interface IRepositoryFinite {
  id: number;
  name: string;
  full_name: string;
  size: string;
  forks_count: string;
  created_at: string;
  html_url: string;
  description: string;
  stargazers_count: string;
  open_issues_count: string;
  avatar_url: string,
  login: string;
  urlAuthor: string;
}

export interface IGithubParams {
  q: string;
  page?: number;
  per_page?: number;
}

export interface IReposirotySearchResponse {
  items: IRepository[];
  total_count: number;
}

export const DEFAULT_PARAMS: IGithubParams =
{
  q: '',
  per_page: 20,
  page: 1
};

export const DETAIL_PARAMS =
// аватар, логин, тип пользователя,
// ссылка на профиль.
{
  q: '',
  per_page: 20,
  page: 1,
};

export const QUERY_STRING = '';

export type SortStateType = 'stars' | 'forks' | 'help-wanted-issues';
export type OrderStateType = 'asc' | 'desc';