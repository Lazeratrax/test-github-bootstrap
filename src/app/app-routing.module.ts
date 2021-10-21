import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BlocksPageComponent } from './pages/blocks-page/blocks-page.component';
import { DashboardComponent } from './pages/components/dashboard/dashboard.component';

import { SignInComponent } from './pages/components/sign-in/sign-in.component';
import { SignUpComponent } from './pages/components/sign-up/sign-up.component';

import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { PageNotFoundComponent } from './pages/not-found-page/not-found-page.component';
import { TablePageComponent } from './pages/table-page/table-page.component';

// const routes: Routes = [];

const routes: Route[] = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'blocks', component: BlocksPageComponent, canActivate: [AuthGuard]},
  { path: 'table', component: TablePageComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: DetailPageComponent, canActivate: [AuthGuard] },

  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },

  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] },
  // { path: '**', component: BlocksPageComponent, canActivate: [AuthGuard] },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
