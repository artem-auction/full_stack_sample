var zipcode;

var nodexmlhttp = new XMLHttpRequest()
nodexmlhttp.onreadystatechange = function () {
  if (nodexmlhttp.readyState === XMLHttpRequest.DONE) {
    var responseArray = JSON.parse(nodexmlhttp.responseText);
    var setHTML = getHTML(responseArray);
    document.getElementById('node_data').innerHTML = setHTML;
    document.getElementById('cbox33130').onclick = function(d) {
      zipcode = document.getElementById('cbox33130').value;
      var setHTML = getHTML(responseArray);
      document.getElementById('node_data').innerHTML = setHTML;
    };
  }
}
nodexmlhttp.open('GET', 'http://localhost:3000/api/properties', true)
nodexmlhttp.send()

var javaxmlhttp = new XMLHttpRequest()
javaxmlhttp.onreadystatechange = function () {
  if (javaxmlhttp.readyState === XMLHttpRequest.DONE) {
    document.getElementById('java_data').innerHTML = JSON.stringify(JSON.parse(javaxmlhttp.responseText), null, 4)
  }
}
javaxmlhttp.open('GET', 'http://localhost:8080/api/properties/58dd8a74bd2c126614831605', true)
javaxmlhttp.send()

var getHTML = function(responseArray) {
  var setHTML = ""
  responseArray.forEach(function(element) {
    if (!zipcode || element.address.postal_code === zipcode) {
      setHTML += ("<div class='row'> <img src='" + element.image.fileDescriptor.urls.cdn + "' />");
      setHTML += ("<a href='/" + element._id + "'>" + element.full_address + "</a>");
      // setHTML += ("<p>" + "</p></div>");
    }
  });
  return setHTML;
}
