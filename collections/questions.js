Questions = new Meteor.Collection('questions');

Questions.allow({
    update: ownsDocument,
    remove: ownsDocument
});

