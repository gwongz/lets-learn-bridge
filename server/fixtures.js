if (Questions.find().count() === 0) {
  Questions.insert({
    title: 'When bidding, what is the ranking of suits in descending order?',
    tags: 'bidding',
    answer: 'Spades, Hearts, Diamonds, Clubs'
  });

  Questions.insert({
    title: 'What do you call the first person who makes a bid?',
    tags: 'bidding',
    answer: 'opener'
  });

  Questions.insert({
    title: 'How many points should you have to open bidding?',
    tags: 'bidding',
    answer: '12'
  });
}

