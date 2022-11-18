import {Component, OnDestroy, OnInit} from '@angular/core';
import {ManageProductsService} from "../../manage-products.service";
import {getProductsResponse} from "../../interfaces/product-response-interface";
import {BreadcrumbService} from "../../../../shared/components/breadcrumb/breadcrumb.service";
import {Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {BreadcrumbItemList} from "../../../../shared/components/interfaces/breacrumb-interfaces";
import {SharedConstants} from "../../../../shared/constants/shared-constants";
import {PaginationInterface} from "../../../../shared/interfaces/shared-interfaces";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  isProcessingRequest = false;
  data: getProductsResponse[] = [];
  currencyCode = SharedConstants.CURRENCY_EXCHANGE_RATE.EN

  pagination: PaginationInterface = {
    page: SharedConstants.PAGINATION.DEFAULT_PAGE,
    pageSize: SharedConstants.PAGINATION.DEFAULT_PAGE_SIZE
  };

  private languageSubscription: Subscription ;

  constructor(
    private _manageProductsService: ManageProductsService,
    private translateService: TranslateService,
    private breadcrumbService: BreadcrumbService,
  ) {}

  async ngOnInit() {
    this.loadProducts();

    const breadcrumbPages: BreadcrumbItemList = [
      {label: 'portal.general.breadcrumb.products.productsList', route: 'products'},
    ];

    this.breadcrumbService.pushBreadcrumb(breadcrumbPages);
    this.currencyCode = await this.translateService.get('portal.general.currency').toPromise();

    this.languageSubscription = this.translateService.onLangChange.subscribe(async () => {
      this.breadcrumbService.clearBreadcrumb();
      this.breadcrumbService.pushBreadcrumb(breadcrumbPages);
      this.currencyCode = await this.translateService.get('portal.general.currency').toPromise();

      this.loadProducts();
    });
  }

  ngOnDestroy() {
    this.breadcrumbService.clearBreadcrumb();
  }

  loadProducts() {
    this.isProcessingRequest = true;

    this._manageProductsService.getProducts(this.pagination.page, this.pagination.pageSize).subscribe(
      {
        next: (data) => {
          this.data = data;
          console.log(data)
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => {
          this.isProcessingRequest = false;
        }
      }

    );
  }

}
