import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = '';

  navbarOpen = false;

  
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    console.log('this11111', this);
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
