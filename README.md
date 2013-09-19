# Analytics Demo

## Getting started

* `npm install`
* npm start
* http://localhost:3000
* `curl -XPUT --header 'Content-Type: application/json' -d @data.json http://localhost:3000/anything`

### Data JSON

Analytic events can be sent to the server attached to any of the normal JSON
requests. This is done by attaching a top level property `sm` (Sony Mobile),
below this property another property `events` contains an array of events, as
below.

```
{
  "data": {
    "This is our domain": "data"
  },
  "sm": {
    "events": [
    { "name": "curl", "target": "update"}
    ]
  }
}
```

This way analytics can be sent along with any POST, PUT, other request that
sends JSON in the body. The JSON is handled in the `analytics-middleware`

## /analytics

Events can also be sent directly to the server by POSTing to `/analytics`.
The input data to this endpoint is the events part in the request above.

```
{
  "events": [
    { "name": "curl", "target": "update"}
  ]
}
```

This is a work in progress...

