import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {BreadcrumbService} from "./components/breadcrumb/breadcrumb.service";
import {PortalService} from "./portal.service";

@Injectable({
  providedIn: 'root',
})
export class LanguageService extends PortalService {

  constructor(
    private translateService: TranslateService,
    private breadcrumbService: BreadcrumbService
  ) {
    // @ts-ignore
    super();
  }

  changeLanguage(language: string) {
    this.breadcrumbService.clearBreadcrumb();
    this.translateService.use(language);
    this.setLanguage(language);

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

  public getCurrentPortalLanguage() {
    const language = localStorage.getItem(PortalService.LANGUAGE_STORAGE_KEY) ?
      localStorage.getItem(PortalService.LANGUAGE_STORAGE_KEY) : navigator.language.split('-')[0];
    // @ts-ignore
    return Object.keys(PortalService.LANGUAGES).includes(language) ? language : PortalService.LANGUAGES.en;
  }
}
