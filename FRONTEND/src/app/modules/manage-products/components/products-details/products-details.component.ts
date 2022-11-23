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
    console.log(this.dateFormat)
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
              console.log(this.product.updatedAt);
            },
            error: async () => {
              const message = await lastValueFrom(this.translateService
                .get('portal.general.error'));

              this.messageService.add({
                severity: 'error',
                summary: await lastValueFrom(this.translateService
                  .get('portal.general.error')),
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

  deleteProduct(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        //Actual logic to perform a confirmation
      }
    });
  }

}
