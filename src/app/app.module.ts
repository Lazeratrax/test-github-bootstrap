import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { DetailComponent } from './components/detail/detail.component';

import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { BlocksPageComponent } from './pages/blocks-page/blocks-page.component';
import { TablePageComponent } from './pages/table-page/table-page.component';

import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { HeaderComponent } from './components/header/header.component';
import { BlockComponent } from './components/blocks/block/block.component';

@NgModule({
  declarations: [
    AppComponent,

    TableComponent,
    DetailComponent,

    SearchPanelComponent,
    BlocksPageComponent,
    TablePageComponent,

    DetailPageComponent,
    HeaderComponent,
    BlockComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
