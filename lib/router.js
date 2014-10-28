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
    data: function() {
      var question = Questions.findOne(this.params._id);
      return question;
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
      return Meteor.users.findOne(this.params._id);
    }
  });

  this.route('admin', {
    path: 'admin',
  });

  this.route('404', {
   path: '/*',
   template: 'pageNotFound',
  });

});

var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()){
      this.render(this.loadingTemplate);
    } else {
      this.render('loginRequired');
    }

    pause();
  }
};

var permissionToViewUser = function(pause){
  if (! Meteor.userId()){
    Router.go('home');
  } else if (Meteor.userId() !== this.params._id && !isSuperuser(Meteor.userId())){
    this.render('accessDenied');
    pause();
  }
};

var permissionToViewAdmin = function(pause){
  if (!isSuperuser(Meteor.userId())){
    this.render('accessDenied');
    pause();
  }
};

var isValidQuestion = function(pause){
  var question = Questions.findOne(this.params._id);
  if (!question){
    this.render('pageNotFound');
    pause();
  }
  // clear answer and explanation on the session
  clearAnswer();
};

var setAnswerSession = function(){
  Meteor.call('getAnswer', this.params._id, function(err, response){
    Session.set('answer', response);
  });
  Meteor.call('getExplanation', this.params._id, function(err, response){
    Session.set('explanation', response);
  });
};


Router.onBeforeAction(function() {clearErrors();});
// make sure subscriptions are loaded before sending user through to the route they requested
Router.onBeforeAction('loading');

Router.onBeforeAction(requireLogin, {only: 'questionSubmit'});
Router.onBeforeAction(permissionToViewUser, {only: 'account'});
Router.onBeforeAction(permissionToViewAdmin, {only: 'admin'});
Router.onBeforeAction(isValidQuestion, {only: 'questionPage'});
Router.onBeforeAction(setAnswerSession, {only: 'questionEdit'});



