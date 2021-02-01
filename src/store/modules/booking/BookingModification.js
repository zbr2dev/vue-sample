// import TripInfo from '@/utils/TripInfo';
import { gmapApi } from 'vue2-google-maps';

// eslint-disable-next-line no-unused-vars
function getAddressByCoordinates(lat, lng) {
  return new Promise((resolve) => {
    const google = gmapApi();
    const latlng = new google.maps.LatLng(lat, lng);
    // eslint-disable-next-line new-cap
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      latLng: latlng,
    }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          resolve(results[1].formatted_address);
        }
        resolve('No results found');
      }
      resolve(`Geocoder failed due to: ${status}`);
    });
  });
}

export default class BookingModification {
  // Todo await getAddressByCoordinates
  static modifyBookingsFromBackend(bookings) {
    return bookings.map((booking) => ({
      ...booking,
      filters: {
        date: {
          start: booking.pudateTime,
          end: booking.dodateTime,
        },
        waypoints: booking.locations,
      },
    }));
  }

  static modifyBookingsForBack(bookings, userId) {
    return bookings.map((oldEl) => {
      const el = { ...oldEl };
      function getDates() {
        const dateField = el.filters.date;
        const isSingleDate = dateField && (typeof dateField === 'string' || dateField instanceof Date);
        const puDateTime = isSingleDate
          ? new Date(dateField).getTime()
          : new Date(dateField.start).getTime();
        // Todo: Later must be null
        const doDateTime = isSingleDate ? puDateTime : new Date(dateField.end).getTime();
        return {
          puDateTime,
          doDateTime,
        };
      }

      const el2 = {
        id: el.id,
        vehicleId: el.vehicle.id || el.vehicleId,
        // It is pulocationLat, pulocationLon, dolocationLat, dolocationLon, stops
        price: el.price || 0,
        distanceMeters: el.filters.rangeMeters,
        users: [{
          userId,
          role: 'Booker',
        }],
        // eslint-disable-next-line no-prototype-builtins
        locations: !el.locations[0].hasOwnProperty('address') ? [
          {
            ...el.locations[0], address: el.locations[0].formatted_address,
          }, {
            ...el.locations[1], address: el.locations[1].formatted_address,
          },
        ] : el.locations,
        puDateTime: getDates().puDateTime || el.pudateTime,
        doDateTime: getDates().doDateTime || el.dodateTime,
        // puDateTime: Number(el.pudateTime),
        // doDateTime: el.dodateTime ? el.dodateTime : undefined,
        // ...TripInfo.getMainLocationsAndStops(el.filters.waypoints),
        // // ...getDates(),
      };
      if (el.dodateTime === null) { delete el2.doDateTime; }
      if (!el2.id) { delete el2.id; }
      return el2;
    });
  }
}
