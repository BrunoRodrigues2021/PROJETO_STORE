import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManageProductsRoutingModule} from './manage-products-routing.module';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ManageProductsService} from "./manage-products.service";

import {ButtonModule} from 'primeng/button';
import {PortalService} from "../../shared/portal.service";
import { ProductsAddComponent } from './components/products-add/products-add.component';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsAddComponent,
  ],
  imports: [
    CommonModule,
    ManageProductsRoutingModule,
    FontAwesomeModule,
    ButtonModule
  ],
  providers: [ManageProductsService, PortalService]
})
export class ManageProductsModule {
}
