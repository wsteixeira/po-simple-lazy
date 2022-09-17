import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoTemplatesModule } from '@po-ui/ng-templates';
import { PoModule } from '@po-ui/ng-components';

import { RegistrationRoutingModule } from './registration-routing.module';

import { StateDetailComponent } from './state/state-detail/state-detail.component';
import { StateEditComponent } from './state/state-edit/state-edit.component';
import { StateListComponent } from './state/state-list/state-list.component';
import { CityListComponent } from './city/city-list/city-list.component';
import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { CityEditComponent } from './city/city-edit/city-edit.component';

@NgModule({
  declarations: [
    StateDetailComponent,
    StateEditComponent,
    StateListComponent,
    CityListComponent,
    CityDetailComponent,
    CityEditComponent,
  ],
  imports: [
    CommonModule,
    PoTemplatesModule,
    PoModule,
    RegistrationRoutingModule,
  ],
})
export class RegistrationModule {}
