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
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {httpLoaderFactory} from "./shared/http-loader-factory";
import {PortalService} from "./shared/portal.service";
import {ComponentsModule} from "./master-template/template/components.module";
import {BreadcrumbModule} from "./shared/components/breadcrumb/breadcrumb.module";

import {SharedModule} from "./shared/shared.module";
import {CommonModule} from "@angular/common";

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
    ComponentsModule,
  ],
  providers: [BreadcrumbService, PortalService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translateService: TranslateService) {
    translateService.use(<string>translateService.getBrowserLang());
    translateService.setDefaultLang('en');
  }
}
