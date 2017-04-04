var nodexmlhttp = new XMLHttpRequest()
var data, coordinates, lat, lon;
nodexmlhttp.onreadystatechange = function () {
  if (nodexmlhttp.readyState === XMLHttpRequest.DONE) {
    // document.getElementById('node_data').innerHTML = JSON.stringify(JSON.parse(
    	// nodexmlhttp.responseText), null, 4)
  	data = JSON.parse(nodexmlhttp.responseText)
    coordinates = data["address"]["coordinates"];
    document.getElementById('coords').innerHTML =
    // "<br>Address: " + data["address"] +
    "<br>Bedrooms: " + data["bedrooms"] +
    "<br>Bathrooms: " + data["bathrooms"] +
    "<br>Sqr ft. : " + data["square_feet"] +
    "<br>Year built: " + data["year_built"] +
    "<br>Address: 1435, Brickell Ave, 3103, Miami, FL, 33131, USA"
    lat = parseFloat(coordinates["lat"])
    lon = parseFloat(coordinates["lon"])
    initMap();

  }
}
nodexmlhttp.open('GET', 'http://localhost:3000/api/properties/' + id, true)
nodexmlhttp.send()

function initMap() {

        var uluru = {lat: lat, lng: lon};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }


// var javaxmlhttp = new XMLHttpRequest()
// javaxmlhttp.onreadystatechange = function () {
//   if (javaxmlhttp.readyState === XMLHttpRequest.DONE) {
//     // document.getElementById('java_data').innerHTML = JSON.stringify(JSON.parse(javaxmlhttp.responseText), null, 4)

//     console.log(coordinates)

//   }

// }

// javaxmlhttp.open('GET', 'http://localhost:8080/api/properties/58dd8a74bd2c126614831605', true)
// javaxmlhttp.send()
