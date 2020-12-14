import "../css/style.css";
import locations from "./store/locations";
import favorites from "./store/favorites_store";
import "./plugins";
import formUI from "./views/form";
import currencyUI from "./views/currency";
import ticketsUI from "./views/tickets";
import favoritesUI from "./views/favorites";

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
    let parent = target.parentNode;
    if (parent.classList.contains("fav-btn")) {
      let ticket = JSON.parse(
        parent.closest(".ticket-parent").dataset.ticketId
      );
      favorites.addTicketToStore(ticket);
      favoritesUI.renderFavoritesTickets(favorites.store);
      target.parentNode.classList.add("disabled");
    }
  });

  favoritesUI.container.addEventListener("click", (e) => {
    let target = e.target;
    if (target.classList.contains("delete-btn")) {
      let ticket = JSON.parse(target.dataset.ticketId);
      favorites.removeTicketFromStore(ticket);
      favoritesUI.renderFavoritesTickets(favorites.store);
      ticketsUI.renderedTickets.forEach((el) => {
        if (el.dataset.ticketId === JSON.stringify(ticket)) {
          el.querySelector(".fav-btn").classList.remove("disabled");
        }
      });
    }
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

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);
    if (favorites.store.length) {
      favoritesUI.renderFavoriteTickets(favorites.store);
    }
  }
});
