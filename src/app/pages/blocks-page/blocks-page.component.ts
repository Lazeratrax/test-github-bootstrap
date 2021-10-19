import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { GithubApiService } from 'src/app/services/github-api.service';

@UntilDestroy()
@Component({
  selector: 'app-blocks-page',
  templateUrl: './blocks-page.component.html',
  styleUrls: ['./blocks-page.component.scss'],
})
export class BlocksPageComponent implements OnInit {
  public form!: FormGroup;

  fields = {
    q: '',
  };

  public disableCheckbox = true;
  public repos$: Observable<any> | undefined;
  public searchStringState: string = '';
 
  constructor(
   public githubApiService: GithubApiService,
   private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.githubApiService.possibilityFilter.subscribe(res => {
      this.disableCheckbox = !res;
    });

    this.repos$ = this.githubApiService.getPageParams().pipe(
      // isFavorite,
      switchMap(({  ...params }) => {
        // if (isFavorite) {
        //   return of(this.githubApiService.getFavoritesRepo());
        // }
        console.log('isFavorite, ...params', params);
        if (!params.q) return of();
        return this.githubApiService.getUsers(params)
          .pipe(
            tap((data: any) => {
              console.log('data', data);
              // this.githubApiService.updateStoredNextPageToken(data.page);
            }),
            map((data: any) => this.githubApiService.updatestoredRepo(data.items))
          );
      }),
    untilDestroyed(this)
    );

    this.formInit();
    
  }

  formInit() {
    this.form = this.fb.group(this.githubApiService.repoSubjectSource.getValue());
  }

  updateSearchString(str: string): void {
    // if (typeof data === 'string') { data = { data } };
    // this.githubApiService.updateSearchString(str);
  }

  updateFilters(data: string): void {
    // if (typeof data === 'string') { data = { data } };
    console.log('data',data);
    this.githubApiService.updateFilters(data);
  }

}
