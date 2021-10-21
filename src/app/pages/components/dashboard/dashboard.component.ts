import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { faSearch, IconDefinition, faSignOutAlt, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public faSignOutAlt: IconDefinition = faSignOutAlt;
  public faUser: IconDefinition = faUser;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
