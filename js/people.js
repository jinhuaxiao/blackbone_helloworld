requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app'
    },
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        }
    }
}); 

require(["jquery", "backbone"], function($,Backbone) {

	(function($){
		Backbone.emulateHTTP = true;
		Backbone.emulateJSON = true;

		var Person = Backbone.Model.extend({
			initialize: function() {
			},
			defaults: {
					name: 'undefined',
					age: 'undefined'
			},
			urlRoot: "./blackbone.php",
			url: function() {
					var base = this.urlRoot || (this.collection && this.collection.url) || "/";
					if(this.isNew()) return base;
					return base + "?id=" + encodeURIComponent(this.id);
			}
		});
		var person = new Person({id:1});
		person.fetch();//fetch model from DB with id=1
	})(jQuery);

});

