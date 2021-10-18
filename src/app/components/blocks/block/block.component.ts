import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IRepository } from 'src/app/interfaces/search.interface';
import { GithubApiService } from 'src/app/services/github-api.service';
import {
  faLink, faCodeBranch, IconDefinition, faLongArrowAltRight,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {


  public faLink: IconDefinition = faLink;
  public faCodeBranch: IconDefinition = faCodeBranch;
  public faQuestionCircle: IconDefinition = faQuestionCircle;
  public faLongArrowAltRight: IconDefinition = faLongArrowAltRight;

  @Input() block!: IRepository;
  @Output() addToFavorites = new EventEmitter<IRepository>();
  
  constructor(
    private githubApiService: GithubApiService,
    // public helpersService: HelpersService,
    private router: Router
  ) { }


  ngOnInit() {
    // this.trimName = this.helpersService.trim(this.repo.name, 17);
    // this.trimDescription = this.helpersService.trim(this.repo.description, 100);
  }

  goToInfoPage(): void {
    // this.repo = { ...this.repo, description: this.helpersService.trim(this.repo.description, 200) };
    // this.githubApiService.infoDataSubject.next(this.repo);
    // this.router.navigate([`/item/${this.repo.id}`]);
  }

  public toggleFavorite(): void {
    this.addToFavorites.emit(this.block);
  }

  // get isFavorite(): boolean {
  //   return this.githubApiService.isFavorite(this.block);
  // }

}
