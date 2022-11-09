import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManageProductsRoutingModule} from './manage-products-routing.module';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ManageProductsService} from "./manage-products.service";

import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    ProductsListComponent,
  ],
  imports: [
    CommonModule,
    ManageProductsRoutingModule,
    FontAwesomeModule,
    ButtonModule
  ],
  providers: [ManageProductsService]
})
export class ManageProductsModule {
}
