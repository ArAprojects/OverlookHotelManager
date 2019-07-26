

class Hotel {
  constructor(rooms, bookings, users, roomService) {
    this.room = rooms
    this.bookings = bookings
    this.users = users
    this.roomService = roomService
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


  addNewCustomer() {

  }

  createNewBooking() {

  }




}

export default Hotel
