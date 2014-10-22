Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function(){
    return Meteor.subscribe('questions');
  }
});

Router.map(function() {
  this.route('allAnswered', {path: '/done'});
  this.route('questionRandom', {path: '/'});
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

});

var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');

    pause();
  }
};

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'questionSubmit'});


