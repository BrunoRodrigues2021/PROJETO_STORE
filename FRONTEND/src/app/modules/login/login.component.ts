import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { BreadcrumbService } from "../../shared/breadcrumb.service";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import {MenuItem, PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private cdr: ChangeDetectorRef;
  private config: PrimeNGConfig;

  private languageSubscription: Subscription;
  private primeNgChangeSubscription: Subscription;

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private translateService: TranslateService
  ) { }

  async ngOnInit() {

  }

  async executeLogin() {
    await this.router.navigate(['/home']);
  }
}
