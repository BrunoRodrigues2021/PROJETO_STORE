import {ChangeDetectorRef, Component} from '@angular/core';
import {MenuItem, PrimeNGConfig} from "primeng/api";
import {Subscription} from "rxjs";
import {BreadcrumbService} from "./shared/breadcrumb.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'STORE';

  breadcrumbItems: MenuItem[];


  constructor(private breadcrumbService: BreadcrumbService, private cdr: ChangeDetectorRef) {}

  async ngOnInit() {
    // this.breadcrumbService.getBreadcrumb().subscribe(async (items) => {
    //   this.breadcrumbItems = [];
    //   items.forEach((item) => {
    //     this.breadcrumbItems.push(item);
    //   });
    //   this.cdr.detectChanges();
    //   console.log(this.breadcrumbItems)
    // });
  }
}
