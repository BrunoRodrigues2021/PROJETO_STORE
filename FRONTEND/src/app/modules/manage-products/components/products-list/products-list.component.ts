import {Component, OnInit} from '@angular/core';
import {ManageProductsService} from "../../manage-products.service";
import {BreadcrumbService} from "../../../../shared/components/breadcrumb/breadcrumb.service";
import {Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {BreadcrumbItemList} from "../../../../shared/components/interfaces/breacrumb-interfaces";
import {
  CURRENCY_EXCHANGE_RATE,
  DEFAULT_PAGINATION_PARAMETERS,
  SortOrder
} from "../../../../shared/constants/shared-constants";
import {PaginationInterface} from "../../../../shared/interfaces/shared-interfaces";
import {ProductFilters} from "../../utils/products-filters";
import {ProductSortBy} from "../../utils/product-constants";
import {Product} from "../../utils/models/product.model";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  currencyCode = CURRENCY_EXCHANGE_RATE.EN

  DEFAULT_PAGINATION_PARAMETERS = DEFAULT_PAGINATION_PARAMETERS;

  productsCount = 0;

  SORT_ORDERS: typeof SortOrder = SortOrder;
  SORT_BYS: typeof ProductSortBy = ProductSortBy;

  productFilter: ProductFilters = new ProductFilters();

  private languageSubscription: Subscription ;

  asyncOperationsStatus = {
    isProcessingRequest: false,
    isPerformingRequest(): boolean {
      return Object.values(this).some((status) => status === true);
    },
  };

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

  loadProducts(
    resetPagination = false,
    sortBy: ProductSortBy = this.productFilter.sortBy,
    sortOrder: SortOrder = this.productFilter.sortOrder
  ) {

    this.productsCount = 0;
    this.asyncOperationsStatus.isProcessingRequest = true;

    this.productFilter.sortBy = sortBy;
    this.productFilter.sortOrder = sortOrder;

    this._manageProductsService.getProducts(this.DEFAULT_PAGINATION_PARAMETERS.page, this.DEFAULT_PAGINATION_PARAMETERS.pageSize).subscribe(
      {
        next: (data) => {
          const {count, rows} = data;


          this.products = rows;
          this.productsCount = count;
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => {
          this.asyncOperationsStatus.isProcessingRequest = false;
        }
      }

    );
  }

  async changePagination(event: any): Promise<void> {
    this.productFilter.pagination.change(event);
    await this.loadProducts();
  }

}
