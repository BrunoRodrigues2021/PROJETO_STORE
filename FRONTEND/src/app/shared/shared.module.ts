import {NgModule} from "@angular/core";

import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import {ImageModule} from 'primeng/image';
import {ToastModule} from "primeng/toast";


@NgModule({
  declarations: [ ],
  imports: [
    CardModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    ImageModule,
    ToastModule
  ],
  providers: [],
  exports: [CardModule, ButtonModule, PasswordModule, InputTextModule, ImageModule, ToastModule],
  bootstrap: []
})
export class SharedModule {}
