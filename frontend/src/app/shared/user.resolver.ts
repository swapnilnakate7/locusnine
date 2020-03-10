import { Injectable } from "@angular/core";
import {Router} from '@angular/router';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { UserService } from "./user.service";

import { Observable, of } from "rxjs";

@Injectable({providedIn:'root'})
export class UserResolver implements Resolve<any> {
  constructor(private router: Router, private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.getUsers();
  }
}
