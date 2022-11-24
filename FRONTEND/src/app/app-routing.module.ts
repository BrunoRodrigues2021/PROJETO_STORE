import {MasterTemplateComponent} from './master-template/master-template.component';
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./modules/login/login.component";
import {AuthGuard} from "./shared/guards/auth.guard";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  // {
  //   path: "",
  //   redirectTo: "home",
  //   pathMatch: "full"
  // },
  {
    path: "",
    component: MasterTemplateComponent,
    children: [
      {
        path: "",
        loadChildren: () => import("./master-template/master-template.module").then(m => m.MasterTemplateModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  // {
  //   path: "**",
  //   redirectTo: "login",
  //   pathMatch: "full"
  // },
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
