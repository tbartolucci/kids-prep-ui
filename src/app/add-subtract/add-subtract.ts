export class AddSubtract {
  x: number;
  y: number;
  sign: string;
  answer: string;
  realAnswer: number;

  calculateRealAnswer(): number {
    if ( this.sign === '+') {
      return this.x + this.y;
    }else if ( this.sign === '-' ) {
      return this.x - this.y;
    }

    return 0;
  }

  generate(): void {
    this.x = Math.floor(Math.random() * 10) + 1  ;
    this.y = Math.floor(Math.random() * 10) + 1  ;

    this.sign = '+';
    this.realAnswer = this.calculateRealAnswer();
    this.answer = '';
  }

  isCorrect(): boolean {
    if ( parseInt(this.answer, 10) === this.realAnswer ) {
      return true;
    }

    return false;
  }
}
