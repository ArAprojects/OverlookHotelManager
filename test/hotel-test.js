// - Total Rooms Available for today's date
import chai from 'chai';
const expect = chai.expect;
import users from '../data/customer-data.js'
import orders from '../data/orders-data.js'
import rooms from '../data/room-data.js'
import bookings from '../data/bookings-data.js'
import Hotel from '../src/hotel.js';
import Customer from '../src/customer.js';


describe('Hotel', function() {

  let hotel;
  beforeEach(() => {
    hotel = new Hotel(rooms, bookings, orders, users);
    hotel.addNewCustomer("billy")
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of Hotel', () => {
    expect(hotel).to.be.an.instanceof(Hotel);
  });


  it('should be able to get todays date', () => {
    hotel.giveTodaysDate()
    expect(hotel.todaysDate).to.be.a('string')
  });

  it('should be able to make new user instance of', () => {
    expect(hotel.currentCustomer).to.be.an.instanceof(Customer)
  });

  it('new user should be able to make an order', () => {
    hotel.createNewOrder("yum-Sandwhich", 12.55)
    hotel.createNewOrder("ok-Sandwhich", 12.55)
    expect(hotel.currentCustomer.customerOrders.length).to.eql(2)
  });

  it('new user should be able to make a booking', () => {
    hotel.createNewBooking(1)
    hotel.createNewBooking(2)
    hotel.createNewBooking(3)
    expect(hotel.currentCustomer.customerBookings.length).to.eql(3)
  });

  it('should be able to calculate total order revenue', () => {
    hotel.createNewOrder("yum-Sandwhich", 12.55)
    expect(hotel.totalOrderRevenue()).to.eql(12.55)
  });

  it('should be able to calculate booking revenue', () => {

    hotel.createNewBooking(1)
    expect(hotel.totalBookingRevenue()).to.eql(265.03)
  });

  it('should be able to calculate total revenue', () => {
    hotel.createNewBooking(1)
    hotel.createNewOrder("yum-Sandwhich", 12.55)
    expect(hotel.totalRevenueForToday()).to.eql('277.58')
  });

  it('should be able to findOrders by date', () => {
    expect(hotel.ordersToday("2019/07/31").length).to.eql(3)
  });

  it('should be able to find available rooms by date', () => {
    expect(hotel.availableRoomsByDate("2019/07/31").length).to.eql(48)
  });

  it('should be able to find customer by name', () => {
    hotel.addNewCustomer("joe")
    expect(hotel.currentCustomer.name).to.eql("joe")
    hotel.findCustomerByName("billy")
    expect(hotel.currentCustomer.name).to.eql("billy")
  });

  it('should be able to tell if a customer has bookings today', () => {
    expect(hotel.doesCustomerHaveBookingToday()).to.eql(null)
    hotel.createNewBooking(1)
    expect(hotel.doesCustomerHaveBookingToday().length).to.eql(1)
  });

  it('should be able to tell percent occupancy', () => {
    hotel.createNewBooking(1)
    expect(hotel.percentRoomsOccupiedToday()).to.eql("2")
  });

  it("should be able to find least popular date", () => {
    expect(hotel.findLeastPopularDate()).to.eql('The least popular date is 2019/08/16 with 1 rooms booked.')
  });

  it("should be able to find most popular date", () => {
    expect(hotel.findMostPopularDate()).to.eql("The most popular date is 2019/10/10 with 4 rooms booked.")
  });

  it('should be able give 10 orders', () => {
    expect(hotel.giveMenu().length).to.eql(10)
  });

});
