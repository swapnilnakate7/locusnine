import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ROLES, STATUS_TYPES } from '../../core/constants';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: "sn-modal",
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() user?: any;
  @Output() modalClose = new EventEmitter<any>();

  listRoles = ROLES;
  listStatus = STATUS_TYPES;

  userDetail: FormGroup;
  name: FormControl = new FormControl('', Validators.required);
  email: FormControl = new FormControl('', Validators.required);
  roles: FormControl = new FormControl('', Validators.required);
  status: FormControl = new FormControl('', Validators.required);
  contactNumber: FormControl = new FormControl('', Validators.required);

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private userService: UserService
  ) {
    iconRegistry.addSvgIcon(
      'close',
      sanitizer.bypassSecurityTrustResourceUrl('assets/ico_close.svg')
    );
  }

  ngOnInit(): void {

    this.userDetail = new FormGroup({
      roles: this.roles,
      status: this.status,
      contactNumber: this.contactNumber
    });

    if (this.user) {
      console.log('Edituser', this.user.role);
      const toSelectRole = this.listRoles.find(c => c.code === this.user.role);

      this.roles.setValue(toSelectRole);

      const toSelect = this.listStatus.find(c => c.code === this.user.status);

      this.status.setValue(toSelect);
    } else {
      this.userDetail.addControl('name', this.name);
      this.userDetail.addControl('email', this.email);

    }


    console.log('this.userDetaill', this.userDetail);



  }

  submitEdit(isValid) {
    console.log('isEditValid', isValid);
    if (isValid) {

      if (this.user) {
        this.user.role = this.roles.value.code;
        this.user.status = this.status.value.code;
        this.user.contact = this.contactNumber.value;
        this.closeModal('update');
      } else {
        const user = {
          name: this.name.value,
          email: this.name.value,
          role: this.roles.value.code,
          status: this.status.value.code,
          contact: this.contactNumber.value

        };
        this.modalClose.emit({ action: 'add', data: user });
      }



    }
  }

  deleteUser() {
    this.closeModal('delete');
  }

  closeModal(action) {
    this.modalClose.emit(action);
  }
}
