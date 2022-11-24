import {Routes} from "@angular/router";
import {HomeComponent} from "./template/home/home.component";
import {Error404Component} from "./template/errors/error404/error404.component";


export const MasterTemplateRoutes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "error404",
    component: Error404Component
  },
  {
    path: "products",
    children: [
      {
        path: "",
        loadChildren: () => import("../modules/manage-products/manage-products.module").then(m => m.ManageProductsModule)
      }
    ],
  },
  {
    path: "users",
    children: [
      {
        path: "",
        loadChildren: () => import("../modules/manage-users/manage-users.module").then(m => m.ManageUsersModule)
      }
    ],
  },
  // {
  //   path: "",
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  // {
  //   path: "**",
  //   redirectTo: 'error404',
  //   pathMatch: 'full'
  // },

];
