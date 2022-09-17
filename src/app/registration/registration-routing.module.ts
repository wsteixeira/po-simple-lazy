import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { CityEditComponent } from './city/city-edit/city-edit.component';
import { CityListComponent } from './city/city-list/city-list.component';

import { StateDetailComponent } from './state/state-detail/state-detail.component';
import { StateEditComponent } from './state/state-edit/state-edit.component';
import { StateListComponent } from './state/state-list/state-list.component';

const routes: Routes = [
  { path: 'city', component: CityListComponent },
  { path: 'city/detail/:id', component: CityDetailComponent },
  { path: 'city/edit/:id', component: CityEditComponent },
  { path: 'city/new', component: CityEditComponent },
  { path: 'state', component: StateListComponent },
  { path: 'state/detail/:id', component: StateDetailComponent },
  { path: 'state/edit/:id', component: StateEditComponent },
  { path: 'state/new', component: StateEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationRoutingModule {}
