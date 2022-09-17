import { Injectable } from '@angular/core';
import { PoSelectOption } from '@po-ui/ng-components';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private endpoint = `${environment.apiURL}/api/v1/cities`;

  constructor() {}

  getEndpoint(): string {
    return this.endpoint;
  }
}
