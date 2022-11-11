import { MasterTemplateComponent } from './master-template/master-template.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./modules/login/login.component";


const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "portal",
    redirectTo: "portal",
    pathMatch: "full"
  },
  {
    path: "portal",
    component: MasterTemplateComponent,
    children: [
      {
        path: "",
        loadChildren: () => import("./master-template/master-template.module").then(m => m.MasterTemplateModule)
      }
    ]
  },
  {
    path: "**",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
