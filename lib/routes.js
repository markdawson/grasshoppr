FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("MainLayout", {content: "journal"});
  }
});