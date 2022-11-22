import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MenuItem, MessageService, PrimeNGConfig} from 'primeng/api';
import {OverlayPanel} from "primeng/overlaypanel";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";
import {BuildMenuService} from "../../../shared/services/build-menu.service";
import {Router} from "@angular/router";
import {PortalService} from "../../../shared/services/portal.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  portalMenuItems: MenuItem[];
  userMenuItems: MenuItem[];

  isUserOverlayOpened = false;

  private languageChangeSubscription: Subscription;
  private primeNgChangeSubscription: Subscription;

  @ViewChild('userOptionsOverlay', {static: false}) userOptionsOverlay: OverlayPanel;

  constructor(
    private translateService: TranslateService,
    private messageService: MessageService,
    private buildMenuService: BuildMenuService,
    private portalService: PortalService,
    private config: PrimeNGConfig,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userMenuItems = this.buildMenuService.getUserOptionsMenu();
    this.portalMenuItems = this.buildMenuService.getPortalMenuItems();

    this.primeNgTranslate(this.translateService.currentLang);
    this.languageChangeSubscription = this.translateService.onLangChange.subscribe(async (event: LangChangeEvent) => {
      this.primeNgTranslate(event.lang);
      this.userMenuItems = this.buildMenuService.getUserOptionsMenu();
      this.portalMenuItems = this.buildMenuService.getPortalMenuItems();
    });
  }

  ngOnDestroy() {
    this.languageChangeSubscription?.unsubscribe();
  }

  backToHome() {
    this.portalService.navigateTo("home");
  }

  primeNgTranslate(lang: string) {
    this.translateService.use(lang);
    this.primeNgChangeSubscription = this.translateService.get('primeng').subscribe(translation => {
      this.config.setTranslation(translation);
      this.cdr.detectChanges();
    });
  }

  toggleOverlay() {
    this.userOptionsOverlay.toggle(event);
  }

  hideOverlay() {
    this.userOptionsOverlay.hide();
  }

  onShowOverlay() {
    this.isUserOverlayOpened = true;
  }

  onHideOverlay() {
    this.isUserOverlayOpened = false;
  }
}
