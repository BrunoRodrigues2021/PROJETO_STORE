import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {BreadcrumbService} from "../../../../shared/breadcrumb.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.scss']
})
export class ProductsAddComponent implements OnInit {

  private languageSubscription: Subscription;

  constructor(
    private translateService: TranslateService,
    private breadcrumbService: BreadcrumbService,
  ) {}

  ngOnInit() {
    const pagesName = [
      'portal.general.breadcrumb.products.productsList',
      'portal.general.breadcrumb.products.productCreate'
    ];


    this.breadcrumbService.pushBreadcrumb(pagesName);

    this.languageSubscription = this.translateService.onLangChange.subscribe(async () => {
      this.breadcrumbService.pushBreadcrumb(pagesName);
    });
  }

  ngOnDestroy() {
    this.breadcrumbService.clearBreadcrumb();
  }

}
