var Analytics = require('./analytics');
var analytics = new Analytics();

// Extracts 'sm.events' from the object and pushes each event to analytics
function middleware(req, resp, next) {
    console.log(req.body.sm);
    var sm = req.body.sm;
    if (sm)
        sm.events.forEach(function(event) {
            analytics.push(event);
        });
    next();
}

module.exports = middleware;
