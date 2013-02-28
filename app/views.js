define([
    "backbone"
], function() {
    
    HeaderView = Backbone.View.extend({

        templateName: 'header',
        
        initialize: function () {
            this.render();
        },

        render: function () {
            $(this.el).html(this.template());
            return this;
        }
    });
    
});