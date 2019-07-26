import Booking from "../src/booking"
import Order from "../src/order"
import Customer from "../src/customer"


class Hotel {
  constructor(rooms, bookings, orders, users) {
    this.room = rooms
    this.bookings = bookings
    this.orders = orders.map(order => new Order(order.userID, order.date, order.food, order.totalCost))
    this.users = users.map(el => new Customer(el.id, el.name, this.bookings, this.orders))
    this.todaysDate = null;
    this.currentCustomer = null;
  }


  giveTodaysDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.todaysDate = mm + '/' + dd + '/' + yyyy;
  }


  roomsAvailableforToday() {

  }

  addNewCustomer(name) {
    let id = this.users.length + 1
    this.currentCustomer = new Customer(id, name, this.bookings, this.orders)
    this.users.push(this.currentCustomer)
  }

  createNewBooking() {

  }

  createNewOrder(food, cost) {
    this.orders.push(new Order(this.currentCustomer.id, this.todaysDate, food, cost))
  }




}

export default Hotel
