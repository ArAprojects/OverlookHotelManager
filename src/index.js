import $ from 'jquery';
import './css/base.scss';
import './images/office.png'
import Hotel from '../src/hotel.js'
var hotel


Promise.all([
  fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms").then(response => response.json()),
  fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings").then(response => response.json()),
  fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices").then(response => response.json()),
  fetch("https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users").then(response => response.json())]
).then(data => makeHotel(data[0].rooms, data[1].bookings, data[2].roomServices, data[3].users))

function makeHotel(rooms, bookings, roomService, users) {
   hotel = new Hotel(rooms, bookings,roomService, users)
   // hotel.giveTodaysDate()
   hotel.giveallUsersBookingsandOrders()
   displayOrdersToday()

   // hotel.addNewCustomer("bill")
   // hotel.createNewOrder("yummyfood", 12.55)
   console.log(hotel.users)
   // hotel.currentCustomer.findCurrentCustomerData()
   // console.log(hotel.roomsAvailableforToday())
   // console.log(hotel.percentRoomsOccupiedToday())
   // console.log(hotel.roomsBookedToday())
   // console.log(hotel.totalRevenueForToday())
   // hotel.findCustomerByName("Brook Christiansen")
   console.log(hotel.ordersToday())
   $(".date-display").text(hotel.todaysDate)
   $(".occupancy-display").text(`There are ${hotel.roomsAvailableforToday()} rooms available with an occupancy of ${hotel.percentRoomsOccupiedToday()} percent!`)
   $(".revenue-display").text(`${hotel.totalRevenueForToday()}$ was made today.`)
   // console.log(hotel.currentCustomer)
}

//
// - Breakdown of dates and dollar amounts for room service
// - Total dollar amount spent on room service for a particular day
// - Total dollar amount spent on room service for all days ever



function displayCustomerSpecificOrders() {
  if (hotel.currentCustomer.customerOrders === null) {
    $(".customer-orders-message").text(`Sorry, ${hotel.currentCustomer.name} doesnt have any orders yet`)
  }
  else {
    $(".customer-orders-message").text(`${hotel.currentCustomer.name} orders are...`)
    $(".specific-order-table")
  }
}

function hideNonSpecificDisplays() {
  if (hotel.currentCustomer !== null)
   {
    $(".general-display").hide()
  }
}

  function showSpecificDisplays() {
    displayCustomerSpecificOrders()
  }




function displayOrdersToday() {
  if (hotel.ordersToday().length === 0) {
    $(".no-order-display").text("There are no orders today")
  }
  else {
      $(".order-display").text("Todays orders are...")
      $(".order-table").append("<tr>")
      $(".order-table").append("<td>" + "ID")
      $(".order-table").append("<td>" + "Food")
      $(".order-table").append("<td>" + "Date")
      $(".order-table").append("<td>" + "TotalCost")
    hotel.ordersToday().forEach(order => {
      $(".order-table").append("<tr>")
      $(".order-table").append("<td>" + order.userID)
      $(".order-table").append("<td>" + order.food)
      $(".order-table").append("<td>" + order.date)
      $(".order-table").append("<td>" + order.totalCost)
    })
  }
}

$("#customer-search-button").on("click", () => {
  $("#customer-search-input").on("keyup", () => {
    let name = $("#customer-search-input").val()
     hotel.findCustomerByName(name)
  })
  $(".customer-name-display").text(hotel.currentCustomer.name  + hotel.currentCustomer.id)
  $(".customer-name").text(`Customer selected:${hotel.currentCustomer.name}`)
  hideNonSpecificDisplays()
  showSpecificDisplays()
})

  let name1
$("#new-customer-name-input").on("keyup", () => {
    name1 = $("#new-customer-name-input").val()
})

$("#make-new-customer-name-button").on("click", () => {
  hotel.addNewCustomer(name1)
  $("#new-customer-name-input").val('')
  $(".customer-name-display").text(hotel.currentCustomer.name  + hotel.currentCustomer.id)
    $(".customer-name").text(`Customer selected:${hotel.currentCustomer.name}`)
    hideNonSpecificDisplays()
    showSpecificDisplays()
})

$("#main-page-button").on("click", () => {
  $("section").hide()
  $(".main-page").show()
  $("button").css("background-color", "#585555");
  $("#main-page-button").css("background-color", "darkgrey")
})

$("#orders-button").on("click", () => {
  $("section").hide()
  $(".orders").show()
  $("button").css("background-color", "#585555");
  $("#orders-button").css("background-color", "darkgrey")
})

$("#rooms-button").on("click", () => {
  $("section").hide()
  $(".rooms").show()
  $("button").css("background-color", "#585555");
  $("#rooms-button").css("background-color", "darkgrey")
})

$("#customer-button").on("click", () => {
  $("section").hide()
  $(".customer").show()
  $("button").css("background-color", "#585555");
  $("#customer-button").css("background-color", "darkgrey")
})
