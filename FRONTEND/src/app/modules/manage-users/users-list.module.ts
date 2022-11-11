import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersAddComponent} from './components/users-add/users-add.component';
import {UsersListComponent} from "./components/users-list/users-list.component";
import {ManageUsersRouting} from "./manage-users.routing";



@NgModule({
  declarations: [
    UsersListComponent,
    UsersAddComponent
  ],
  imports: [
    CommonModule,
    ManageUsersRouting
  ]
})
export class UsersListModule { }
