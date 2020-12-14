import "../css/style.css";
import locations from "./store/locations";
import "./plugins";
import formUI from "./views/form";
import currencyUI from "./views/currency";
import ticketsUI from "./views/tickets";
import { getParent } from "./helpers/parent";

document.addEventListener("DOMContentLoaded", (e) => {
  initApp();
  const form = formUI.form;
  // Events
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });
  ticketsUI.container.addEventListener("click", (e) => {
    let target = e.target;
    let ticket = JSON.parse(getParent(target, "ticket-parent"));
    console.log(ticket);
  });

  // handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    // собрать данные из инпутов
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.сurrencyValue;
    console.log(origin, destination, depart_date, return_date);

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);
  }
});
