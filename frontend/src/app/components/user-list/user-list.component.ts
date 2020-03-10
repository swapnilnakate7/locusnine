import { Component, OnInit } from "@angular/core";
import { User } from "src/app/core/models/user";
import { UserService } from "src/app/shared/user.service";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Sort } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "sn-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  sortedData: User[];
  isEdit: boolean = false;
  userToEdit: User;
  constructor(
    private userService: UserService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) {
    iconRegistry.addSvgIcon(
      "active",
      sanitizer.bypassSecurityTrustResourceUrl("assets/ico_active.svg")
    );
    iconRegistry.addSvgIcon(
      "inactive",
      sanitizer.bypassSecurityTrustResourceUrl("assets/ico_inactive.svg")
    );
    iconRegistry.addSvgIcon(
      "pending",
      sanitizer.bypassSecurityTrustResourceUrl("assets/ico_pending.svg")
    );
    iconRegistry.addSvgIcon(
      "edit",
      sanitizer.bypassSecurityTrustResourceUrl("assets/ico_edit.svg")
    );
  }

  ngOnInit(): void {
    console.log(
      "usersfsjkf",
      (this.users = this.route.snapshot.data["users"]),
      Date()
    );
  }

  toggleEdit(e) {
    this.isEdit = !this.isEdit;
    console.log('event',e);
    console.log('isEdit',this.isEdit);
    if(e){
      this.router.navigateByUrl('/');
    }
  }

  editUser(e) {
    this.toggleEdit(e);
    this.userToEdit = e;
  }
}
