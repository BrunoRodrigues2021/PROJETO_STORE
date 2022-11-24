import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {BreadcrumbService} from "../../../../shared/components/breadcrumb/breadcrumb.service";
import {Subscription} from "rxjs";
import {BreadcrumbItemList} from "../../../../shared/components/interfaces/breacrumb-interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.scss']
})
export class ProductsAddComponent implements OnInit {
  productCreationForm: FormGroup;
  stepItems: MenuItem[];
  activeStep = 0;


  private languageSubscription: Subscription;

  asyncOperationsStatus = {
    isProcessingRequest: false,
    isPerformingRequest(): boolean {
      return Object.values(this).some((status) => status === true);
    },
  };

  constructor(
    private translateService: TranslateService,
    private breadcrumbService: BreadcrumbService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.stepItems = [
      {label: 'Information'},
      {label: 'Confirmation'},
    ];

    const breadcrumbPages: BreadcrumbItemList = [
      {label: 'portal.general.breadcrumb.products.productsList', route: 'products'},
      {label: 'portal.general.breadcrumb.products.productCreate', route: 'products/create'}
    ];

    this.breadcrumbService.pushBreadcrumb(breadcrumbPages);

    this.languageSubscription = this.translateService.onLangChange.subscribe(async () => {
      this.breadcrumbService.clearBreadcrumb();
      this.breadcrumbService.pushBreadcrumb(breadcrumbPages);
    });


    this.productCreationForm = this.formBuilder.group({
      name: [''],
      value: ['']
    });
  }

  ngOnDestroy() {
    this.breadcrumbService.clearBreadcrumb();
  }

  createProduct() {
  }

}
