import { Routes } from "@angular/router";
import {LoginComponent} from "../modules/login/login.component";


export const MasterTemplateRoutes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "products",
    children: [
      {
        path: "",
        loadChildren: () => import("../modules/manage-products/manage-products.module").then(m => m.ManageProductsModule)
      }
    ]
  }
];
