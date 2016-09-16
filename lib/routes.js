FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("MainLayout", {content: "journal", page:'look-back-tab'});
  }
});