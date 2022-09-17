import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private endpoint = `${environment.apiURL}/api/v1/users/authentication`;

  private readonly headers: HttpHeaders = new HttpHeaders({
    'X-PO-SCREEN-LOCK': 'true',
  });

  constructor(private http: HttpClient) {}

  public getEndpoint(): string {
    return this.endpoint;
  }

  public login(resource: any): Observable<any> {
    return this.http.post(`${this.endpoint}`, resource, {
      headers: this.headers,
    });
  }
}
