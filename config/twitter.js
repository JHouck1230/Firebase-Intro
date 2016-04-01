'use strict';

var Twitter = require('twitter');
var Firebase = require('firebase');

var usersRef = new Firebase('https://joshs-cool-app.firebaseio.com/');
var tweetsRef = usersRef.child('tweets');

var client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

client.stream('statuses/filter', {track: 'flash'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.user.screen_name, tweet.text);
		var tweetObj = {
			screen_name: tweet.user.screen_name,
			text: tweet.text
		}
		tweetsRef.push(tweetObj);
  });
 
  stream.on('error', function(error) {
    console.log('error:', error)
  });
});
