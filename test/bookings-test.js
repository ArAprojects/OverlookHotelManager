import chai from 'chai';
const expect = chai.expect;
import users from '../data/customer-data.js'
import orders from '../data/orders-data.js'
import rooms from '../data/room-data.js'
import bookings from '../data/bookings-data.js'
import Hotel from '../src/hotel.js';
import Booking from '../src/booking.js';


describe('Bookings', function() {
  let booking
  let hotel;
  beforeEach(() => {
    booking = new Booking()
    hotel = new Hotel(rooms, bookings, orders, users);
    hotel.addNewCustomer("billy")
  });

  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of Booking', () => {
    expect(booking).to.be.an.instanceof(Booking);
  });

});
