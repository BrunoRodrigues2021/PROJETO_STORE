import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PortalService} from "../../shared/services/portal.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {AuthService} from "../../shared/services/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {MessageService} from "primeng/api";
import {CurrencyService} from "../../shared/services/currency.service";
import {getCurrencyResponse} from "../../shared/interfaces/currency-interfaces";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  httpError: any;
  isProcessingRequest = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private translateService: TranslateService,
    private authService: AuthService,
    private messageService: MessageService,
    private currencyService: CurrencyService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if(PortalService.getUser()){
       this.router.navigate(['/home']).then();
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(128), Validators.minLength(8), Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(64), Validators.minLength(8)]]
    });
  }

  ngOnDestroy() {
    this.isProcessingRequest = false;
    this.loginForm.reset();
    this.httpError = null;
  }

  executeLogin() {
    this.isProcessingRequest = true;

    this.loginService.sendLoginRequest(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (response) => {
          PortalService.setUser(response['token']);
          const parsedToken = this.authService.getParsedToken();

          if(parsedToken.userData.language) {
            PortalService.setLanguage(parsedToken.userData.language);
          } else if (this.translateService.getBrowserLang()) {
            PortalService.setLanguage(this.translateService.getBrowserLang());
          } else {
            PortalService.setLanguage('en');
          }
          this.loadCurrencyExchangeRate();
          this.router.navigate(['/home']).then();
        },
        error: (error) => {
          this.httpError = error.error;
        },
        complete: () => {
          this.isProcessingRequest = false;
        }
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

  loadCurrencyExchangeRate() {
    this.currencyService.getExchangeCurrencyRate().subscribe(
      {
        next: async (data) => {
          CurrencyService.setCurrencyExchangeRate(data);
        },
        error: async () => {
          const message = await this.translateService
            .get('portal.general.error').toPromise();

          this.messageService.add({
            severity: 'error',
            summary: await this.translateService
              .get('portal.general.error').toPromise(),
            detail: message
          });
        }
      }

    );
  }
}
