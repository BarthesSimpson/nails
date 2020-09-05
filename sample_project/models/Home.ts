import Mortgage from "./Mortgage";
export default class Home {
  name: string;
  #value: number;
  #initialValue: number;
  #equity: number;
  #year: number = 0;
  #mortgage: Mortgage;

  constructor(name: string, price: number, mortgage: Mortgage) {
    this.name = name;
    this.#initialValue = price;
    this.#value = price;
    this.#mortgage = mortgage;
    this.#equity = mortgage.getDownPayment();
  }

  getValue(): number {
    return this.#value;
  }

  getPercentPaid(): number {
    return (
      (this.#initialValue - this.#mortgage.getBalance()) / this.#initialValue
    );
  }

  getRemainingDebt(): number {
    return this.#mortgage.getBalance();
  }

  getEquity(): number {
    return (this.#equity / this.#initialValue) * this.#value;
  }

  yearsTillPaid(): number {
    if (!this.#mortgage) {
      return 0;
    }
    return this.#mortgage.termInYears - this.#year;
  }

  getMonthlyPayment(): number {
    return (
      this.computeMonthlyPropertyTax() + this.#mortgage.getMonthlyPayment()
    );
  }

  computeMonthlyPropertyTax(): number {
    // TODO: get this from a config file
    const TAX_RATE = 0.0095;
    return (TAX_RATE / 12.0) * this.#value;
  }

  makePayment(amount: number) {
    // Keep it simple for now by just assuming we always pay an exact multiple of the total monthly payment
    const numMonths = amount / this.getMonthlyPayment();
    const tax = numMonths * this.computeMonthlyPropertyTax();
    this.#mortgage.makePayment(amount - tax);
    this.#equity = Math.min(
      this.#equity +
        numMonths * this.#mortgage.computeMonthlyPrincipalPayment(),
      this.#initialValue
    );
  }
}
