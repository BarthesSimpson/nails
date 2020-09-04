import Mortgage from "./Mortgage";
export default class Home {
  name: string;
  #value: number;
  #initial_value: number;
  #equity: number;
  #year: number = 0;
  #mortgage: Mortgage;

  constructor(name: string, price: number, mortgage: Mortgage) {
    this.name = name;
    this.#initial_value = price;
    this.#value = price;
    this.#mortgage = mortgage;
    this.#equity = mortgage.getDownPayment();
  }

  getValue(): number {
    return this.#value;
  }
}

// double getPercentPaid() const;
// double getRemainingDebt() const;
// double getEquity() const;
// double getMonthlyPayment() const;
// double computeMonthlyPropertyTax() const;
// int yearsTillPaid() const;
// void incrementYear(double appreciationPercent);
// void makePayment(const double amount);
