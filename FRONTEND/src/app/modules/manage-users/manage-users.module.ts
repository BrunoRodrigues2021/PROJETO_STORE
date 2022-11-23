import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersAddComponent} from './components/users-add/users-add.component';
import {UsersListComponent} from "./components/users-list/users-list.component";
import {ManageUsersRoutingModule} from "./manage-users-routing.module";
import {SharedModule} from "../../shared/shared.module";




@NgModule({
  declarations: [
    UsersListComponent,
    UsersAddComponent
  ],
  imports: [
    CommonModule,
    ManageUsersRoutingModule,
    SharedModule
  ]
})
export class ManageUsersModule { }
