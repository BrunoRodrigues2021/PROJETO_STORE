import { Injectable } from '@angular/core';
import {MenuItem} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {LanguageService} from "./language.service";
import {PortalService} from "./portal.service";
import {LANGUAGES} from "../constants/shared-constants";

@Injectable({
  providedIn: 'root',
})
export class BuildMenuService {

  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService,
    private portalService: PortalService,
  ) {}

  getUserOptionsMenu(): Array<MenuItem> {
    return [
      {
        label: this.translateService.instant('portal.general.userMenuSettings.userManagement'),
        icon: 'icon mi-settings',
        items: [
          {
            label: this.translateService.instant('portal.general.userMenuSettings.changePassword'),
            icon: 'icon mi-key'
          },
          {
            label: this.translateService.instant('portal.general.userMenuSettings.changeLanguage'),
            icon: 'icon mi-translate',
            items: [
              {
                label: this.translateService.instant('portal.general.userMenuSettings.english'),
                command: () => this.languageService.changeLanguage(LANGUAGES.EN),
                disabled: (this.translateService.currentLang) === LANGUAGES.EN
              },
              {
                label: this.translateService.instant('portal.general.userMenuSettings.portuguese'),
                command: () => this.languageService.changeLanguage(LANGUAGES.PT),
                disabled: (this.translateService.currentLang) === LANGUAGES.PT
              }
            ]
          }
        ]
      },
      {
        label: this.translateService.instant('portal.general.userMenuSettings.logout'),
        icon: 'icon mi-logout',
        command: () => this.portalService.userLogout()
      }
    ];
  }


  getPortalMenuItems(): Array<MenuItem> {
    return [
      {
        label: this.translateService.instant('portal.general.portalMenu.users'),
        routerLink: (['users']),
      },
      {
        label: this.translateService.instant('portal.general.portalMenu.products'),
        routerLink: (['products'])
      }
    ];
  }

}
