import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorsComponent} from "./errors.component";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [ErrorsComponent],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [ErrorsComponent]
})
export class ErrorsModule { }
