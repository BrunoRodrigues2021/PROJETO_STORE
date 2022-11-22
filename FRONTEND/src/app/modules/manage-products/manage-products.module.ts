import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManageProductsRoutingModule} from './manage-products-routing.module';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {ProductsAddComponent} from './components/products-add/products-add.component';
import {ProductsDetailsComponent} from './components/products-details/products-details.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ManageProductsService} from "./manage-products.service";

import {PortalService} from "../../shared/services/portal.service";
import {SharedModule} from "../../shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {CurrencyExchangePipe} from "../../shared/pipes/currency-exchange.pipe";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsAddComponent,
    ProductsDetailsComponent,
  ],
    imports: [
        CommonModule,
        ManageProductsRoutingModule,
        FontAwesomeModule,
        SharedModule,
        TranslateModule,
        FormsModule
    ],
  providers: [
    ManageProductsService,
    PortalService,
    CurrencyExchangePipe
  ]
})
export class ManageProductsModule {
}
