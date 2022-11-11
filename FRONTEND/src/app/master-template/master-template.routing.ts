import {Routes} from "@angular/router";
import {HomeComponent} from "./template/home/home.component";


export const MasterTemplateRoutes: Routes = [
  {
    path: "products",
    children: [
      {
        path: "",
        loadChildren: () => import("../modules/manage-products/manage-products.routing").then(m => m.ManageProductsRouting)
      }
    ],
  },
  {
    path: "users",
    children: [
      {
        path: "",
        loadChildren: () => import("../modules/manage-users/manage-users.routing").then(m => m.ManageUsersRouting)
      }
    ],
  },
  {path: "", redirectTo: 'home', pathMatch: 'full'},
  {
    path: "home",
    component: HomeComponent
  }
];
