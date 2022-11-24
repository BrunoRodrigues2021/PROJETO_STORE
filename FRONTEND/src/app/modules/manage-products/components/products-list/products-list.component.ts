import {Component, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ManageProductsService} from "../../manage-products.service";
import {BreadcrumbService} from "../../../../shared/components/breadcrumb/breadcrumb.service";
import {finalize, lastValueFrom, Subscription} from "rxjs";
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
import {ConfirmationService, MessageService} from "primeng/api";
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

  TESTE = [];

  SORT_ORDERS: typeof SortOrder = SortOrder;
  SORT_BYS: typeof ProductSortBy = ProductSortBy;

  itemSelected = null;
  selectedProducts = [];
  productIsDeleted = false;

  productFilter: ProductFilters = new ProductFilters();

  private languageSubscription: Subscription;

  asyncOperationsStatus = {
    isProcessingRequest: false,
    isPerformingRequest(): boolean {
      return Object.values(this).some((status) => status === true);
    },
  };

  @ViewChild(Paginator) paginator: Paginator;

  constructor(
    private productService: ManageProductsService,
    private translateService: TranslateService,
    private messageService: MessageService,
    private breadcrumbService: BreadcrumbService,
    private portalService: PortalService,
    private confirmationService: ConfirmationService
  ) {
  }

  async ngOnInit() {
    await this.clearFilters();

    const breadcrumbPages: BreadcrumbItemList = [
      {label: 'portal.general.breadcrumb.products.productsList', route: 'products'},
    ];

    this.breadcrumbService.pushBreadcrumb(breadcrumbPages);
    this.currencyCode = await lastValueFrom(this.translateService.get('portal.general.currency'));

    this.languageSubscription = this.translateService.onLangChange.subscribe(async () => {
      this.breadcrumbService.clearBreadcrumb();
      this.breadcrumbService.pushBreadcrumb(breadcrumbPages);
      this.currencyCode = await lastValueFrom(this.translateService.get('portal.general.currency'));

      await this.closeItemDetails(true);
      await this.clearFilters();
    });
  }

  ngOnDestroy() {
    this.breadcrumbService.clearBreadcrumb();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.productIsDeleted = changes['productDeleted'].currentValue;
    console.log(this.productIsDeleted)
    if(this.productIsDeleted) {
      this.loadProducts(true);
    }
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

      this.productService.getProducts(getProductsRequestPayload).pipe(
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
              const message = await lastValueFrom(this.translateService
                .get('portal.general.errors.genericError'));

              this.messageService.add({
                severity: 'error',
                summary: await lastValueFrom(this.translateService
                  .get('portal.general.toast.error')),
                detail: message
              });
            }
          }
        );

    } catch (error) {
      console.log(error);
    }
  }

  async deleteSelectedProducts() {
    const message = await lastValueFrom(this.translateService
              .get((this.selectedProducts.length > 1) ?
                'portal.components.product.list.toast.success.productsDelete' :
                'portal.components.product.list.toast.success.productDelete'
              ));

            this.messageService.add({
              severity: 'success',
              summary: await lastValueFrom(this.translateService
                .get('portal.general.toast.success')),
              detail: message
            });

    // this.asyncOperationsStatus.isProcessingRequest = true;
    //
    // const listOfProductId = [];
    // const formData: FormData = new FormData();
    //
    // this.selectedProducts.forEach(item => {
    //   listOfProductId.push(item.id);
    // });
    //
    // formData.append('listOfProductId', JSON.stringify(listOfProductId));
    //
    // this.productService.deleteProduct(formData).pipe(
    //   finalize(() => {
    //     this.asyncOperationsStatus.isProcessingRequest = false;
    //     this.selectedProducts = [];
    //   }))
    //   .subscribe(
    //     {
    //       next: async () => {
    //         this.loadProducts(true);
    //
    //         const message = await lastValueFrom(this.translateService
    //           .get((this.selectedProducts.length > 1) ?
    //             'portal.components.product.list.toast.success.productsDelete' :
    //             'portal.components.product.list.toast.success.productDelete'
    //           ));
    //
    //         this.messageService.add({
    //           severity: 'success',
    //           summary: await lastValueFrom(this.translateService
    //             .get('portal.general.toast.success')),
    //           detail: message
    //         });
    //       },
    //       error: async () => {
    //         const message = await lastValueFrom(this.translateService
    //           .get('portal.components.product.list.toast.error.productDelete'));
    //
    //         this.messageService.add({
    //           severity: 'error',
    //           summary: await lastValueFrom(this.translateService
    //             .get('portal.general.toast.error')),
    //           detail: message
    //         });
    //       }
    //     }
    //   );
  }

  confirmDeletion() {
    this.confirmationService.confirm({
      key: 'deleteProductsConfirmDialog'
    });
  }

  async showItemDetails(tableItemSelected) {
    this.itemSelected = {...tableItemSelected};
  }

  async closeItemDetails(refresh: boolean = false) {
    this.itemSelected = null;
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
