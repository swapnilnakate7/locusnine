import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { User } from "src/app/core/models/user";

import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import {
  ROLES,
  STATUS_TYPES,
  ROLES_MAP,
  STATUS_TYPES_MAP
} from "src/app/core/constants";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "sn-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnInit {
  @Input() userList?: User[];

  searchForm: FormGroup;
  searchBox: FormControl = new FormControl();

  dataSource;

  @Output() editEvent = new EventEmitter<User>();

  displayedColumns: string[] = ["name", "email", "role", "status", "action"];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
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
    iconRegistry.addSvgIcon(
      "users",
      sanitizer.bypassSecurityTrustResourceUrl("assets/ico_users.svg")
    );
    iconRegistry.addSvgIcon(
      "adduser",
      sanitizer.bypassSecurityTrustResourceUrl("assets/ico_add.svg")
    );
    iconRegistry.addSvgIcon(
      "search",
      sanitizer.bypassSecurityTrustResourceUrl("assets/ico_search.svg")
    );
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.userList);
    this.dataSource.sort = this.sort;
    // this.show = true;
    this.searchForm = new FormGroup({
      searchText: this.searchBox
    });
    console.log("userss", this.dataSource, Date());
  }

  edit(el: User) {
    console.log("edit", el);
    this.editEvent.emit(el);
  }

  getRole(roleCode): string {
    let roleVal = "";
    ROLES.forEach(role => {
      if (role.code === roleCode) {
        roleVal = role.value;
      }
    });
    return roleVal;
  }

  getStatus(statusCode): string {
    let statusVal = "";
    STATUS_TYPES.forEach(role => {
      if (role.code === statusCode) {
        statusVal = role.value;
      }
    });
    return statusVal;
  }

  search() {
    const initList = localStorage.getItem("initialList");

    if (!initList) {
      localStorage.setItem("initialList", JSON.stringify(this.userList));
    }

    let searchText = this.searchBox.value;
    if (!searchText || searchText === "") {
      const initList = localStorage.getItem("initialList");
      this.userList = JSON.parse(initList);
      this.dataSource = new MatTableDataSource(this.userList);
      return;
    }
    const filteredArr = this.userList.filter(u => {
      return (
        u.name.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !=
          -1 ||
        u.email.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !=
          -1 ||
        ROLES_MAP[u.role]
          .toLocaleLowerCase()
          .indexOf(searchText.toLocaleLowerCase()) > -1 ||
        STATUS_TYPES_MAP[u.status]
          .toLocaleLowerCase()
          .indexOf(searchText.toLocaleLowerCase()) > -1
      );
    });
    this.dataSource = new MatTableDataSource(filteredArr);
  }
}
