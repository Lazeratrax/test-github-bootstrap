import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import * as Variables from '../variables';
import { IGetUsers, IGithubParams, IUserItem } from '../interfaces/search.interface';


@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  public searchString = new BehaviorSubject<string>('');
  public repoSubjectSource: BehaviorSubject<IGithubParams> = new BehaviorSubject<IGithubParams>(Variables.DEFAULT_PARAMS);
  private storedRepo: IUserItem[] = [];

  constructor(
    private _http: HttpClient
  ) { }

  public getPageParams(): Observable<IGithubParams> {
    return this.repoSubjectSource.asObservable();
  }

  public getUsers(githubParams: IGithubParams): Observable<any> {

    let params = new HttpParams()
      .set('q', githubParams.q)
      .set('per_page', String(githubParams.per_page))
      .set('page', String(githubParams.page));

    return this._http.get<any>(`${Variables.ADRESS}`, { params })
      .pipe(
        debounceTime(400),
        map((result) => {
          return {
            page: githubParams.page,
            per_page: githubParams.per_page,
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

  public updatestoredRepo(repositories: IUserItem[]): IUserItem[] {
    return this.storedRepo = repositories;
  }

  public updateFilters(str: string): void {
    let params = this.repoSubjectSource.getValue();
    this.repoSubjectSource
      .next({
        ...Variables.DEFAULT_PARAMS,
        ...(str ? { q: str } : '')
      });
  }


  // for detail page

  public getUserInfo(parameter?: string) {
    return this._http.get<any>(`${Variables.ADRESS_USER}` + parameter)
      .pipe(
        debounceTime(300),
        map((result) => {
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