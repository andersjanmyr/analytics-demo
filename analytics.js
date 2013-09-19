var EventEmitter = require('events').EventEmitter;
var util = require('util');

var events = [
    { name: 'click', target: 'buy', time: new Date() },
    { name: 'click', target: 'recommend', time: new Date() },
    { name: 'click', target: 'buy', time: new Date() }
];

function Analytics() {
    EventEmitter.call(this);
}
util.inherits(Analytics, EventEmitter);

function push(event) {
    console.log(event)
    events.push(event);
    this.emit('push', event);
}


function summary() {
    var sum = {};
    events.forEach(function(event) {
        var key = event.name + '-' + event.target;
        sum[key] = (sum[key] || 0) + 1;
    }, {});
    return sum;
}

Analytics.prototype.push = push;
Analytics.prototype.summary = summary;


module.exports = Analytics;
