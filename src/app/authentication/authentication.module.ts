import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoTemplatesModule } from '@po-ui/ng-templates';
import { PoModule } from '@po-ui/ng-components';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';

@NgModule({
  declarations: [
    LoginComponent,
    UserEditComponent,
    UserListComponent,
    UserDetailComponent,
  ],
  imports: [
    CommonModule,
    PoTemplatesModule,
    PoModule,
    AuthenticationRoutingModule,
  ],
})
export class AuthenticationModule {}
