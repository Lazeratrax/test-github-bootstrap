import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { BlocksPageComponent } from './pages/blocks-page/blocks-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { PageNotFoundComponent } from './pages/not-found-page/not-found-page.component';
import { TablePageComponent } from './pages/table-page/table-page.component';



// const routes: Routes = [];

const routes: Route[] = [
  { path: 'blocks', component: BlocksPageComponent},
  { path: 'table', component: TablePageComponent },
  // { path: 'detail/:id', component: DetailPageComponent },
  { path: 'detail', component: DetailPageComponent },
  { path: '**', component: PageNotFoundComponent },
  { path: '', redirectTo: '/blocks', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
