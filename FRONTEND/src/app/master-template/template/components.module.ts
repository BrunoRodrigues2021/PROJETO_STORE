import {NavbarComponent} from './navbar/navbar.component';
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MenubarModule} from "primeng/menubar";
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {AvatarModule} from 'primeng/avatar';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {HomeComponent} from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MenubarModule,
    AvatarModule,
    OverlayPanelModule,
    TieredMenuModule,
    ToastModule
  ],
  providers: [MessageService],
  declarations: [NavbarComponent, HomeComponent],
  exports: [NavbarComponent]
})
export class ComponentsModule {
}
