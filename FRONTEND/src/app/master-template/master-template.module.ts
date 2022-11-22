import {NgModule} from '@angular/core';
import {MasterTemplateRoutes} from './master-template-routing.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(MasterTemplateRoutes),
    HttpClientModule,
  ],
  providers: [],
  exports: []
})

export class MasterTemplateModule {}
