import {NavbarComponent} from './navbar/navbar.component';
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MenubarModule} from "primeng/menubar";

@NgModule({
  imports: [CommonModule, RouterModule, MenubarModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class ComponentsModule {
}
