import { Component, OnInit, Input } from '@angular/core';
import {UserService} from "../user-service";
import {User} from "../user";
import {AddSubtract} from "./add-subtract";

@Component({
  selector: 'app-add-subtract',
  templateUrl: './add-subtract.component.html',
  styleUrls: ['./add-subtract.component.css']
})
export class AddSubtractComponent implements OnInit {
  title = 'Simple Adding and Subtracting';
  user: User;
  @Input() currentProblem: AddSubtract;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    this.currentProblem = new AddSubtract();
    this.currentProblem.generate();
  }

}
