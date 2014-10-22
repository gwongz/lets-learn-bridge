Template.questionSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var question = {
      answer: $(e.target).find('[name=answer]').val(),
      title: $(e.target).find('[name=title]').val(),
    };

    Meteor.call('question', question, function(error, id) {
      if (error)
        return alert(error.reason);

      Router.go('questionPage', {_id: id});
    });


  }
});

