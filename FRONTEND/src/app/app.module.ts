import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './master-template/base/components.module';
import { MasterTemplateComponent } from './master-template/master-template.component';
import { LoginComponent } from './modules/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*PRIMENG COMPONENTS IMPORTS*/
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ImageModule } from 'primeng/image';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    AppComponent,
    MasterTemplateComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    CardModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    ImageModule,
    BreadcrumbModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
