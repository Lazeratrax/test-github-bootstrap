import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
// import { IGithubParams, IReposirotySearchResponse, IRepository } from '../interfaces/interfaces';
// import * as Variables from '../variables';
import * as Variables from '../variables';
import { DEFAULT_PARAMS, IGithubParams, IReposirotySearchResponse, OrderStateType, SortStateType } from "../interfaces/search.interface";


@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  public stateSortList: SortStateType[] = ['stars', 'forks', 'help-wanted-issues'];
  public stateOrderList: OrderStateType[] = ['asc', 'desc'];
  public possibilityFilter = new BehaviorSubject<boolean>(false);
  public searchString = new BehaviorSubject<string>('');
  public repoSubjectSource: BehaviorSubject<IGithubParams> = new BehaviorSubject<IGithubParams>(DEFAULT_PARAMS);

  constructor(
    private _http: HttpClient
  ) { }

  updateSearchString(str: string) {
    // return str;
  }

  public getPageParams(): Observable<IGithubParams> {
    return this.repoSubjectSource.asObservable();
  }

  public getRepositories(params?: any) {
    params = {
      q: params.q,
      ...(params.sort ? { sort: params.sort } : ''),
      ...(params.order ? { order: params.order } : ''),
      per_page: params.per_page,
      page: params.page
    }

    // this.canLoadMore = this.repoSubjectSource.getValue().q.length <= 0;
    return this._http.get<IReposirotySearchResponse>(`${Variables.ADRESS}`, { params })
      .pipe(
        debounceTime(400),
        map((result) => {
          return {
            page: params.page,
            per_page: params.per_page,
            total_count: result.total_count,
            items: result.items.map((item: any) => {
              return {
                id: item.id,
                name: item.name,
                full_name: item.full_name,
                size: item.size,
                forks_count: item.forks_count,
                created_at: item.created_at,
                html_url: item.html_url,
                description: item.description,
                stargazers_count: item.stargazers_count,
                open_issues_count: item.open_issues_count,
                avatar_url: item.owner.avatar_url,
                login: item.owner.login,
                urlAuthor: item.owner.html_url,
              }
            })
          }
        })
      )
  }
  // Partial<any>
  public updateFilters(filters: any): void {
    // this.storedRepo = [];
    let params = this.repoSubjectSource.getValue();
    console.log('XXXXX', filters, params );
    this.repoSubjectSource
      .next({
        ...DEFAULT_PARAMS,
        ...(filters ? {q: filters} : '')
        // ...(filters.data ? { q: DEFAULT_PARAMS.q + filters.data } : params.q ? { q: params.q } : ''),
        // ...(filters.order ? { order: filters.order } : params.q.length > 1 && params.order ? { order: params.order } : ''),
        // ...(filters.sort ? { sort: filters.sort } : params.q.length > 1 && params.sort ? { sort: params.sort } : '')
      });
  }
}