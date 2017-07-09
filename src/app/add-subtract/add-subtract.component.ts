import { Component, OnInit } from '@angular/core';
import {UserService} from "../user-service";
import {User} from "../user";

@Component({
  selector: 'app-add-subtract',
  templateUrl: './add-subtract.component.html',
  styleUrls: ['./add-subtract.component.css']
})
export class AddSubtractComponent implements OnInit {
  title = 'Simple Adding and Subtracting';
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

}
