//Google Maps Functions
function initMap() {
  var myLatlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 8,
    center: myLatlng,
    mapTypeId: 'terrain'
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
}
