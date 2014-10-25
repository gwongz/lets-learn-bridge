Meteor.subscribe('questions');
Meteor.subscribe('userData');

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

// code to run on client at startup
if (Meteor.isClient){
  Meteor.startup(function(){
    // postLogin hook
    Deps.autorun(function(){
      // postLogin hook
      if(Meteor.userId()){
        Meteor.call('setProfile');
      }
    });
  });
}




