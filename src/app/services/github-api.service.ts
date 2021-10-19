import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import * as Variables from '../variables';
import { DEFAULT_PARAMS, IGithubParams, IReposirotySearchResponse, IRepository, OrderStateType, SortStateType } from '../interfaces/search.interface';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  private storedRepo = [];
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

  public getUsers(params?: any) {
    console.log('params', params);
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
          console.log('result', result);
          return {
            page: params.page,
            per_page: params.per_page,
            total_count: result.total_count,
            items: result.items.map((item: any) => {
              return {
                id: item.id,
                login: item.login,
                avatar_url: item.avatar_url,
                type: item.type,
                html_url: item.html_url
              }
            })
          }
        })
      )
  }
  // IRepository[] | 
  public updatestoredRepo(repositories: []): any[] {
    return this.storedRepo = this.storedRepo.concat(repositories);
  }

  public updateFilters(str: string): void {
    // this.storedRepo = [];
    let params = this.repoSubjectSource.getValue();
    console.log('XXXXX', str, params);
    this.repoSubjectSource
      .next({
        ...DEFAULT_PARAMS,
        ...(str ? { q: str } : '')
      });
  }


  // for detail page

  public getUserInfo(parameter?: string) {

    console.log('params', parameter);

    return this._http.get<any>(`${Variables.ADRESS_USER}` + parameter)
      .pipe(
        debounceTime(300),
        map((result) => {
          console.log('result', result);
          return {
            id: result.id,
            avatar_url: result.avatar_url,
            login: result.login,
            url: result.url,
            html_url: result.html_url,
            type: result.type
          }
        }
        )
      )
  }
}