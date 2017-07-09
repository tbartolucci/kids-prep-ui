import { Injectable } from '@angular/core';
import {User} from "./user";

@Injectable()
export class UserService {
  user: User;

  constructor() {}

  hasUser(): boolean{
    if( this.user instanceof User ){
      if( this.user.name.length > 0 ){
        return true;
      }
    }

    return false;
  }

  setUser(user: User){
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }
}
