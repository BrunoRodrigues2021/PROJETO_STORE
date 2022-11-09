import { Routes } from "@angular/router";


export const MasterTemplateRoutes: Routes = [
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
