class Customer {
  constructor (id, name, allBookings, allOrders) {
    this.id = id;
    this.name = name;
    this.allBookings = allBookings || []
    this.allOrders = allOrders || []
    this.customerBookings = null || []
    this.customerOrders = null || []
  }


  findCurrentCustomerData() {
    this.findThisCustomerBookings()
    this.findThisCustomerOrders()
  }

  findThisCustomerBookings() {
    this.customerBookings = this.allBookings.filter(booking => booking.userID === this.id)
  }

  findThisCustomerOrders() {
    this.customerOrders = this.allOrders.filter(order => order.userID === this.id)
  }

  customerTotalSpentOnRoomService() {
    return (this.customerOrders.reduce( (acc, total) => acc + total.totalCost, 0)).toFixed(2)
  }


}


export default Customer
