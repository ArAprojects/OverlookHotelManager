import chai from 'chai';
const expect = chai.expect;
import users from '../data/customer-data.js'
import orders from '../data/orders-data.js'
import rooms from '../data/room-data.js'
import bookings from '../data/bookings-data.js'
import Hotel from '../src/hotel.js';
import Customer from '../src/customer.js';


describe('Customer', function() {

  let customer
  let hotel;
  beforeEach(() => {
    customer = new Customer
    hotel = new Hotel(rooms, bookings, orders, users);
    hotel.addNewCustomer("billy")
  });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of Customer', () => {
    expect(customer).to.be.an.instanceof(Customer);
  });

  it('should be able to make new user instance of', () => {
    expect(hotel.currentCustomer).to.be.an.instanceof(Customer)
  });

  it('should be able to find this customers bookings', () => {
    expect(hotel.currentCustomer.customerBookings).to.eql([])
    hotel.createNewBooking(1)
    expect(hotel.currentCustomer.customerBookings.length).to.eql(1)
  });

  it('should be able to find this customers orders', () => {
    expect(hotel.currentCustomer.customerOrders).to.eql([])
    hotel.createNewOrder("cool-Sandwich", 10.00)
    expect(hotel.currentCustomer.customerOrders.length).to.eql(1)
  });

  it('should be able to calculate booking revenue', () => {
    hotel.createNewBooking(1)
    expect(hotel.currentCustomer.customerTotalBookingRevenue(hotel)).to.eql("265.03")
  });

  it('should be able to calculate totalOrderRevenue', () => {
    hotel.createNewOrder("food", 15.00)
    expect(hotel.currentCustomer.customerTotalSpentOnRoomService()).to.eql("15.00")
  });


});
