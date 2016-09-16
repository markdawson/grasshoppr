FlowRouter.route('/', {
	name: 'journal',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Form'});
	}
});