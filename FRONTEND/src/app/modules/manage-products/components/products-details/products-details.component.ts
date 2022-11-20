import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {

  @Output() closeDetailsEvent = new EventEmitter<boolean>();

  constructor(
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
  }

  closeDetails(): void {
    this.closeDetailsEvent.emit(false);
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
