FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("MainLayout", {content: "journal", page:'look-back-tab'});
  }
});

FlowRouter.route('/lookback', {
  action: function() {
    BlazeLayout.render("MainLayout", {content: "lookback", page:'journal-tab'});
  },
  name: "lookback"
});