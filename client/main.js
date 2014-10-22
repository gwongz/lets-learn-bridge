Meteor.subscribe('questions');

if (Meteor.isServer) {
  Meteor.startup(function () {

    // code to run on server at startup
  });
}

if (Meteor.isClient){
  Meteor.startup(function(){
  });
}
