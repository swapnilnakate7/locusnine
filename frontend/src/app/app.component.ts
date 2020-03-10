import { Component } from "@angular/core";
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "locusnine";
  isPopup: boolean = false;

  constructor(iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('logo',
     sanitizer.bypassSecurityTrustResourceUrl('assets/Logo.svg'));
     iconRegistry.addSvgIcon('dashboard',
     sanitizer.bypassSecurityTrustResourceUrl('assets/ico_dashboard.svg'));
     iconRegistry.addSvgIcon('users',
     sanitizer.bypassSecurityTrustResourceUrl('assets/ico_users.svg'));
     iconRegistry.addSvgIcon('sessionmanager',
     sanitizer.bypassSecurityTrustResourceUrl('assets/ico_sessionmanager.svg'));
     iconRegistry.addSvgIcon('notification',
     sanitizer.bypassSecurityTrustResourceUrl('assets/ico_notification.svg'));
     iconRegistry.addSvgIcon('user',
     sanitizer.bypassSecurityTrustResourceUrl('assets/ico_user.svg'));

     iconRegistry.addSvgIcon('down',
     sanitizer.bypassSecurityTrustResourceUrl('assets/ico_downarrow.svg'));
  }

  toggleAdduser() {
    console.log("ispopup 1", this.isPopup);
    this.isPopup = !this.isPopup;
    console.log("ispopup", this.isPopup);
  }
}
