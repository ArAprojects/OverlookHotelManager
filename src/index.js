import $ from 'jquery';
import './css/base.scss';
import './images/office.png'
import Hotel from '../src/hotel.js'
import domUpdates from '../src/dom-updates.js'
var hotel

Promise.all([
  fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms").then(response => response.json()),
  fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings").then(response => response.json()),
  fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices").then(response => response.json()),
  fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users").then(response => response.json())]
).then(data => makeHotel(data[0].rooms, data[1].bookings, data[2].roomServices, data[3].users))

function makeHotel(rooms, bookings, roomServices, users) {
  hotel = new Hotel(rooms, bookings, roomServices, users)
  hotel.giveTodaysDate()
  hotel.giveallUsersBookingsandOrders()
  displayOrdersToday(hotel.todaysDate)
  onLoad()
}

$("#orders-button").on("click", () => {
  domUpdates.orderSwitch()
})

$("#rooms-button").on("click", () => {
  domUpdates.bookingsSwitch()
})

$("#customer-button").on("click", () => {
  domUpdates.customerSwitch()
})

function onLoad() {
  $(".date-display").text(`Welcome, todays date is: ${hotel.todaysDate}`)
  $(".occupancy-display").text(`There are ${hotel.roomsAvailableforToday()} rooms available today with an occupancy of ${hotel.percentRoomsOccupiedToday()} percent!`)
  $(".revenue-display").text(`${hotel.totalRevenueForToday()}$ was made today.`)
  $(".popular-display").text(hotel.findMostPopularDate())
  $(".unpopular-display").text(hotel.findLeastPopularDate())
}

$("#main-page-button").on("click", () => {
  domUpdates.mainSwitch()
  $(".revenue-display").text(`${hotel.totalRevenueForToday()}$ was made today.`)
  $(".occupancy-display").text(`There are ${hotel.roomsAvailableforToday()} rooms available today with an occupancy of ${hotel.percentRoomsOccupiedToday()} percent!`)
})

function submitNewBooking() {
  let roomNumber = parseInt($(".make-booking-input").val())
  hotel.createNewBooking(roomNumber)
  $(".make-booking-input").val("")
  $(".new-booking-box").hide()
  $(".customer-bookings-display").show()
  displayCustomerSpecificBookings()
}

$(".make-booking-button").on("click", () => {
  submitNewBooking()
})

function lookForNewBooking() {
  $(".customer-bookings-display").hide()
  $(".new-booking-box").show()
  displayAvailableBookings(hotel.todaysDate)
}

$(".new-booking-button").on("click", () => {
  lookForNewBooking()
})

$(".new-orders-button").on("click", () => {
  domUpdates.makeNewOrder(hotel)
})

let newval
let costVal
$(".menu").on("click", (e) => {
  let value = $(e.target).closest($("h5")).text()
  newval = value.split("Cost")[0]
  costVal = value.split(" ")[4]
  $(".selection").text(`Your selection is: ${newval}`)
})

$(".confirm").on("click", () => {
  hotel.createNewOrder(newval, parseInt(costVal))
  displayCustomerSpecificOrders()
})

$(".confirm").on("click", () => {
  $(".new-orders-box").hide()
  $(".customer-orders-display").show()
})

function checkBoxManager(e) {
  $(".available-rooms-box").text('')
  let value = $(e.target).closest($("input:checkbox")).val()
  $(e.target).closest($("input:checkbox")).prop("checked", true)
  let available = hotel.availableRoomsByDate(hotel.todaysDate)
  let filtered =  available.filter(room => room.roomType === value)
  filtered.forEach(room => {
    $(".available-rooms-box").append("<h5>" + " Number: " + room.number
       + " Type: " + room.roomType + " Bidet: " + room.bidet + " Cost " + room.costPerNight)
  })
}

$("input:checkbox").on("click", (e) => {
  $("input:checkbox").prop("checked", false)
  checkBoxManager(e)
})

function hideNonSpecificDisplays() {
  if (hotel.currentCustomer !== null) {
    $(".general-display").hide()
  }
}

function showSpecificDisplays() {
  displayCustomerSpecificOrders()
  displayCustomerSpecificBookings()
  domUpdates.showDisplays()
}

function displayAvailableBookings(date1) {
  $(".available-rooms-box").show()
  $(".available-rooms-box").text('')
  let availrooms = hotel.availableRoomsByDate(date1)
  availrooms.forEach(room => {
    $(".available-rooms-box").append("<h5>" + " Number: " + room.number
     + " Type: " + room.roomType + " Bidet: " + room.bidet + " Cost: " + room.costPerNight)
  })
}

function searchForOrders() {
  let date = $(".order-search-input").val()
  displayOrdersToday(date)
}

function searchForBookings() {
  let date = $(".booking-search-input").val()
  displayAvailableBookings(date)
}

function searchForCustomer () {
  let name = $("#customer-search-input").val()
  hotel.findCustomerByName(name)
  domUpdates.clearTable()
  $(".customer-name").text(`Customer selected:${hotel.currentCustomer.name}`)
  hideNonSpecificDisplays()
  showSpecificDisplays()
}

function makeNewCustomer() {
  let name = $("#new-customer-name-input").val()
  hotel.addNewCustomer(name)
  $("#new-customer-name-input").val('')
  domUpdates.clearTable()
  $(".customer-name").text(`Customer selected:${hotel.currentCustomer.name}`)
  hideNonSpecificDisplays()
  showSpecificDisplays()
}

$(".booking-search-button").on("click", () => {
  searchForBookings()
});

$(".order-search-button").on("click", () => {
  searchForOrders()
})

$("#customer-search-button").on("click", () => {
  searchForCustomer()
})

$("#make-new-customer-name-button").on("click", () => {
  makeNewCustomer()
  $(".customer-bookings-list-box").hide()
})


function makeNewBooking() {
  if (hotel.doesCustomerHaveBookingToday() === null) {
    $(".customer-bookings-message").text(`Looks like ${hotel.currentCustomer.name} has no bookings for today, click the button below to get a new booking started`)
  } else {
    $(".customer-bookings-message").text(`${hotel.currentCustomer.name} has booked room number ${hotel.doesCustomerHaveBookingToday()[0].roomNumber} for today`)
    $(".new-booking-button").hide()
  }
}

function displayCustomerSpecificBookings() {
  $(".customer-bookings-list-box").text("")
  $(".customer-bookings-total").text("")
  $(".customer-bookings-message-2").text("")
  if (hotel.currentCustomer.customerBookings === null || hotel.currentCustomer.customerBookings.length === 0) {
    makeNewBooking()
    $(".new-booking-button").show()
  } else {
    makeNewBooking()
    $(".customer-bookings-message-2").text(`${hotel.currentCustomer.name} bookings are...`)
    $(".new-booking-button").show()
    $(".customer-bookings-list-box").show()
    hotel.currentCustomer.customerBookings.forEach(booking => {
      $(".customer-bookings-list-box").append("<h5>" + "Date Booked: " + booking.date + " Room number: " + booking.roomNumber)
    })
    $(".customer-bookings-total").text(`Total spent: $${hotel.currentCustomer.customerTotalBookingRevenue(hotel)}`)
  }
}

function displayOrdersToday(date) {
  $(".order-table").text('')
  if (hotel.ordersToday(date).length === 0) {
    $(".no-order-display").text("There are no orders today")
  } else {
    $(".no-order-display").text('')
    $(".order-display").text(`Orders for ${date}`)
    $(".order-table").append("<tr>")
    $(".order-table").append("<td>" + "ID")
    domUpdates.tableAppend()
    hotel.ordersToday(date).forEach(order => {
      $(".order-table").append("<tr>")
      $(".order-table").append("<td>" + order.userID)
      $(".order-table").append("<td>" + order.food)
      $(".order-table").append("<td>" + order.date)
      $(".order-table").append("<td>" + order.totalCost)
    })
  }
}

function displayCustomerSpecificOrders() {
  $(".specific-order-table").html("")
  if (hotel.currentCustomer.customerOrders === null || hotel.currentCustomer.customerOrders.length === 0 ) {
    $(".customer-orders-message").text(`Sorry, ${hotel.currentCustomer.name} doesnt have any orders yet`)
    $(".new-orders-button").show()
  } else {
    $(".specific-order-table").html("")
    $(".customer-orders-message").text(`${hotel.currentCustomer.name} orders are...`)
    $(".specific-order-table").append("<tr>")
    domUpdates.tableAppend()
    hotel.currentCustomer.customerOrders.forEach(order => {
      $(".specific-order-table").append("<tr>")
      $(".specific-order-table").append("<td>" + order.food)
      $(".specific-order-table").append("<td>" + order.date)
      $(".specific-order-table").append("<td>" + order.totalCost)
    })
    $(".specific-order-total-display").text(`Total spent: $${hotel.currentCustomer.customerTotalSpentOnRoomService()}`)
  }
}
