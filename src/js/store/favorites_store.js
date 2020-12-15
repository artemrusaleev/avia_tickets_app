class Favorites {
  constructor() {
    this.store = [];
  }

  addTicketToStore(ticket) {
    let isInStore = this.isTicketInStore(ticket);

    if (isInStore) {
      M.toast({
        html: "Ticket had already added to favorite list",
        classes: "red darken-2",
      });
      return;
    }
    this.store.push(ticket);
    M.toast({
      html: "Ticket has added to favorite list",
      classes: "green lighten-1",
    });
  }

  isTicketInStore(ticket) {
    return this.store.some(
      (item) => JSON.stringify(item) === JSON.stringify(ticket)
    ); /* проверяем, находится ли билет в избранном */
  }

  removeTicketFromStore(ticket) {
    M.toast({
      html: "Ticket has removed from favorite list",
      classes: "green lighten-1",
    });
    this.store = this.store.filter((item) => {
      return JSON.stringify(item) !== JSON.stringify(ticket);
    });
  }
}

const favorites = new Favorites();

export default favorites;
