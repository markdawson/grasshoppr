import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Entries } from '../../collections/entries.js';

import './lookback.html';

Template.lookback.onRendered(function() {
	let data = [4, 8, 15, 16, 23, 42];

	d3.select("#myd3stuff")
	  .selectAll("div")
	    .data(data)
	  .enter().append("div")
	    .style("width", function(d) { return d * 10 + "px"; })
	    .text(function(d) { return d; });


});