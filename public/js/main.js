'use strict';

var app = angular.module('fireApp', ['firebase']);

app.controller('mainCtrl', function($scope, $tweets) {
	$scope.tweets = $tweets;
});

app.filter('reverse', function() {
	return function(items) {
		return items.slice().reverse();
	};
});

app.factory('$tweets', function($firebaseArray) {
	var ref = new Firebase('https://joshs-cool-app.firebaseio.com/');
	var tweetsRef = ref.child('tweets');
	return $firebaseArray(tweetsRef);
});

// usersRef.child('tweets').on('child_added', function(snapshot) {
// 	var tweetObj = snapshot.val();

// 	var $tweet = $('#template').clone();
// 	$tweet.removeAttr('id');
// 	$tweet.find('.screenname').text(tweetObj.screen_name);
// 	$tweet.find('.text').text(tweetObj.text);

// 	$('#tweets').prepend($tweet);
// });