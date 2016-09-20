FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "journal", page:'look-back-tab'});
  },
  name: "journal"
});

FlowRouter.route('/lookback', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "lookback", page:'journal-tab', modal: 'modal'});
  },
  name: "lookback",
  // onWait: function () {
  //       return Meteor.subscribe('entries');
  //   },

});
