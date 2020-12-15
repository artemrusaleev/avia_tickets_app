class CurrencyUI {
  constructor() {
    this.currency = document.getElementById("currency");
    this.dictionary = {
      USD: "$",
      EUR: "€",
      RUB: "₽",
    };
  }

  get сurrencyValue() {
    return this.currency.value;
  }

  getCurrencySymbol() {
    return this.dictionary[this.сurrencyValue];
  }
}

const currencyUI = new CurrencyUI();

export default currencyUI;
