import * as queryString from 'qs';
import TrexozApi from '../common/TrexozApi';

class TripApi extends TrexozApi {
  resource = '/Trip';

  getTripList(params) {
    const queryParams = queryString.stringify(params);
    return this.get(`${this.resource}/Search?${queryParams}&dateTo=1704924676503`);
  }

  getVehicle(vehicleId) {
    return this.get(`${this.resource}/Vehicle?id=${vehicleId}`);
  }

  getDriver(driverId) {
    return this.get(`${this.resource}/Chauffeur?id=${driverId}`);
  }

  createOrUpdateTrip(data) {
    return this.put(`${this.resource}/CreateOrUpdate`, data);
  }

  checkTripAvailability(data) {
    return this.post(`${this.resource}/CheckAvailability`, data);
  }

  getInCart() {
    return this.get(`${this.resource}/InCart`);
  }

  attemptToBook(id) {
    return this.put(`${this.resource}/AttemptToBook?tripId=${id}`);
  }

  getAllTrips(params) {
    const queryParams = queryString.stringify(params);
    return this.get(`${this.resource}/All?limit=400&offset=0${queryParams.length ? `&${queryParams}` : ''}`);
  }

  getSingleTrip(id) {
    return this.get(`${this.resource}/Details?id=${id}`);
  }

  tryCancelTrip(id) {
    return this.get(`${this.resource}/TryCancel?id=${id}`);
  }

  cancelTrip(id) {
    return this.get(`${this.resource}/Cancel?tripId=${id}`);
  }

  deleteTrip(id) {
    return this.delete(`${this.resource}/Delete?id=${id}`);
  }
}

const tripApi = new TripApi();
export default tripApi;
