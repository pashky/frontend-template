define([
    "backbone"
], function () {
    
    return Backbone.Router.extend({
        routes: {
            "": "index"
        },
        
        initialize: function () {
            var header = new HeaderView();
            $("#header").empty().append(header.$el);
        },
        
        index: function() {
        }
        
    });
    
});
    