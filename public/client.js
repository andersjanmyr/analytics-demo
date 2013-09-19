(function() {
  var socket = io.connect('http://localhost');

  function summaryToHtml(data) {
    var rows = "";
    for (key in data)
      rows = rows + '<tr><td class="key">' + key + '</td><td class="value">' + data[key] + '</td></tr>\n';
    return '<table>\n<tr><th class="key">Key</th><th class="value">Count</th></tr>' + rows + '</table>\n';
  }

  socket.on('summary', function (data) {
    console.log(data);
    document.getElementsByTagName('body')[0].innerHTML = summaryToHtml(data);
  });

}());

