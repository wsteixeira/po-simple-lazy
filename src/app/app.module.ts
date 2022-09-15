import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { TranslateModule } from '@ngx-translate/core';

import { PoI18nConfig, PoI18nModule, PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { LoginComponent } from './login/login.component';

import { generalEn } from './i18n/general-en';
import { generalPt } from './i18n/general-pt';
import { LocaleProvider } from './shared/locale.provider';

localStorage.removeItem('PO_DEFAULT_LANGUAGE');
localStorage.removeItem('PO_USER_LOCALE');

const i18nConfig: PoI18nConfig = {
  default: {
    //    language: 'pt-BR',
    //    context: 'general',
    //    cache: true
  },
  contexts: {
    general: {
      'pt-BR': generalPt,
      'en-US': generalEn,
    },
  },
};

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    PoI18nModule.config(i18nConfig),
    PoModule,
    PoTemplatesModule,
    TranslateModule.forRoot(),
  ],
  providers: [
    //  { provide: LOCALE_ID, useValue: navigator.language },
    //  { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    LocaleProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
