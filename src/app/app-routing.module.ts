import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: 'home', component: HomeComponent },
  {
    path: 'user',
    canActivate: [AuthGuard],
    component: UserListComponent,
  },
  {
    path: 'user/detail/:id',
    canActivate: [AuthGuard],
    component: UserDetailComponent,
  },
  {
    path: 'user/edit/:id',
    canActivate: [AuthGuard],
    component: UserEditComponent,
  },
  { path: 'user/new', component: UserEditComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
