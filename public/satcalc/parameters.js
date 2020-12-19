var convertGrades = function (angle) {
  return (angle / Math.PI) * 180;
};
var polarcoordinates = function (position) {
  if (position.x > 0 && position.y > 0) {
    return Math.atan(position.y / position.x);
  } else if (position.x == 0 && position.y > 0) {
    return Math.PI / 2;
  } else if (position.x < 0) {
    return Math.atan(position.y / position.x) + Math.PI;
  } else if (position.x == 0 && position.y < 0) {
    return 3 * (Math.PI / 2);
  } else if (position.x > 0 && position.y < 0) {
    return Math.atan(position.y / position.x) + 2 * Math.PI;
  }
};
var getLatitud = function (position) {
  var distance = Math.sqrt(
    Math.pow(position.x, 2) + Math.pow(position.y, 2) + Math.pow(position.z, 2)
  );
  var angle = Math.asin(position.z / distance);
  return angle;
};
var distancePoint = function (point1, point2) {
  return Math.sqrt(
    Math.pow(point1.x - point2.x, 2) +
      Math.pow(point1.y - point2.y, 2) +
      Math.pow(point1.z - point2.z, 2)
  );
};
var escalarvelocity = function (velocity) {
  return Math.sqrt(
    Math.pow(velocity.x, 2) + Math.pow(velocity.y, 2) + Math.pow(velocity.z, 2)
  );
};
var getLong = function (position, source) {
  var distance = calcdist(position, source);
  var opcat = Math.abs(position.z - source.z);
  var angle = Math.asin(opcat / distance);
  angle = (angle / Math.PI) * 180;
  return angle;
};
var calcdist = function (position, source) {
  var distance = Math.sqrt(
    Math.pow(position.x - source.x, 2) +
      Math.pow(position.y - source.y, 2) +
      Math.pow(position.z - source.z, 2)
  );
  return distance;
};
var getLat = function (position) {};
export {
  getLong,
  getLat,
  polarcoordinates,
  convertGrades,
  distancePoint,
  getLatitud,
  escalarvelocity,
};
