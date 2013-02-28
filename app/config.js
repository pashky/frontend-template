// Set the require.js configuration for your application.
require.config({
    deps: ["backbone", "jquery", "app"],

    paths: {
        "lodash": "../libs/lodash.underscore",
        "backbone": "../libs/backbone",
        "jquery": "../libs/jquery",
        
        "spritespin": "../libs/spritespin"
    },

    map: {
        // Ensure Lo-Dash is used instead of underscore.
        "*": { "underscore": "lodash" }
    },
    
    shim: {
        "jquery": [],
        "backbone": ["lodash","jquery"],
        "spritespin"  : ["jquery"]
    }
});
