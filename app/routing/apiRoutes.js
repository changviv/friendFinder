
var friends = require("../data/friends")


module.exports = function(app) {
	app.get('/api/friends', function(req,res) {
		res.json(friends)
	});

	app.post('/api/friends', function(req,res) {

		var newFriend = req.body
		var newFriendScore = req.body.scores

		// Convert each user's results into a simple array of numbers
		var newScoreArr = [];
		for (var i=0 ; i < newFriendScore.length; i++ ) {
			var newNum = parseInt(newFriendScore[i])
			newScoreArr.push(newNum)
		}
		console.log(newFriend);

		// Find the difference of each friend

		var bestFriendArr = [];

		for (var j=0; j < friends.length; j++) {
			for ( var k = 0; k < friends[j].scores.length ; k++ ) {
				var totalDifference = 0
				var diff = friends[j].scores[k] - newScoreArr[k]
				totalDifference += diff
			}

			if (totalDifference < 0) {
				totalDifference *= (-1)
			}
			bestFriendArr.push(totalDifference)
			console.log("This is the User Number " + j + ": The difference between new friend is " + totalDifference);
		}
		console.log(bestFriendArr)



		var lowestDiff = Math.min(...bestFriendArr)
		console.log("lowestDiff", lowestDiff)

		var bestFriend = bestFriendArr.indexOf(lowestDiff)

		console.log("best friend", friends[bestFriend])


		//push the data to the friends array and send back the bestFriend match
		friends.push(newFriend);

		res.json(friends[bestFriend]);
	});
}
