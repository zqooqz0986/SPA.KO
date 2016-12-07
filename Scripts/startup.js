define(['knockout', 'router'], function(ko, router) {

    // global variables
    window.apiDomain = "http://localhost:4744/";

    // components
    ko.components.register('user-info', { require: 'Scripts/App/userInfo' });
    ko.components.register('user-list', { require: 'Scripts/App/userList' });
    ko.components.register('stock-ticker', { require: 'Scripts/App/signalR.StockTicker' });


    // Start the application
    ko.applyBindings({ route: router.currentRoute });
});
