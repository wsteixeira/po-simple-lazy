import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject(false);
  private loggedUser = new BehaviorSubject({});

  public isLoggedIn = this.loggedIn.asObservable();
  public getLoggedUser = this.loggedUser.asObservable();

  constructor() {}

  public login(user: any): void {
    this.loggedIn.next(true);
    this.loggedUser.next(user);
  }

  public logout(): void {
    this.loggedIn.next(false);
    this.loggedUser.next({});
  }
}
