import {NavbarComponent} from './navbar/navbar.component';
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MenubarModule} from "primeng/menubar";
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {AvatarModule} from 'primeng/avatar';
import {TieredMenuModule} from 'primeng/tieredmenu';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MenubarModule,
    AvatarModule,
    OverlayPanelModule,
    TieredMenuModule
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class ComponentsModule {
}
