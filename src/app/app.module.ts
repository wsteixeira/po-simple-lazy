import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { PoI18nConfig, PoI18nModule, PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { generalEn } from './i18n/general-en';
import { generalPt } from './i18n/general-pt';

localStorage.removeItem('PO_DEFAULT_LANGUAGE');
localStorage.removeItem('PO_USER_LOCALE');

localStorage.removeItem('PO_USER_LOGIN');

const i18nConfig: PoI18nConfig = {
  default: {
    //language: 'pt-BR',
    //language: 'en-US',
    //context: 'general',
    //cache: true
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
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    PoI18nModule.config(i18nConfig),
    PoModule,
    PoTemplatesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
