import { Routes } from "@angular/router";
import {HomeComponent} from "./template/home/home.component";


export const MasterTemplateRoutes: Routes = [
  {
    path: "products",
    children: [
      {
        path: "",
        loadChildren: () => import("../modules/manage-products/manage-products.module").then(m => m.ManageProductsModule)
      }
    ]
  },
  {path: "", redirectTo: 'home', pathMatch: 'full'},
  {
    path: "home",
    component: HomeComponent
  }
];
