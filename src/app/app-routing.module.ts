import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberDetailComponent } from './components/member-list/member-detail/member-detail.component';
import { ListsComponent } from './components/lists/lists.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AuthGuard } from './guards/auth.guard';
import { TestErrorComponent } from './components/test-error/test-error.component';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'members',
        component: MemberListComponent,
        canActivate: [AuthGuard],
      },
      { path: 'members/:id', component: MemberDetailComponent },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent },
    ],
  },
  { path: 'errors', component: TestErrorComponent },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
