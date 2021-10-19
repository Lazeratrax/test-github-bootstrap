import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IRepository } from 'src/app/interfaces/search.interface';
import { GithubApiService } from 'src/app/services/github-api.service';
import {
  faLink, IconDefinition, faLongArrowAltRight,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {

  public trimName: string | undefined;

  public faLink: IconDefinition = faLink;
  public faQuestionCircle: IconDefinition = faQuestionCircle;


  @Input() block!: any;
  @Output() addToFavorites = new EventEmitter<IRepository>();
  
  constructor(
    private githubApiService: GithubApiService,
    private router: Router
     // public helpersService: HelpersService,
  ) {
    console.log('XXXXXXX', this);
   }


  ngOnInit() {
    console.log('XXXXXXX', this);
    this.trimName = this.block?.login;
    // this.helpersService.trim(this.repo.name, 17);
    // this.trimDescription = this.helpersService.trim(this.repo.description, 100);
  }

  goToDetailPage(): void {
    // this.repo = { ...this.repo, description: this.helpersService.trim(this.repo.description, 200) };
    // this.githubApiService.infoDataSubject.next(this.repo);
    this.router.navigate([`/detail/${this.block.login}`]);
  }

  public toggleFavorite(): void {
    this.addToFavorites.emit(this.block);
  }

  // get isFavorite(): boolean {
  //   return this.githubApiService.isFavorite(this.block);
  // }

}
