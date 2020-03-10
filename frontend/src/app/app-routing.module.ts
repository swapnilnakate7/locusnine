import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserResolver } from './shared/user.resolver';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "users"
  },
  {
    path: "users",
    component: UserListComponent,
    resolve : {users : UserResolver}
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
