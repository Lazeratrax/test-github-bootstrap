export interface ISearchString {
  search_string: string;
}
export interface IUserItem {
  avatar_url: string;
  html_url: string;
  id: number;
  login: string;
  type: string;
}
export interface IGithubParams {
  q: string;
  page?: number;
  per_page?: number;
}
export interface IGetUsers {
  page: number;
  per_page:number;
  total_count:number;
  items: IUserItem[];
}
