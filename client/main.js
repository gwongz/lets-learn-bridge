Meteor.subscribe('questions');

if (Meteor.isServer) {
  Meteor.startup(function () {



    // code to run on server at startup
  });
}

if (Meteor.isClient){
  Meteor.startup(function(){
    // code to run on client at startup
  });
}

Template.header.events({
	'click .reshuffle': function(){
		// clear the correct answers collection to restart 
		CorrectAnswers.remove({});
	},
});
