var require = {
    baseUrl: '.',
    paths: {
        jquery: "node_modules/jquery/dist/jquery.min",
        knockout: "node_modules/knockout/build/output/knockout-latest",
        "knockout.mapping": "node_modules/knockout-mapping/dist/knockout.mapping.min",
        crossroads: "node_modules/crossroads/dist/crossroads.min",
        hasher: "node_modules/hasher/dist/js/hasher.min",
        signals: "node_modules/signals/dist/signals.min",
        'jquery.localize': 'node_modules/jquery-localize/dist/jquery.localize',

        // Plugins
        text: 'node_modules/text/text',

        // mine lib
        router: "Scripts/router",

        // signalr
        "signalr.core": "Scripts/Lib/jquery.signalR-2.2.1",
        "signalr.hubs": "Scripts/Lib/hubs"
    },
    shim: {
        // prevent jquery not load 
        "jquery.localize": {
            deps: ["jquery"]
        },
        "signalr.core": {
            deps: ["jquery"],
            exports: "$.connection"
        }
    }
};