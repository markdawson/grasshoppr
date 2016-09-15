import { Template } from 'meteor/templating';
 
import './body.html';
import './form.html';

Template.form.onRendered({

  var slider = document.getElementById('test5');
  noUiSlider.create(slider, {
   start: [20, 80],
   connect: true,
   step: 1,
   range: {
     'min': 0,
     'max': 100
   },
   format: wNumb({
     decimals: 0
   })
  });

});
