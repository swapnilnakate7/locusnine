import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserItemComponent } from "./components/user-item/user-item.component";
import { HttpClientModule } from "@angular/common/http";
import { ModalComponent } from "./components/modal/modal.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./modules/material.module";
import { TableComponent } from './components/table/table.component';
import { ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserItemComponent,
    ModalComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
