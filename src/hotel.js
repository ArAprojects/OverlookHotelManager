import Booking from "../src/booking"
import Order from "../src/order"
import Customer from "../src/customer"


class Hotel {
  constructor(rooms, bookings, orders, users) {
    this.room = rooms
    this.bookings = bookings.map(booking => new Booking(booking.userID, booking.date, booking.roomNumber))
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
    this.todaysDate = yyyy + '/' + mm + '/' + dd;
  }


  roomsAvailableforToday() {
    return this.bookings.filter(booking => booking.date === this.todaysDate)
  }

//   - Total Rooms Available for today's date
// - Total revenue for today's date
// - Percentage of rooms occupied for today's date

  addNewCustomer(name) {
    let id = this.users.length + 1
    this.currentCustomer = new Customer(id, name, this.bookings, this.orders)
    this.users.push(this.currentCustomer)
  }

  createNewBooking(roomNumber) {
    this.bookings.push(new Booking(this.currentCustomer.id, this.todaysDate, roomNumber))
  }

  createNewOrder(food, cost) {
    this.orders.push(new Order(this.currentCustomer.id, this.todaysDate, food, cost))
  }




}

export default Hotel
