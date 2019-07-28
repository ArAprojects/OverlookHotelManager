import Booking from "../src/booking"
import Order from "../src/order"
import Customer from "../src/customer"


class Hotel {
  constructor(rooms, bookings, orders, users) {
    this.rooms = rooms
    this.bookings = bookings.map(booking => new Booking(booking.userID, booking.date, booking.roomNumber))
    this.orders = orders.map(order => new Order(order.userID, order.date, order.food, order.totalCost))
    this.users = users.map(el => new Customer(el.id, el.name, this.bookings, this.orders))
    this.todaysDate = null;
    this.currentCustomer = null;
  }

  giveallUsersBookingsandOrders() {
    this.users.forEach(user => user.findCurrentCustomerData())
  }


  giveTodaysDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.todaysDate = yyyy + '/' + mm + '/' + dd;
  }


  roomsBookedToday() {
    return this.bookings.filter(booking => booking.date === this.todaysDate).length
  }

  roomsAvailableforToday() {
    return this.rooms.length - this.bookings.filter(booking => booking.date === this.todaysDate).length
  }

  findMostPopularDate() {
    let allDates = this.bookings.map(booking => booking.date)
    let uniqueDates = [...new Set(allDates)]
    let filteredDates = uniqueDates.map(date1 => {
      return this.bookings.filter(booking => booking.date === date1)
    })
    let finalDate = filteredDates.sort(  (a, b) => b.length - a.length )[0][0].date
     return `The most popular date is ${finalDate} with ${filteredDates[0].length} rooms booked.`
  }

  findLeastPopularDate() {
    let allDates = this.bookings.map(booking => booking.date)
    let uniqueDates = [...new Set(allDates)]
    let filteredDates = uniqueDates.map(date1 => {
      return this.bookings.filter(booking => booking.date === date1)
    })
    let finalDate = filteredDates.sort(  (a, b) => a.length - b.length )[0][0].date
     return `The least popular date is ${finalDate} with ${filteredDates[0].length} rooms booked.`
  }


  percentRoomsOccupiedToday() {
      let occRooms = this.roomsBookedToday()
      return ((occRooms / this.rooms.length) * 100).toFixed(0)
  }

  totalOrderRevenue() {
    let ordersToday = this.orders.filter(order => order.date === this.todaysDate)
     return ordersToday.reduce((acc, total) => acc + total.totalCost, 0)
  }

  ordersToday(date) {
    return this.orders.filter(order => order.date === date)
  }

  availableBookingsByDate(date) {
    let booked = this.bookings.filter(booking => booking.date === date)
    let bookedNum = booked.map(booking => booking.roomNumber)
    return this.rooms.filter(room => !bookedNum.includes(room.number))
  }

  totalBookingRevenue() {
    let bookingsToday = this.bookings.filter(booking => booking.date === this.todaysDate)
    let roomsbooked = bookingsToday.map(booking => this.rooms.find(room => room.number === booking.roomNumber))
     return roomsbooked.reduce((acc, total) => acc + total.costPerNight, 0)
  }

  totalRevenueForToday() {
    return (this.totalOrderRevenue() + this.totalBookingRevenue()).toFixed(2)
  }

  addNewCustomer(name) {
    let id = this.users.length + 1
    this.currentCustomer = new Customer(id, name, this.bookings, this.orders)
    this.users.push(this.currentCustomer)
  }

  createNewBooking(roomNumber) {
    this.bookings.push(new Booking(this.currentCustomer.id, this.todaysDate, roomNumber))
    this.currentCustomer.findCurrentCustomerData()
  }

  createNewOrder(food, cost) {
    this.orders.push(new Order(this.currentCustomer.id, this.todaysDate, food, cost))
    this.currentCustomer.findCurrentCustomerData()
  }

  findCustomerByName(name) {
    let foundUser = this.users.find(customer => customer.name === name)
    this.currentCustomer = foundUser
  }

  doesCustomerHaveBookingToday() {
    if (this.currentCustomer.customerBookings.filter(booking => booking.date === this.todaysDate).length === 0) {
      return null
    }
    else {
      return this.currentCustomer.customerBookings.filter(booking => booking.date === this.todaysDate)
    }
  }

}

export default Hotel
