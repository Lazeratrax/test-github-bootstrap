import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, Observable, switchMap } from 'rxjs';
import { GithubApiService } from 'src/app/services/github-api.service';

@UntilDestroy()
@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {

  public user$: Observable<any> | undefined;
  public parameter: string | undefined;
  obj: any;
  constructor(
    public api: GithubApiService,
    private route: ActivatedRoute
  ) {
    this.route.params
      .subscribe({
        next: ({ id }) => {
          this.parameter = id;
          // api.getUserInfo(id) 
        }
      })
  }

  ngOnInit(): void {
    console.log('thissssss', this);
    // this.user$ =
    this.route.params
      .pipe(
        switchMap(({ id }) => { return this.api.getUserInfo(id); }),
        untilDestroyed(this)
      )
      .subscribe((res) => { console.log('resss', res); this.obj = res;})
  }

}
