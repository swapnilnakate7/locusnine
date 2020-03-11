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
  isAdd: boolean = false;
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
    console.log('event', e);
    console.log('isEdit', this.isEdit);
    if (e === 'delete') {
      console.log('deleteUserUsersList', e, this.userToEdit);
      this.userService.deleteUser(this.userToEdit['_id'])
        .subscribe((response) => {
          console.log('deletedUserWithServiceCall', response);
        });
    }

    if (e === 'update') {
      console.log('updateUserUsersList', e, this.userToEdit);
      this.userService.updateUser(this.userToEdit)
        .subscribe((response) => {
          console.log('updatedUser', response);
        });
    }

    if (e === 'edit') {
      console.log('editUserUsersList', e, this.userToEdit);
    }


  }

  editUser(e) {
    this.toggleEdit('edit');
    this.userToEdit = e;
  }

  addUser(e) {
    console.log('addUser', e);
    if (e.action === 'add') {
      this.userService.addUser(e.data)
        .subscribe((response) => {
          console.log('response', response);
          this.toggleAdd();
        });
    }

    if (e === 'close') {
      this.toggleAdd();
    }

  }

  toggleAdd() {
    this.isAdd = !this.isAdd;
  }
}
