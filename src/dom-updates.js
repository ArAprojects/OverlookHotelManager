import $ from 'jquery'

let domUpdates = {
   makeNewOrder(hotel) {
    $(".customer-orders-display").hide()
    $(".new-orders-box").show()
    $(".menu").text("")
    $(".selection").text("")
    let menuList = hotel.giveMenu()
    menuList.forEach(item => {
      $(".menu").append("<h5>" + item.food + " Cost: " + item.totalCost)
    })
  },

  mainSwitch() {
    $("section").hide()
    $(".main-page").show()
    $(".main-dash-display").show()
    $("button").css("background-color", "#585555");
    $("#main-page-button").css("background-color", "darkgrey")
  },

  orderSwitch() {
    $("section").hide()
    $(".orders").show()
    $("button").css("background-color", "#585555");
    $("#orders-button").css("background-color", "darkgrey")
  },

  customerSwitch() {
    $("section").hide()
    $(".customer").show()
    $("button").css("background-color", "#585555");
    $("#customer-button").css("background-color", "darkgrey")
  },

  bookingsSwitch() {
    $("section").hide()
    $(".rooms").show()
    $("button").css("background-color", "#585555");
    $("#rooms-button").css("background-color", "darkgrey")
  },

  showDisplays() {
    $(".new-booking-box").hide()
    $(".customer-bookings-display").show()
    $(".new-orders-box").hide()
  }




}

export default domUpdates
