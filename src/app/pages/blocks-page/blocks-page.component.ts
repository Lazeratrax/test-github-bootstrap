import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable, of, switchMap } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';
import { GithubApiService } from 'src/app/services/github-api.service';
import { IGetUsers } from 'src/app/interfaces/search.interface';

@UntilDestroy()
@Component({
  selector: 'app-blocks-page',
  templateUrl: './blocks-page.component.html',
  styleUrls: ['./blocks-page.component.scss'],
})
export class BlocksPageComponent implements OnInit {

  public form!: FormGroup;

  public blocks$: Observable<any> | undefined;
  public searchStringState: string = '';

  constructor(
    public api: GithubApiService,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.blocks$ = this.api.getPageParams().pipe(
      switchMap(({ ...params }) => {
        if (!params.q) return of();
        return this.api.getUsers(params)
          .pipe(
            map((data:IGetUsers) =>
              this.api.updatestoredRepo(data.items)
              )
          );
      }),
    );

    this.formInit();
  }

  formInit(): void {
    this.form = this._fb.group(this.api.repoSubjectSource.getValue());
  }

  updateFilters(data: string): void {
    this.api.updateFilters(data);
  }

}
