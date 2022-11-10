import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { BreadcrumbService } from "../../shared/breadcrumb.service";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import {finalize, Subscription} from "rxjs";
import {MenuItem, PrimeNGConfig} from "primeng/api";
import {PortalService} from "../../shared/portal.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  httpError: any;
  isProcessingRequest = false;

  constructor(
    private router: Router,
    private portalService: PortalService,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(128)]],
      password: ['', [Validators.required, Validators.maxLength(64), Validators.minLength(8)]]
    });
  }

  async executeLogin() {
    this.portalService.setUser('token will be here');
    await this.router.navigate(['/portal']);
  }

  login() {
    this.isProcessingRequest = true;

    this.loginService.sendLoginRequest(this.loginForm.value.email, this.loginForm.value.password)
      .pipe(finalize(() => {
        this.isProcessingRequest = false;
      }))
      .subscribe(
        async (response: any) => {
          this.portalService.setUser(response['token']);
          await this.router.navigate(['/portal']);
        },
        (responseError: HttpErrorResponse) => {
          this.httpError = responseError;
        }
      );
  }

  login2Step() {
    // this.httpError = null;
    // if (this.mfaForm.invalid) {
    //   return;
    // }
    // this.isProcessingRequest = true;
    //
    // this.loginService.sendLogin2StepRequest(this.loginForm.value.email, this.loginForm.value.password, this.mfaForm.value.pin)
    //   .pipe(finalize(() => {
    //     this.isProcessingRequest = false;
    //   }))
    //   .subscribe(
    //     async (response) => {
    //       if (response.token) {
    //         localStorage.setItem('portalAdminToken', response['token']);
    //         await this.router.navigate(['home']);
    //       }
    //     },
    //     (responseError: HttpErrorResponse) => {
    //       this.httpError = new HttpError();
    //       if (responseError && responseError.error && responseError.error.error) {
    //         this.httpError = new HttpError();
    //         this.httpError.errorCode = responseError.error.error.code;
    //         this.httpError.errorKey = responseError.error.error.description;
    //       } else {
    //         this.httpError.errorCode = 0;
    //         this.httpError.errorKey = 'genericError';
    //       }
    //     }
    //   );
  }
}
