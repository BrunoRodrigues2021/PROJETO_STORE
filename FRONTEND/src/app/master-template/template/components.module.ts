import {NavbarComponent} from './navbar/navbar.component';
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {HomeComponent} from './home/home.component';
import {Error404Component} from './errors/error404/error404.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  providers: [],
  declarations: [NavbarComponent, HomeComponent, Error404Component],
  exports: [NavbarComponent]
})
export class ComponentsModule {
}
