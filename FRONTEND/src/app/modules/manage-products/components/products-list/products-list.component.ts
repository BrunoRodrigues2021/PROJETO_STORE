import { Component, OnInit } from '@angular/core';
import { ManageProductsService } from "../../manage-products.service";
import { getProductsResponse } from "../../interfaces/product-response-interface";
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  data: getProductsResponse[] = [];

  constructor(private _manageProductsService: ManageProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
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
