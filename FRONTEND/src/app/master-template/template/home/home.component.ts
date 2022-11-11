import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {BreadcrumbService} from "../../../shared/components/breadcrumb/breadcrumb.service";
import {TranslateService} from "@ngx-translate/core";
import {BreadcrumbItemList} from "../../../shared/components/interfaces/breacrumb-interfaces";

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
    const breadcrumbPages: BreadcrumbItemList = [
      {label: 'portal.general.breadcrumb.home', route: 'home'}
    ];
    this.breadcrumbService.pushBreadcrumb(breadcrumbPages);

    this.languageSubscription = this.translateService.onLangChange.subscribe(async () => {
      this.breadcrumbService.pushBreadcrumb(breadcrumbPages);
    });
  }

  ngOnDestroy() {
    this.breadcrumbService.clearBreadcrumb();
  }
}