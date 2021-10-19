import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { GithubApiService } from 'src/app/services/github-api.service';
import {
  faLink, IconDefinition, faLongArrowAltRight,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements OnInit {
  public form!: FormGroup;

  fields = {
    q: '',
  };

  public faLink: IconDefinition = faLink;
  public faQuestionCircle: IconDefinition = faQuestionCircle;
  public faLongArrowAltRight: IconDefinition = faLongArrowAltRight;

  public disableCheckbox = true;
  public blocks$: Observable<any> | undefined;
  public searchStringState: string = '';
  
  constructor(
    public githubApiService: GithubApiService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
  
    this.githubApiService.possibilityFilter.subscribe(res => {
      this.disableCheckbox = !res;
    });

    this.blocks$ = this.githubApiService.getPageParams().pipe(
      switchMap(({  ...params }) => {
        console.log('isFavorite, ...params', params);
        if (!params.q) return of();
        return this.githubApiService.getUsers(params)
          .pipe(
            tap((data: any) => {console.log('data', data);}),
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

  goToDetailPage(login: string) {
    this.router.navigate([`/detail/${login}`]);
  }

}
