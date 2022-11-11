import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BreadcrumbComponent} from "./breadcrumb.component";
import {TranslateModule} from "@ngx-translate/core";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  providers: [],
  declarations: [BreadcrumbComponent],
  exports: [BreadcrumbComponent]
})
export class BreadcrumbModule {
}
