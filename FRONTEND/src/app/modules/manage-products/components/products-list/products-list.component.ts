import {Component, OnDestroy, OnInit} from '@angular/core';
import {ManageProductsService} from "../../manage-products.service";
import {getProductsResponse} from "../../interfaces/product-response-interface";
import {BreadcrumbService} from "../../../../shared/breadcrumb.service";
import {Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  data: getProductsResponse[] = [];

  private languageSubscription: Subscription;

  constructor(
    private _manageProductsService: ManageProductsService,
    private translateService: TranslateService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit() {
    this.loadProducts();

    const pagesName = [
      'portal.general.breadcrumb.products.productsList'
    ];

    this.breadcrumbService.pushBreadcrumb(pagesName);

    this.languageSubscription = this.translateService.onLangChange.subscribe(async () => {
      this.breadcrumbService.pushBreadcrumb(pagesName);
    });
  }

  ngOnDestroy() {
    this.breadcrumbService.clearBreadcrumb();
  }

  loadProducts() {
    this._manageProductsService.getProducts().subscribe(
      {
        next: (data) => {
          this.data = data;
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => {}
      }

    );
  }

}
