import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManageProductsRouting} from './manage-products.routing';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {ProductsAddComponent} from './components/products-add/products-add.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ManageProductsService} from "./manage-products.service";

import {ButtonModule} from 'primeng/button';
import {PortalService} from "../../shared/services/portal.service";
import {SharedModule} from "../../shared/shared.module";
import {TranslateModule} from "@ngx-translate/core";
import {CurrencyExchangePipe} from "../../shared/pipes/currency-exchange.pipe";
import {FormsModule} from "@angular/forms";
import { ProductsDetailsComponent } from './products-details/products-details.component';


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsAddComponent,
    ProductsDetailsComponent,
  ],
    imports: [
        CommonModule,
        ManageProductsRouting,
        FontAwesomeModule,
        ButtonModule,
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
