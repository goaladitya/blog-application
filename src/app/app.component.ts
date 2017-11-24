import { Component } from '@angular/core';
import { LoginService} from './login.service';
import {log} from 'util';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  userId = null ;

  onInit() {
  }
  constructor(private request: LoginService) {
    this.userId = sessionStorage.getItem('key');
    console.log(sessionStorage.getItem('key'));
  }

  login(loginId, password) {
    console.log(loginId);
    const user = {
      username: loginId,
      password: password
    };
    this.request.getAllUsers(user)
      .subscribe(data => {
        for ( const oneUser in data ) {
          if (data[oneUser].username === loginId && data[oneUser].password === password) {
            this.userId = data[oneUser].id;
            sessionStorage.setItem('key', data[oneUser].id);
            break;
          }
        }
      });
  }

  signup(newId, password1, password2) {
    console.log(newId);
    console.log('in signup');
    const newUser = {
      username: newId,
      password: password1,
      likes: []
    };
    this.request.postNewUser(newUser)
      .subscribe(data => {
        console.log('Posted');
      });
  }
}
