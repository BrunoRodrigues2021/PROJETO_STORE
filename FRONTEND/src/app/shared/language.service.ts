import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {BreadcrumbService} from "./breadcrumb.service";

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  constructor(
    private translateService: TranslateService,
    private breadcrumbService: BreadcrumbService
  ) {}

  changeLanguage(language: string) {
    this.breadcrumbService.clearBreadcrumb();
    this.translateService.use(language);

    // this.moment.locale(language);
    //
    // this.hideOverlay();
    //
    // const formData: FormData = new FormData();
    // formData.append('language', language);
    //
    // this.userService.updateUserInfo(formData)
    //   .pipe(finalize(() => {
    //   }))
    //   .subscribe(
    //     async () => {
    //       this.translateService.use(language);
    //       localStorage.setItem(PortalService.LANGUAGE_STORAGE_KEY, language);
    //     },
    //     async () => {
    //       const message = await this.translateService.get('app.editAccountPage.errors.couldNotUpdateLanguage').toPromise();
    //       this.messageService.add({severity: 'error', summary: 'Error', detail: message});
    //     }
    //   )
  }
}
