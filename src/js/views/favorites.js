import currencyUI from "./currency";

class FavoritesUI {
  constructor(currency) {
    this.container = document.querySelector(".dropdown-content");
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
    this.deleteBtn = "";
  }

  renderFavoritesTickets(tickets) {
    this.clearContainer();

    let fragment = "";
    const currency = this.getCurrencySymbol();

    tickets.forEach((ticket) => {
      const template = FavoritesUI.favoriteTemplate(ticket, currency);
      fragment += template;
    });

    this.container.insertAdjacentHTML("afterbegin", fragment);
    this.btnDelete = document.querySelector(".delete-favorite");
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  static favoriteTemplate(ticket, currency) {
    return `
   <div class="favorite-item  d-flex align-items-start">
    <img src="${ticket.airline_logo}" class="favorite-item-airline-img"/>
    <div class="favorite-item-info d-flex flex-column">
      <div class="favorite-item-destination d-flex align-items-center">
        <div class="d-flex align-items-center mr-auto">
          <span class="favorite-item-city">${ticket.origin_name}</span>
          <i class="medium material-icons">flight_takeoff</i>
        </div>
        <div class="d-flex align-items-center">
          <i class="medium material-icons">flight_land</i>
          <span class="favorite-item-city">${ticket.destination_name}</span>
        </div>
      </div>
      <div class="ticket-time-price d-flex align-items-center">
        <span class="ticket-time-departure">${ticket.departure_at}</span>
        <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
      </div>
      <div class="ticket-additional-info">
        <span class="ticket-transfers">${
          ticket.transfers === 0
            ? "Без пересадок"
            : "Количество пересадок: " + ticket.transfers
        }</span>
        <span class="ticket-flight-number">Номер рейса: ${
          ticket.flight_number
        }</span>
      </div>
      <a class="waves-effect waves-light btn-small pink darken-3 delete-btn ml-auto" data-ticket-id='${JSON.stringify(
        ticket
      )}'>Delete</a>
    </div>
   </div>
  `;
  }
}

const favoritesUI = new FavoritesUI(currencyUI);

export default favoritesUI;
