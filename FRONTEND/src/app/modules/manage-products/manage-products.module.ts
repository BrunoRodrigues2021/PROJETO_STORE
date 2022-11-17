import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManageProductsRouting} from './manage-products.routing';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {ProductsAddComponent} from './components/products-add/products-add.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ManageProductsService} from "./manage-products.service";

import {ButtonModule} from 'primeng/button';
import {PortalService} from "../../shared/portal.service";
import {SharedModule} from "../../shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {CurrencyExchangePipe} from "../../shared/pipes/currency-exchange.pipe";


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsAddComponent,
  ],
  imports: [
    CommonModule,
    ManageProductsRouting,
    FontAwesomeModule,
    ButtonModule,
    SharedModule,
    TranslateModule
  ],
  providers: [
    ManageProductsService,
    PortalService,
    CurrencyExchangePipe
  ]
})
export class ManageProductsModule {
}
