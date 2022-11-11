import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsListComponent} from "./components/products-list/products-list.component";
import {ProductsAddComponent} from "./components/products-add/products-add.component";

const routes: Routes = [
  {path: '', component: ProductsListComponent},
  {path: 'create', component: ProductsAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ManageProductsRouting { }
