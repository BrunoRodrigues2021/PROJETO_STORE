import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MenuItem, PrimeNGConfig} from "primeng/api";
import {Subscription} from "rxjs";
import {BreadcrumbService} from "../shared/breadcrumb.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-master-template',
  templateUrl: './master-template.component.html',
  styleUrls: ['./master-template.component.scss']
})
export class MasterTemplateComponent implements OnInit {
  breadcrumbItems: MenuItem[];

  private languageSubscription: Subscription;

  constructor(
    private cdr: ChangeDetectorRef,
    private breadcrumbService: BreadcrumbService,
    private translateService: TranslateService
  ) { }


  async ngOnInit() {
    this.breadcrumbService.getBreadcrumb().subscribe(async (items) => {
      this.breadcrumbItems = [];
      items.forEach((item) => {
        this.breadcrumbItems.push(item);
      });
      this.cdr.detectChanges();
    });

    const pagesName = [
      'portal.menu.products'
    ];
    this.breadcrumbService.pushBreadcrumb(pagesName);

    this.languageSubscription = this.translateService.onLangChange.subscribe(async () => {
      this.breadcrumbService.pushBreadcrumb(pagesName);
    });
  }

}
