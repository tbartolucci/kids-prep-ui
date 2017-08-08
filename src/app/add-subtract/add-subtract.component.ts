import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import {UserService} from '../user-service';
import {User} from '../user';
import {AddSubtract} from './add-subtract';

@Component({
  selector: 'app-add-subtract',
  templateUrl: './add-subtract.component.html',
  styleUrls: ['./add-subtract.component.css']
})
export class AddSubtractComponent implements OnInit, AfterViewInit {
  @ViewChild('answer') answer: any;

  //title = 'Simple Adding and Subtracting';
  answerText: string;
  user: User;
  @Input() currentProblem: AddSubtract;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    this.currentProblem = new AddSubtract();
    this.currentProblem.generate();
  }

  ngAfterViewInit() {
    this.answer.nativeElement.focus();
  }

  submitAnswer(): void {
    if ( this.currentProblem.isCorrect() ) {
      this.answerText = 'Correct!';
    } else {
      this.answerText = 'Incorrect.  The correct answer is ' + this.currentProblem.realAnswer;
    }
  }

  nextProblem() {
    this.answerText = '';
    this.currentProblem.generate();
  }
}
