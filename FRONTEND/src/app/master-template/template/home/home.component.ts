import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {BreadcrumbService} from "../../../shared/breadcrumb.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private languageSubscription: Subscription;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    const pagesName = [
      'portal.general.breadcrumb.home'
    ];
    this.breadcrumbService.pushBreadcrumb(pagesName);

    this.languageSubscription = this.translateService.onLangChange.subscribe(async () => {
      this.breadcrumbService.pushBreadcrumb(pagesName);
    });
  }

  ngOnDestroy() {
    this.breadcrumbService.clearBreadcrumb();
  }

}
