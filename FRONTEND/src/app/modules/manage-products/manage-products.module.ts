import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {ManageProductsRoutingModule} from './manage-products-routing.module';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {ProductsAddComponent} from './components/products-add/products-add.component';
import {ProductsDetailsComponent} from './components/products-details/products-details.component';
import {ManageProductsService} from "./manage-products.service";

import {PortalService} from "../../shared/services/portal.service";
import {SharedModule} from "../../shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {CurrencyExchangePipe} from "../../shared/pipes/currency-exchange.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RoundPipe} from "../../shared/pipes/round-value.pipe";


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsAddComponent,
    ProductsDetailsComponent,
  ],
    imports: [
        CommonModule,
        ManageProductsRoutingModule,
        SharedModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [
    ManageProductsService,
    PortalService,
    CurrencyExchangePipe,
    DatePipe,
    RoundPipe
  ]
})
export class ManageProductsModule {
}
