import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { DetailComponent } from './components/detail/detail.component';

import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { BlocksPageComponent } from './pages/blocks-page/blocks-page.component';
import { TablePageComponent } from './pages/table-page/table-page.component';

import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { HeaderComponent } from './components/header/header.component';
import { BlockComponent } from './components/blocks/block/block.component';

import { environment } from '../environments/environment';

import { UserComponent } from './pages/user/user.component';
import { SignInComponent } from './pages/components/sign-in/sign-in.component';
import { SignUpComponent } from './pages/components/sign-up/sign-up.component';

import { AuthService } from './services/auth.service';
import { DashboardComponent } from './pages/components/dashboard/dashboard.component';


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
    BlockComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
  ],
  providers: [
    AngularFirestore,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


