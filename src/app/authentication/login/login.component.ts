import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Buffer } from 'buffer';

import {
  PoI18nService,
  PoLanguage,
  PoNotificationService,
  PoPageDefaultComponent,
} from '@po-ui/ng-components';
import {
  PoPageLogin,
  PoPageLoginAuthenticationType,
} from '@po-ui/ng-templates';

import { AuthService } from 'src/app/guard/auth.service';
import { LoginService } from './login.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy, OnInit {
  @ViewChild(PoPageDefaultComponent, { static: true })
  home!: PoPageDefaultComponent;

  readonly languages: Array<PoLanguage> = [
    { language: 'pt', description: 'Português' },
    { language: 'en', description: 'English' },
  ];

  literals: any = {};
  logo = './assets/images/po_color_bg.png';

  // true - Login usando o serviço do template
  // false - Login Login usando o serviço local
  // Você pode usuar no formato mais adequado a sua necessidade
  loginTamlateService = true;

  // Login usando o serviço do template
  authenticationUrl!: string;
  authenticationType = PoPageLoginAuthenticationType.Bearer;

  // Login usando o serviço local
  loginErrors: Array<string> = [];
  passwordErrors: Array<string> = [];

  constructor(
    private poI18nService: PoI18nService,
    private appComponet: AppComponent,
    private loginService: LoginService,
    private authService: AuthService,
    private poNotification: PoNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authenticationUrl = this.loginService.getEndpoint();
    this.authService.logout();
    this.setLanguage();
  }

  ngOnDestroy() {
    const userAuth: any = JSON.parse(
      sessionStorage.getItem('PO_USER_LOGIN') || '{}'
    );
    if (userAuth?.user) {
      this.authService.login(userAuth);
    }
    sessionStorage.removeItem('PO_USER_LOGIN');
  }

  // As funções abaixo são apenas para o login usando o serviço local
  checkLogin(formData: PoPageLogin) {
    this.loginService
      .login({
        login: formData.login,
        password: Buffer.from(formData.password).toString('base64'), // encode
      })
      .subscribe({
        next: this.handleResponse.bind(this),
        error: this.handleError.bind(this),
      });
  }

  loginChange() {
    this.loginErrors = [];
  }

  passwordChange() {
    this.passwordErrors = [];
  }

  changeLanguage(language?: PoLanguage) {
    if (language?.language === 'en') {
      this.poI18nService.setLanguage('en-US');
    } else {
      this.poI18nService.setLanguage('pt-BR');
    }
    this.setLanguage();
  }

  setLanguage() {
    if (this.poI18nService.getShortLanguage()) {
      this.poI18nService
        .getLiterals()
        .subscribe((literals) => (this.literals = literals));
      this.appComponet.setMenu();
      this.poNotification.information(
        `${this.literals.youCanUse} - [Login: admin] / [${this.literals.password}: admin]`
      );
    }
  }

  private handleResponse(response: any) {
    sessionStorage.setItem('PO_USER_LOGIN', JSON.stringify(response));
    this.router.navigate(['/']);
  }

  private handleError(error: any) {
    this.loginErrors = error.error.loginWarnings;
    this.passwordErrors = error.error.passwordWarnings;
  }
}
