import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoTemplatesModule } from '@po-ui/ng-templates';
import { PoModule } from '@po-ui/ng-components';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    PoTemplatesModule,
    PoModule,
    AuthenticationRoutingModule,
  ],
})
export class AuthenticationModule {}
