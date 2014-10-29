Template.questionEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    clearErrors();

    var currentQuestionId = this._id;

    var questionProperties = {
      answer: $(e.target).find('[name=answer]').val(),
      title: $(e.target).find('[name=title]').val(),
      explanation: $(e.target).find('[name=explanation]').val(),
      url: $(e.target).find('[name=url]').val()
    };

    if (!questionProperties.title)
      return throwError('Please provide a question');
    if (!questionProperties.answer)
      return throwError('Please provide an answer');


    Questions.update(currentQuestionId, {$set: questionProperties}, function(error) {
      if (error) {
        // display the error to the user
        return throwError(error.reason);
      } else {
        Router.go('questionPage', {_id: currentQuestionId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();
    if (confirm('Delete this question?')) {
      var currentQuestionId = this._id;
      Questions.remove(currentQuestionId);
      Router.go('questionsList');
    }

  },

});

Template.questionEdit.helpers({
  answer: function(){
    return Session.get('answer');
  },
});


