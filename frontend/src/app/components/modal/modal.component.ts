import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ROLES, STATUS_TYPES } from "../../core/constants";

import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { UserService } from "src/app/shared/user.service";
import { Router } from '@angular/router';

@Component({
  selector: "sn-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit {
  @Input() user?: any;
  @Output() modalClose = new EventEmitter<any>();

  listRoles = ROLES;
  listStatus = STATUS_TYPES;

  userDetail: FormGroup;
  roles: FormControl = new FormControl("", Validators.required);
  status: FormControl = new FormControl("", Validators.required);
  contactNumber: FormControl = new FormControl("", Validators.required);

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private userService: UserService
  ) {
    iconRegistry.addSvgIcon(
      "close",
      sanitizer.bypassSecurityTrustResourceUrl("assets/ico_close.svg")
    );
  }

  ngOnInit(): void {
    console.log("Edituser", this.user.role);
    let toSelectRole = this.listRoles.find(c => c.code === this.user.role);

    this.roles.setValue(toSelectRole);

    let toSelect = this.listStatus.find(c => c.code === this.user.status);

    this.status.setValue(toSelect);
    this.userDetail = new FormGroup({
      roles: this.roles,
      status: this.status,
      contactNumber: this.contactNumber
    });
  }

  submitEdit(isValid) {
    console.log("isEditValid", isValid);
    if (isValid) {
      this.user.role = this.roles.value.code;
      this.user.status = this.status.value.code;
      this.user.contact = this.contactNumber.value;

      this.userService.updateUser(this.user).subscribe((response: any) => {
        if (response.status == 201) {
          this.closeModal();
        }
      });
    }
  }

  deleteUser() {
    this.userService.deleteUser(this.user["_id"]).subscribe(
      response => {
        console.log("deleted..");
        this.closeModal();
      },
      err => {
        console.log("error while deleting");
      }
    );
  }

  closeModal() {
    this.modalClose.emit(true);
  }
}
