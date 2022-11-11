import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "./breadcrumb.service";
import {BreadcrumbItem, BreadcrumbItemList} from "../interfaces/breacrumb-interfaces";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbItems: BreadcrumbItemList;

  constructor(
    private cdr: ChangeDetectorRef,
    private breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.breadcrumbService.getBreadcrumb().subscribe(async (items) => {
      this.breadcrumbItems = items;
      this.cdr.detectChanges();
    });
  }

}
