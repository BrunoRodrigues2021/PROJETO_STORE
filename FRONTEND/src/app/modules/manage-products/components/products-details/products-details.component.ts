import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {finalize, lastValueFrom} from "rxjs";
import {ManageProductsService} from "../../manage-products.service";
import {Product} from "../../utils/models/product.model";
import {TranslateService} from "@ngx-translate/core";
import {PortalService} from "../../../../shared/services/portal.service";

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit, OnChanges {
  product: Product;
  dateFormat;

  @Input() productId: number;
  @Output() closeDetailsEvent = new EventEmitter<boolean>();
  @Output("loadProducts") loadProducts: EventEmitter<any> = new EventEmitter();

  currencyCode;

  asyncOperationsStatus = {
    isProcessingRequest: false,
    isPerformingRequest(): boolean {
      return Object.values(this).some((status) => status === true);
    },
  };

  constructor(
    private confirmationService: ConfirmationService,
    private translateService: TranslateService,
    private messageService: MessageService,
    private productService: ManageProductsService,
  ) {}

  async ngOnInit() {
    this.dateFormat = PortalService.getCurrentDateFormat();
    this.currencyCode = await lastValueFrom(this.translateService.get('portal.general.currency'));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.product = changes['productId'].currentValue;
    this.loadProduct();
  }

  closeDetails(): void {
    this.closeDetailsEvent.emit(false);
  }

  loadProduct() {
    this.asyncOperationsStatus.isProcessingRequest = true;
    this.product = null;

    try {
      this.productService.getProduct(this.productId).pipe(
        finalize(() =>
          this.asyncOperationsStatus.isProcessingRequest = false
        ))
        .subscribe(
          {
            next: async (data) => {
              this.product = data;
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

  editProduct():void {

  }

  async deleteProduct() {
      this.asyncOperationsStatus.isProcessingRequest = true;

      const formData: FormData = new FormData();
      formData.append('listOfProductId', JSON.stringify([this.productId]));

      this.productService.deleteProduct(formData).pipe(
        finalize(() => {
          this.asyncOperationsStatus.isProcessingRequest = false;
        }))
        .subscribe(
          {
            next: async () => {
              const message = await lastValueFrom(this.translateService
                .get('portal.components.product.list.toast.success.productDelete'));

              this.messageService.add({
                severity: 'success',
                summary: await lastValueFrom(this.translateService
                  .get('portal.general.toast.success')),
                detail: message
              });

              this.loadProducts.emit();
              this.closeDetails();
            },
            error: async () => {
              const message = await lastValueFrom(this.translateService
                .get('portal.components.product.list.toast.error.productDelete'));

              this.messageService.add({
                severity: 'error',
                summary: await lastValueFrom(this.translateService
                  .get('portal.general.toast.error')),
                detail: message
              });
            }
          }
        );
  }

   confirmDeletion() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: async () => {
        await this.deleteProduct()
      }
    });
  }


}
