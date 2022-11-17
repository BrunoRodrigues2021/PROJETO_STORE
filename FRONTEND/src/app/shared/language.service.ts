import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {BreadcrumbService} from "./components/breadcrumb/breadcrumb.service";
import {PortalService} from "./portal.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class LanguageService extends PortalService {

  constructor(
    private breadcrumbService: BreadcrumbService,
    translateService: TranslateService,
    router: Router
  ) {
    super(router, translateService);
  }

  changeLanguage(language: string) {
    this.breadcrumbService.clearBreadcrumb();
    this.translateService.use(language);
    PortalService.setLanguage(language);

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
      localStorage.getItem(PortalService.LANGUAGE_STORAGE_KEY) : this.translateService.getBrowserLang();
    return Object.keys(PortalService.LANGUAGES).includes(language) ? language : PortalService.LANGUAGES.en;
  }
}
