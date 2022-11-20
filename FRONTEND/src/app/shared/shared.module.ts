import {NgModule} from "@angular/core";
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import {ImageModule} from 'primeng/image';
import {ToastModule} from "primeng/toast";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {MenubarModule} from "primeng/menubar";
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {AvatarModule} from 'primeng/avatar';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {ConfirmationService, MessageService} from "primeng/api";
import {TableModule} from "primeng/table";
import {CurrencyExchangePipe} from './pipes/currency-exchange.pipe';
import {PaginatorModule} from "primeng/paginator";
import {SidebarModule} from "primeng/sidebar";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@NgModule({
  declarations: [
    CurrencyExchangePipe
  ],
  imports: [
    CardModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    ImageModule,
    ToastModule,
    ProgressSpinnerModule,
    MenubarModule,
    AvatarModule,
    OverlayPanelModule,
    TieredMenuModule,
    TableModule,
    PaginatorModule,
    SidebarModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
  exports: [
    CurrencyExchangePipe,
    CardModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    ImageModule,
    ToastModule,
    ProgressSpinnerModule,
    MenubarModule,
    AvatarModule,
    OverlayPanelModule,
    TieredMenuModule,
    TableModule,
    PaginatorModule,
    SidebarModule,
    ConfirmDialogModule,
  ],
  bootstrap: []
})
export class SharedModule {}
