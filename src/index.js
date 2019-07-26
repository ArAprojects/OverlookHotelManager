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
   hotel.giveTodaysDate()
   hotel.addNewCustomer("bill")
   hotel.createNewOrder("yummyfood", 12.55)
   hotel.createNewBooking(12345)
   hotel.currentCustomer.findCurrentCustomerData()
   console.log(hotel.roomsAvailableforToday())
   console.log(hotel.todaysDate)
   $(".date-display").text(hotel.todaysDate)
   console.log(hotel.currentCustomer)
}


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
