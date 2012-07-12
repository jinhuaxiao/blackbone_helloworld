var assert = function(value,msg) {
    if(!value)
        throw(msg || (value + " does not equal true"));
};

var assertEqual = function(val1,val2,msg) {
    if(val1 !== val2)
        throw(msg || (val1 + " does not equal " + val2));
};

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
		Backbone.sync = function(method,model,success,error) {
			success();
		};
		var Item = Backbone.Model.extend({
			defaults: {
				part1: 'hello',
				part2: 'world'
			}
		});
		var List = Backbone.Collection.extend({
			model: Item
		});

		var ItemView = Backbone.View.extend({
			tagName: 'li',
			events: {
				'click span.swap': 'swap',
				'click span.delete': 'remove'
			},
			initialize: function() {
				_.bindAll(this,'render');
				this.model.bind('change',this.render);
				this.model.bind('remove',this.unrender);
			},
			render: function() {
				$(this.el).html('<span>'+this.model.get('part1')+' '+this.model.get('part2')+'</span>&nbsp; &nbsp; <span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[swap]</span> <span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');
				return this;
			},
			unrender: function() {
				$(this.el).remove();
			},
			swap: function(){
				var swapped = {
					part1: this.model.get('part2'),
					part2: this.model.get('part1')
				};
				this.model.set(swapped);
			},
			remove: function() {
				this.model.destroy();
			}
		});

		var ListView = Backbone.View.extend({
			el: $('body'),
			events: {
				'click button#add': 'addItem'
			},
			initialize: function() {
				_.bindAll(this,'render','addItem');
				this.collection = new List();
				this.collection.bind('add',this.appendItem);
				this.counter = 0;
				this.render();
			},
			render: function() {
				var self = this;
				$(this.el).append("<button id='add'>Add list item</button>");
				$(this.el).append("<ul></ul>");
				_(this.collection.models).each(function(item){
					self.appendItem(item);
				},this);
			},
			addItem: function() {
				this.counter++;
				var item = new Item();
				item.set({
					part2:item.get('part2') + this.counter
				});
				this.collection.add(item);
				//$(this.el ,'ul').append('<li>hello,world'+this.counter+'</li>');
			},
			appendItem: function(item) {
				var itemView = new ItemView({
					model:item
				});
				//$('ul').append("<li>"+item.get('part1')+' '+item.get('part2')+"</li>");
				$('ul').append(itemView.render().el);
			}

		});
		var listView = new ListView();
	})(jQuery);
    

});
