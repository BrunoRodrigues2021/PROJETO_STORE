import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {BreadcrumbService} from "../../../../shared/components/breadcrumb/breadcrumb.service";
import {TranslateService} from "@ngx-translate/core";
import {BreadcrumbItemList} from "../../../../shared/components/interfaces/breacrumb-interfaces";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  private languageSubscription: Subscription;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    const breadcrumbPages: BreadcrumbItemList = [
      {label: 'portal.general.breadcrumb.users.usersList', route: 'users'}
    ];
    this.breadcrumbService.pushBreadcrumb(breadcrumbPages);

    this.languageSubscription = this.translateService.onLangChange.subscribe(async () => {
      this.breadcrumbService.clearBreadcrumb();
      this.breadcrumbService.pushBreadcrumb(breadcrumbPages);
    });
  }

  ngOnDestroy() {
    this.breadcrumbService.clearBreadcrumb();
  }
}
