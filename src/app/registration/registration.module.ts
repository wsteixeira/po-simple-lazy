import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoTemplatesModule } from '@po-ui/ng-templates';
import { PoModule } from '@po-ui/ng-components';

import { RegistrationRoutingModule } from './registration-routing.module';

import { StateDetailComponent } from './state/state-detail/state-detail.component';
import { StateEditComponent } from './state/state-edit/state-edit.component';
import { StateListComponent } from './state/state-list/state-list.component';

@NgModule({
  declarations: [StateDetailComponent, StateEditComponent, StateListComponent],
  imports: [
    CommonModule,
    PoTemplatesModule,
    PoModule,
    RegistrationRoutingModule,
  ],
})
export class RegistrationModule {}
