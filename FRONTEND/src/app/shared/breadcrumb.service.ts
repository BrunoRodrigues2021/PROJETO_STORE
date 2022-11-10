import {MenuItem} from 'primeng/api';
import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class BreadcrumbService {

  breadcrumbItemsArray: MenuItem[] = [];
  breadcrumbItems: EventEmitter<MenuItem[]> = new EventEmitter();

  constructor(private translateService: TranslateService) {
  }

  getBreadcrumb(): Observable<MenuItem[]> {
    return this.breadcrumbItems.asObservable();
  }

  pushBreadcrumb(pagesName: string[]) {
    let pageNameTranslate: MenuItem;
      pagesName.forEach((pageName) => {

        pageNameTranslate = {
          label: this.translateService.instant(pageName)
        };
        this.breadcrumbItemsArray.push(pageNameTranslate);

      });

    this.breadcrumbItems.emit(this.breadcrumbItemsArray);
  }

  removeItemOfBreadcrumb(pagesName: string[]) {
    pagesName.forEach((pageName) => {
      this.breadcrumbItemsArray.splice(this.breadcrumbItemsArray.indexOf({label: this.translateService.instant(pageName)}))
    });
  }

  clearBreadcrumb() {
    this.breadcrumbItemsArray = [];
    this.breadcrumbItems.emit(this.breadcrumbItemsArray);
  }
}
