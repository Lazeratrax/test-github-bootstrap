import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Observable } from 'rxjs';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { GithubApiService } from 'src/app/services/github-api.service';

@UntilDestroy()
@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {

  public searchingType = 'default';
  public trimName: string | undefined;
  public trimDescription: string | undefined;
  public faSearch: IconDefinition = faSearch;
  public searchControl = new FormControl('');

  @Input() placeholder: string = $localize`Search`;
  @Output() searchTermChanded = new EventEmitter<string>();

  constructor(
    private _api: GithubApiService
  ) { }

  ngOnInit(): void {
    this.searchControlChanges()
      .subscribe({
        next: (data: string) => {
          if (this.searchingType !== 'default') {
            this.searchTermChanded.emit(data);
          }
        }
      })
  }

  getDataDefaultMode(): void {
    this.searchTermChanded.emit(this.searchControl.value);
  }

  searchControlChanges(): Observable<string> {
    return this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      filter((query: string) => query?.length > 1),
      untilDestroyed(this)
    )
  }

  searchingSwitcher(param: string): void {
    this.searchControl.setValue('');
    this.searchingType = param;
  }
}


