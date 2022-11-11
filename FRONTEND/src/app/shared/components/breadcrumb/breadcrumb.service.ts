import {MenuItem} from 'primeng/api';
import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {PortalService} from "../../portal.service";
import {BreadcrumbItemList} from "../interfaces/breacrumb-interfaces";

@Injectable()
// @ts-ignore
export class BreadcrumbService extends PortalService {
  breadcrumbItemsArray: BreadcrumbItemList = [];
  breadcrumbItems: EventEmitter<BreadcrumbItemList> = new EventEmitter();

  constructor() {
    // @ts-ignore
    super();
  }

  getBreadcrumb(): Observable<BreadcrumbItemList> {
    return this.breadcrumbItems.asObservable();
  }

   pushBreadcrumb(pages: BreadcrumbItemList) {
    pages.forEach(item => {
      this.breadcrumbItemsArray.push(item);
    });
    this.breadcrumbItems.emit(this.breadcrumbItemsArray);
  }


  clearBreadcrumb() {
    this.breadcrumbItemsArray = [];
    this.breadcrumbItems.emit(this.breadcrumbItemsArray);
  }
}
