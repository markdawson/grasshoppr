FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "journal", page:'look-back-tab'});
  },
  name: "journal"
});

FlowRouter.route('/lookback/timeline', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "lookbacktimeline", page:'journal-tab', modal: 'modal'});
  },
  name: "lookback",
  // onWait: function () {
  //       return Meteor.subscribe('entries');
  //   },
});

FlowRouter.route('/lookback/cards', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "lookbackgrid", page:'journal-tab', modal: 'modal'});
  },
  name: "lookbackgrid",
});

FlowRouter.route('/lookback/people', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "lookbackhisto", page:'journal-tab', modal: 'modal'});
  },
  name: "lookbackhisto",
});