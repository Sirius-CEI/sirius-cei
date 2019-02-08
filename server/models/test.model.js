const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var options = {discriminatorKey: 'kind'};

var eventSchema = new mongoose.Schema({time: Date}, options);
var Event = mongoose.model('Event', eventSchema);

// ClickedLinkEvent is a special type of Event that has
// a URL.
var ClickedLinkEvent = Event.discriminator('ClickedLink',
  new mongoose.Schema({url: String}, options));

// When you create a generic event, it can't have a URL field...
var genericEvent = new Event({time: Date.now(), url: 'google.com'});
assert.ok(!genericEvent.url);

// But a ClickedLinkEvent can
var clickedEvent =
  new ClickedLinkEvent({time: Date.now(), url: 'google.com'});
assert.ok(clickedEvent.url);