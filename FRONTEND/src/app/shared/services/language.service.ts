import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {BreadcrumbService} from "../components/breadcrumb/breadcrumb.service";
import {PortalService} from "./portal.service";
import {Router} from "@angular/router";
import moment from 'moment';
import {ManageUsersService} from "../../modules/manage-users/manage-users.service";
import {AuthService} from "./auth.service";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root',
})
export class LanguageService extends PortalService {

  constructor(
    private breadcrumbService: BreadcrumbService,
    private userService: ManageUsersService,
    private authService: AuthService,
    private messageService: MessageService,
    translateService: TranslateService,
    router: Router
  ) {
    super(router, translateService);
  }

  changeLanguage(language: string) {
    moment.locale(language);

    const formData: FormData = new FormData();
    formData.append('language', language);

    // let payload = {};
    //
    // if (language) {
    //   payload['language'] = language;
    // }

    this.userService.updateUser(this.authService.getParsedToken().userData.id, formData).subscribe(
      {
        next: async () => {
          this.breadcrumbService.clearBreadcrumb();
          this.translateService.use(language);
          PortalService.setLanguage(language);
        },
        error: async () => {
          const message = await this.translateService
            .get('portal.general.error').toPromise();

          this.messageService.add({
            severity: 'error',
            summary: await this.translateService
              .get('portal.general.error').toPromise(),
            detail: message
          });
        }
      }

    );
  }

  public getCurrentPortalLanguage() {
    const language = localStorage.getItem(PortalService.LANGUAGE_STORAGE_KEY) ?
      localStorage.getItem(PortalService.LANGUAGE_STORAGE_KEY) : this.translateService.getBrowserLang();
    return Object.keys(PortalService.LANGUAGES).includes(language) ? language : PortalService.LANGUAGES.en;
  }
}
