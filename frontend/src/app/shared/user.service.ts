import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../core/models/user";
import { environment } from "src/environments/environment";
import { RESOURCE_PATH } from "../core/constants";
import { Observable, Subject } from "rxjs";
import { retry, catchError } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class UserService {
  users$: Subject<User[]> = new Subject<User[]>();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User> {
    return this.http
      .get<User>(environment.API_ENDPOINT + RESOURCE_PATH)
      .pipe(retry(1));
  }

  addUser(user: User) {
    return this.http.post(environment.API_ENDPOINT + RESOURCE_PATH, user);
  }

  updateUser(user: User) {
    return this.http.put(environment.API_ENDPOINT + RESOURCE_PATH, user);
  }

  deleteUser(usrId: string) {
    return this.http.delete(
      environment.API_ENDPOINT + RESOURCE_PATH + `/${usrId}`
    );
  }
}
