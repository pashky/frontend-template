define([
    "router",
    "backbone",
    "views",
    "spritespin"
], function (Router) {
    
    var app = {
        root: "/"
    };
    
    function loadTemplates(callback) {

        window.JST = window.JST || {};

        var views = _.chain(window).keys().filter(function(v) { return (/View$/).test(v) && window[v].prototype.templateName; }).value();
        var deferreds = [];
        
        $.each(views, function(index, view) {
            var path = 'app/templates/' + window[view].prototype.templateName + '.ejs';
            if (window.JST[path]) {
                window[view].prototype.template = window.JST[path];
            } else {
                deferreds.push($.ajax({url: app.root + path + '?' + Math.random(), 
                                       method: 'GET', dataType: 'text', 
                                       success: function(data) {
                                           window[view].prototype.template = _.template(data);
                                       }, 
                                       error: function() {
                                           alert('Template for ' + view + ' was not found');
                                       }
                                      }));
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }
    
    loadTemplates(function() {
        app.router = new Router();
        
        Backbone.history.start({ pushState: true, root: app.root });
        
        // All navigation that is relative should be passed through the navigate
        // method, to be processed by the router. If the link has a `data-bypass`
        // attribute, bypass the delegation completely.
        $(document).on("click", "a[href]:not([data-bypass])", function(evt) {
            // Get the absolute anchor href.
            var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
            // Get the absolute root.
            var root = location.protocol + "//" + location.host + app.root;
            
            // Ensure the root is part of the anchor href, meaning it's relative.
            if (href.prop.slice(0, root.length) === root) {
                evt.preventDefault();
                Backbone.history.navigate(href.attr, true);
            }
        });
        
    });
    
    return app;

});
