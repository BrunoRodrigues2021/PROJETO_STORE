import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersListComponent} from "./components/users-list/users-list.component";
import {UsersAddComponent} from "./components/users-add/users-add.component";

const routes: Routes = [
  {path: '', component: UsersListComponent},
  {path: 'create', component: UsersAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ManageUsersRoutingModule { }
