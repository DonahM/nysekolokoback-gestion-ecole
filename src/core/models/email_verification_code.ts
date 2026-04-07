export class EmailVerificationCode {
  code: number;
  constructor() {
    this.code = this.generateRandom4DigitNumber();
  }

  generateRandom4DigitNumber(): number {
    const min = 1000;
    const max = 9999;
    const random4DigitNumber =
      Math.floor(Math.random() * (max - min + 1)) + min;
    return random4DigitNumber;
  }
}
