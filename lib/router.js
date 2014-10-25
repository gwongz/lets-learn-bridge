Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function(){
    return Meteor.subscribe('questions');
  }
});

Router.map(function() {
  
  this.route('home', {
    path: '/',
    template: 'questionRandom'
  });
  
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

var permissionToViewUser = function(pause){
  if (! Meteor.userId()){
    console.log('no user so routing to home');
    Router.go('home');
    // Router.go('questionPage',  {_id: 'hMoh29JP8RRxgqKox'});
  
  } else if (Meteor.userId() !== this.params._id && !isSuperuser(Meteor.userId())){
    this.render('accessDenied');
    pause();
  }
};

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'questionSubmit'});
Router.onBeforeAction(permissionToViewUser, {only: 'account'});


