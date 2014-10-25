// Server side methods that are triggered by particular event  
Meteor.methods({
  setProfile: function(){
    if (!Meteor.user().profile){
      var profile = {'superuser': false};
      Meteor.users.update({_id:Meteor.user()._id}, {$set:{profile: profile}});
    }
  },
});