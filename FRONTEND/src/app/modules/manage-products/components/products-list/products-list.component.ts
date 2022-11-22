import {Component, OnInit, ViewChild} from '@angular/core';
import {ManageProductsService} from "../../manage-products.service";
import {BreadcrumbService} from "../../../../shared/components/breadcrumb/breadcrumb.service";
import {finalize, Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {BreadcrumbItemList} from "../../../../shared/components/interfaces/breacrumb-interfaces";
import {
  CURRENCY_EXCHANGE_RATE,
  DEFAULT_PAGINATION_PARAMETERS,
  SortOrder
} from "../../../../shared/constants/shared-constants";
import {ProductFilters} from "../../utils/products-filters";
import {ProductSortBy} from "../../utils/product-constants";
import {Product} from "../../utils/models/product.model";
import {MessageService} from "primeng/api";
import {Paginator} from "primeng/paginator";
import {GetProductsRequest} from "../../interfaces/product-request-interfaces";
import {PortalService} from "../../../../shared/services/portal.service";

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

  showDetails = null;

  productFilter: ProductFilters = new ProductFilters();

  private languageSubscription: Subscription ;

  asyncOperationsStatus = {
    isProcessingRequest: false,
    isPerformingRequest(): boolean {
      return Object.values(this).some((status) => status === true);
    },
  };

  @ViewChild(Paginator) paginator: Paginator;

  constructor(
    private _manageProductsService: ManageProductsService,
    private translateService: TranslateService,
    private messageService: MessageService,
    private breadcrumbService: BreadcrumbService,
    private portalService: PortalService
  ) {}

  async ngOnInit() {
    await this.clearFilters();

    const breadcrumbPages: BreadcrumbItemList = [
      {label: 'portal.general.breadcrumb.products.productsList', route: 'products'},
    ];

    this.breadcrumbService.pushBreadcrumb(breadcrumbPages);
    this.currencyCode = await this.translateService.get('portal.general.currency').toPromise();

    this.languageSubscription = this.translateService.onLangChange.subscribe(async () => {
      this.breadcrumbService.clearBreadcrumb();
      this.breadcrumbService.pushBreadcrumb(breadcrumbPages);
      this.currencyCode = await this.translateService.get('portal.general.currency').toPromise();

      await this.clearFilters();
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
    this.asyncOperationsStatus.isProcessingRequest = true;
    this.products = [];
    this.productsCount = 0;


    this.productFilter.sortBy = sortBy;
    this.productFilter.sortOrder = sortOrder;

    try {
      if (resetPagination) {
        this.productFilter.pagination.reset(this.paginator);
      }

      const getProductsRequestPayload: GetProductsRequest = {
        name: this.productFilter.name,
        value: this.productFilter.value,
        sortBy: this.productFilter.sortBy,
        sortOrder: this.productFilter.sortOrder,
        page: this.productFilter.pagination.page,
        pageSize: this.productFilter.pagination.pageSize,
      }

      this._manageProductsService.getProducts(getProductsRequestPayload).pipe(
        finalize(() =>
          this.asyncOperationsStatus.isProcessingRequest = false
        ))
        .subscribe(
        {
          next: async (data) => {
            const {count, rows} = data;

            this.products = rows;
            this.productsCount = count;
          },
          error: async () => {
            const message = await this.translateService
              .get('portal.general.error').toPromise();

            this.messageService.add({
              severity: 'error',
              summary: await this.translateService
                .get('portal.general.error').toPromise(),
              detail: message
            });
          }
        }

      );

    } catch (error) {
      console.log(error);
    }
  }

  showItemDetails(tableItemSelected): void {
    this.showDetails = {...tableItemSelected};
  }

  async closeItemDetails(refresh: boolean) {
    this.showDetails = null;
    if (refresh) {
      await this.loadProducts(true);
    }
  }

  async clearFilters(): Promise<void> {
    this.productFilter.clearFilters();
    await this.loadProducts();
  }

  async changePagination(event: any): Promise<void> {
    this.productFilter.pagination.change(event);
    await this.loadProducts();
  }

  navigateToCreateProduct() {
    this.portalService.navigateTo('/products/create');
  }

}
