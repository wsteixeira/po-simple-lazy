import { Injectable } from '@angular/core';
import { PoSelectOption } from '@po-ui/ng-components';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private endpoint = `${environment.apiURL}/api/v1/states`;

  constructor() { }

  getEndpoint(): string {
    return this.endpoint;
  }

  getRegions(): Array<PoSelectOption> {
    return [
      { value: 'Central',	label: 'Central' },
      { value: 'East',	label: 'East' },
      { value: 'South',	label: 'South' },
      { value: 'West', label: 'West' },
    ];
  }

}
