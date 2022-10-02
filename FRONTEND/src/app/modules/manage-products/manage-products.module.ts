import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManageProductsRoutingModule} from './manage-products-routing.module';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {IconPipe} from "../../shared/pipes/icon.pipe";
import {ManageProductsService} from "./manage-products.service";

import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    ProductsListComponent,
    IconPipe
  ],
  imports: [
    CommonModule,
    ManageProductsRoutingModule,
    FontAwesomeModule,
    ButtonModule
  ],
  exports: [IconPipe],
  providers: [ManageProductsService]
})
export class ManageProductsModule {
}
