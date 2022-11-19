import {Component, OnInit} from '@angular/core';
import {LanguageService} from "../shared/services/language.service";

@Component({
  selector: 'app-master-template',
  templateUrl: './master-template.component.html',
  styleUrls: ['./master-template.component.scss']
})
export class MasterTemplateComponent implements OnInit {

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.changeLanguage(this.languageService.getCurrentPortalLanguage());
  }
}
