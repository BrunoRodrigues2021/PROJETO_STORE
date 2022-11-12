import {Component} from '@angular/core';
import {LanguageService} from "./shared/language.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'STORE';

  constructor(private languageService: LanguageService) {}

  async ngOnInit() {
    this.languageService.changeLanguage(this.languageService.getCurrentPortalLanguage());
  }
}
