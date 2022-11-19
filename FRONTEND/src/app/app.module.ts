import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MasterTemplateComponent} from './master-template/master-template.component';
import {LoginComponent} from './modules/login/login.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {BreadcrumbService} from "./shared/components/breadcrumb/breadcrumb.service";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {httpLoaderFactory} from "./shared/http-loader-factory";
import {PortalService} from "./shared/services/portal.service";
import {ComponentsModule} from "./master-template/template/components.module";
import {BreadcrumbModule} from "./shared/components/breadcrumb/breadcrumb.module";

import {SharedModule} from "./shared/shared.module";
import {CommonModule} from "@angular/common";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {JwtInterceptor} from "./shared/interceptors/jwt.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    MasterTemplateComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    BreadcrumbModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ComponentsModule
  ],
  providers: [
    BreadcrumbService,
    PortalService,
    JwtHelperService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translateService: TranslateService) {
    translateService.use(<string>translateService.getBrowserLang());
    translateService.setDefaultLang('en');
  }
}
