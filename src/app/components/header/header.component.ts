import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = '';

  navbarOpen = false;
  public faSignOutAlt: IconDefinition = faSignOutAlt;
  public faUser: IconDefinition = faUser;
  
  constructor(public authService: AuthService) { }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
