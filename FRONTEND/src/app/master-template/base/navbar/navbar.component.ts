import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {OverlayPanel} from "primeng/overlaypanel";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  portalMenuItems: MenuItem[];
  userMenuItems: MenuItem[];

  isUserOverlayOpened = false;

  @ViewChild('userOptionsOverlay', {static: false}) userOptionsOverlay: OverlayPanel;

  constructor(
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.portalMenuItems = [
      {
        label: 'File',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            {label: 'Project'},
            {label: 'Other'},
          ]
        },
          {label: 'Open'},
          {label: 'Quit'}
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {label: 'Delete', icon: 'pi pi-fw pi-trash'},
          {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
        ]
      }
    ];
    this.userMenuItems = [
      {
        label: 'User Management',
        icon: 'icon mi-settings',
        items: [
          {
            label: 'Change Password',
            icon: 'icon mi-key'
          },
          {
            label: 'Change Language',
            icon: 'icon mi-translate',
            items: [
              {
                label: 'English',
                command: () => this.changeLanguage('en')
              },
              {
                label: 'Portuguese',
                command: () => this.changeLanguage('pt')
              }
            ]
          }
        ]
      },
      {
        label: 'Logout',
        icon: 'icon mi-logout',
        items: [
          {label: 'Delete', icon: 'pi pi-fw pi-trash'},
          {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
        ]
      }
    ];
  }

  toggleOverlay() {
    this.userOptionsOverlay.toggle(event);
  }

  hideOverlay() {
    this.userOptionsOverlay.hide();
  }

  onShowOverlay() {
    this.isUserOverlayOpened = true;
  }

  onHideOverlay() {
    this.isUserOverlayOpened = false;
  }

  changeLanguage(language: string):void {
    this.translateService.use(language);
  }
}
