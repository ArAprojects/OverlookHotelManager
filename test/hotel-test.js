// - Total Rooms Available for today's date
import chai from 'chai';
const expect = chai.expect;
// import data from '../src/dataset.js'
import Hotel from '../src/hotel.js';


describe('Hotel', function() {

  let hotel;
  beforeEach(() => {
    hotel = new Hotel();
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of Hotel', () => {
    expect(hotel).to.be.an.instanceof(Hotel);
  });

  it('should be able to get all rooms available today', () => {
    expect(hotel).to.be.an.instanceof(Hotel);
  });



});
