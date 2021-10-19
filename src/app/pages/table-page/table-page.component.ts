import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { GithubApiService } from 'src/app/services/github-api.service';
import {
  faLink, IconDefinition, faLongArrowAltRight,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';

import { IGetUsers } from 'src/app/interfaces/search.interface';

@UntilDestroy()
@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements OnInit {
  public form!: FormGroup;

  public faLink: IconDefinition = faLink;
  public faQuestionCircle: IconDefinition = faQuestionCircle;
  public faLongArrowAltRight: IconDefinition = faLongArrowAltRight;

  public blocks$: Observable<any> | undefined;
  public searchStringState: string = '';

  constructor(
    public githubApiService: GithubApiService,
    private _fb: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit(): void {

    this.blocks$ = this.githubApiService.getPageParams().pipe(
      switchMap(({ ...params }) => {
        if (!params.q) return of();
        return this.githubApiService.getUsers(params)
          .pipe(map((data: IGetUsers) => this.githubApiService.updatestoredRepo(data.items)));
      }),
      untilDestroyed(this)
    );

    this.formInit();
  }

  formInit() {
    this.form = this._fb.group(this.githubApiService.repoSubjectSource.getValue());
  }

  updateFilters(data: string): void {
    this.githubApiService.updateFilters(data);
  }

  goToDetailPage(login: string) {
    this._router.navigate([`/detail/${login}`]);
  }

}
