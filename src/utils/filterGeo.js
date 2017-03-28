'use strict';

const default_geo = {
  latitude: 0,
  longitude: 0
};

const toRadians = d => (d * Math.PI / 180);

const getDistance = (fpoint = default_geo, tpoint = default_geo) => {
  const radLat1 = toRadians(fpoint.latitude);
  const radLat2 = toRadians(tpoint.latitude);
  const deltaLat = radLat1 - radLat2;
  const deltaLng = toRadians(fpoint.longitude) - toRadians(tpoint.longitude);
  const dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));

  return dis * 6378137;
}

export default (data = {}, geo = {}) => (getDistance(data, geo) <= geo.radius);
