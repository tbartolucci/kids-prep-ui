import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../user-service";
import {User} from "../user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Summer Break School Prep';
  @Input() user: User;

  constructor(
    private router: Router,
    private userService: UserService) {

    this.user = new User();
  }

  ngOnInit() {
  }

  login() {
    this.userService.setUser(this.user);
    this.router.navigate(['/add-subtract']);
  }
}
