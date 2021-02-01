import { formatDateToFullStr } from '@/utils/helpers';

export default class TripInfo {
  static getOriginAddress(locations) {
    const waypoint = locations[0];
    return (waypoint && (waypoint.address || waypoint.formatted_address)) || '';
  }

  static getDestinationAddress(locations) {
    // console.log(trip);
    const lastIndex = locations.length - 1;
    return (lastIndex >= 1 && (locations[lastIndex].address || locations[lastIndex].formatted_address)) || '';
  }

  static getOtherWaypointsCount(locations) {
    // console.log(trip);
    return locations.length - 2;
  }

  static getMainLocationsAndStops(waypoints) {
    return {
      locations: (waypoints.length
        && (waypoints.map((el) => ({ address: el.formatted_address, lat: el.lat, lng: el.lng })))
      ) || '',
    };
  }

  static getReadableTripDate(date) {
    console.log(date);
    if (!date) { return '1'; }
    return date.start
      ? `${formatDateToFullStr(Number(date.start))} - ${formatDateToFullStr(Number(date.end))}`
      : formatDateToFullStr(Number(date));
  }
}
