import chai from 'chai';
const expect = chai.expect;
import users from '../data/customer-data.js'
import orders from '../data/orders-data.js'
import rooms from '../data/room-data.js'
import bookings from '../data/bookings-data.js'
import Hotel from '../src/hotel.js';
import Order from '../src/order.js';


describe('Orders', function() {
  let order
  let hotel;
  beforeEach(() => {
    order = new Order()
    hotel = new Hotel(rooms, bookings, orders, users);
    hotel.addNewCustomer("billy")
  });

  it('should be a function', () => {
    expect(Order).to.be.a('function');
  });

  it('should be an instance of Order', () => {
    expect(order).to.be.an.instanceof(Order);
  });

});
