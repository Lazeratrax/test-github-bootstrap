import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-basic',
  templateUrl: './nav-basic.component.html',
  styleUrls: ['./nav-basic.component.scss']
})
export class NavBasicComponent implements OnInit {
  active = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
