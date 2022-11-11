import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {BreadcrumbService} from "../shared/components/breadcrumb/breadcrumb.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-master-template',
  templateUrl: './master-template.component.html',
  styleUrls: ['./master-template.component.scss']
})
export class MasterTemplateComponent implements OnInit {
  constructor() { }

  ngOnInit() {}
}
