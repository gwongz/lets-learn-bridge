Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function(){
    return Meteor.subscribe('questions');
  }
});

Router.map(function() {
  
  this.route('questionRandom', {path: '/'});
  this.route('allAnswered', {path: '/done'});
  this.route('questionsList', {path: '/questions/list'});
  this.route('questionPage', {
    path: '/questions/:_id',
    data: function(){
      return Questions.findOne(this.params._id);
    }
  });

  this.route('questionEdit', {
    path: '/questions/:_id/edit',
    data: function(){
      return Questions.findOne(this.params._id);
    }
  });

  this.route('questionSubmit', {
    path: '/submit'
  });

  this.route('account', {
    path: '/account/:_id',
    data: function(){
      console.log('this is params id in router');
      console.log(this.params._id);
      return Meteor.users.findOne(this.params._id);
      // return Meteor.users.findOne(Meteor.userId());
    }
  });

});

var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('loginRequired');

    pause();
  }
};

var authenticatedUser = function(pause){
  if (! Meteor.user()){
    this.render('accessDenied');
    pause();
  }

  // if (isSuperuser(Meteor.userId())){
    // return true;
  // }

  if (Meteor.userId() !== this.params._id && !isSuperuser(Meteor.userId())){
    this.render('accessDenied');
    pause();
  }
  
};

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'questionSubmit'});
Router.onBeforeAction(authenticatedUser, {only: 'account'});


