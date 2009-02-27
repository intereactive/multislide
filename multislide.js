/*  
	MultiSlide, version 1.0
	(c) 2009 Intereactive, LLC - Ryan Hargrave
	http://blueprint.intereactive.net/multislide-for-mootools
	
	Compatible with Mootools v1.2 - http://mootools.net
	Extends the capability of the Fx.Slide Class  - http://mootools.net/docs/Plugins/Fx.Slide
	
	This code is freely distributable under the terms of an MIT-style license.
*/

var multislide = new Class({
	
	Implements: [Events, Options],

	options: {
		/*
		onExpand: $empty,
		onCollapse: $empty, 
		onExpand_all: $empty, 
		onCollapse_all: $empty, 
		*/  
		slide_duration:			300,
		slide_transition: 		'sine:in:out',
		class_expand_all: 		'expand_all',
		class_collapse_all: 	'collapse_all',
		class_toggler: 			'ms_toggler',
		class_expander: 		'ms_expander'
	},
	
	//sets up the animations for the team layout
	initialize: function(container_class, options) {
		this.setOptions(options);
		
		//set empty array to hold all the sliders
		this.person_slide = [];
		
		//create the sliders and set up event listeners
		$$('.'+container_class).each(function(container, i){
			
			var toggler = container.getElement('.'+this.options.class_toggler);
			
			//set up the slide instance for each element and hide all the sliders								  
			this.person_slide[i] = new Fx.Slide(container.getElement('.'+this.options.class_expander), {
					duration: this.options.slide_duration, 
					transition: this.options.slide_transition, 
					link : 'ignore',
					onStart : function(){
						if(this.person_slide[i].open){
							this.fireEvent('collapse', toggler);
						} else {
							this.fireEvent('expand', toggler);
						}
					}.bind(this)
			}).hide();
			
			//add the toggle slide event		
			toggler.addEvent('click', function(e){
					e.stop();
					this.person_slide[i].toggle();
			}.bind(this));
		}.bind(this));
		
		
		$$('.'+this.options.class_expand_all).addEvent('click', function(e){
			e.stop();
			this.expand_all();
		}.bind(this));
		
		
		$$('.'+this.options.class_collapse_all).addEvent('click', function(e){
			e.stop();
			this.collapse_all();
		}.bind(this));
	},
	
	expand_all: function() {
		//run the effect on the entire array
		this.person_slide.each(function(sl){
			if(!sl.open){
				sl.slideIn();
			}
		});
		this.fireEvent('expand_all');
	},
	
	collapse_all: function() {
		//run the effect on the entire array
		this.person_slide.each(function(sl){
			if(sl.open){
				sl.slideOut();
			}
		});
		this.fireEvent('collapse_all');
	}
});