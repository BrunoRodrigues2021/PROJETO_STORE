import { Injectable } from '@angular/core';
import {MenuItem} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {LanguageService} from "./language.service";
import {PortalService} from "./portal.service";

@Injectable({
  providedIn: 'root',
})
export class BuildMenuService {

  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService,
    private portalService: PortalService
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
                command: () => this.languageService.changeLanguage('en'),
                disabled: (this.translateService.currentLang) === 'en'
              },
              {
                label: this.translateService.instant('portal.general.userMenuSettings.portuguese'),
                command: () => this.languageService.changeLanguage('pt'),
                disabled: (this.translateService.currentLang) === 'pt'
              }
            ]
          }
        ]
      },
      {
        label: this.translateService.instant('portal.general.userMenuSettings.logout'),
        icon: 'icon mi-logout',
        command: () => this.portalService.destroyUser()
      }
    ];
  }

  getPortalMenuItems(): Array<MenuItem> {
    return [
      {
        label: this.translateService.instant('portal.general.portalMenu.users'),
      },
      {
        label: this.translateService.instant('portal.general.portalMenu.products'),
      }
    ];
  }

}
