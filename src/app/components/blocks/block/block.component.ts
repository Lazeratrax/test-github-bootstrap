import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {faLink, IconDefinition, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { IUserItem } from 'src/app/interfaces/search.interface';
@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent {

  public faLink: IconDefinition = faLink;
  public faQuestionCircle: IconDefinition = faQuestionCircle;

  @Input() block!: IUserItem;
  
  constructor (
    private _router: Router
  ) { }

  goToDetailPage(): void {
    this._router.navigate([`/detail/${this.block.login}`]);
  }

}
