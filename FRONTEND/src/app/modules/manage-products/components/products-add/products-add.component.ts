import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {BreadcrumbService} from "../../../../shared/components/breadcrumb/breadcrumb.service";
import {Subscription} from "rxjs";
import {BreadcrumbItemList} from "../../../../shared/components/interfaces/breacrumb-interfaces";

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.scss']
})
export class ProductsAddComponent implements OnInit {

  private languageSubscription: Subscription;

  constructor(
    private translateService: TranslateService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    const breadcrumbPages: BreadcrumbItemList = [
      {label: 'portal.general.breadcrumb.products.productsList', route: 'products'},
      {label: 'portal.general.breadcrumb.products.productCreate', route: 'products/create'}
    ];

    this.breadcrumbService.pushBreadcrumb(breadcrumbPages);

    this.languageSubscription = this.translateService.onLangChange.subscribe(async () => {
      this.breadcrumbService.clearBreadcrumb();
      this.breadcrumbService.pushBreadcrumb(breadcrumbPages);
    });
  }

  ngOnDestroy() {
    this.breadcrumbService.clearBreadcrumb();
  }

}
