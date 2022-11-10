import {MenuItem} from 'primeng/api';
import {EventEmitter, Injectable} from '@angular/core';
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

    this.clearBreadcrumb();

    pagesName.forEach((pageName) => {
      pageNameTranslate = {
        label: this.translateService.instant(pageName)
      };

      this.breadcrumbItemsArray.push(pageNameTranslate);
    });

    this.breadcrumbItems.emit(this.breadcrumbItemsArray);
  }

  clearBreadcrumb() {
    this.breadcrumbItemsArray = [];
    this.breadcrumbItems.emit(this.breadcrumbItemsArray);
  }
}
