import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

const BASE_URL = 'http://localhost:3000/users/';
const header = {headers: new Headers({'content-type': 'application/json'})}

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  postNewUser(userInfo) {
    return this.http.post(BASE_URL, userInfo, header)
      .map(res => res.json());
  }

  getAllUsers(userInfo) {
    return this.http.get(BASE_URL, userInfo)
      .map(res => res.json());
  }

  getUserById(id) {
    return this.http.get(BASE_URL + id)
      .map(res => res.json());
  }

  putLike(userInfo , id) {
    return this.http.put(BASE_URL + id, userInfo, header)
      .map(res => res.json());
  }


}
