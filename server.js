'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var util = require('util');
var socketIo = require('socket.io');
var Analytics = require('./analytics');
var analyticsMiddleware = require('./analytics-middleware');

var analytics = new Analytics();

var app = express();
var server = http.createServer(app)
var io = socketIo.listen(server)

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(analyticsMiddleware);
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/status', function(req, resp) {
  resp.end('Server is working');
});

app.post('/anything', function(req, resp) {
    resp.send('Anything done, ' + util.inspect(req.body, {depth: 4}));
});
app.put('/anything', function(req, resp) {
    resp.send('Anything put, ' + util.inspect(req.body, {depth: 4}));
});

app.get('/analytics', function(req, resp) {
  resp.end(JSON.stringify(analytics.summary()));
});

app.post('/analytics', function(req, resp) {
  console.log('params', req.body.params);
  var event = req.body.event;
  analytics.push(event, function(err) {
    if (err) return resp.send(503, 'Analytics Service unavaliable');
    resp.send('Event registered');
  });

});

io.sockets.on('connection', function (socket) {
  console.log('connection')
  socket.emit('summary', analytics.summary());
  analytics.on('push', function() {
    console.log('event');
    socket.emit('summary', analytics.summary());
  })
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

setInterval(function() { analytics.push({name: 'click', target: 'like', date: new Date()}); }, 10000);
