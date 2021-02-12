// Global Application Config Settings
var _appConfig = {
    AppName: "CaloriePunch",
    Roles: ["Admin", "User", "Guest"]
};


// Require Configuration
require.config({
    baseUrl: "/js/app/",
    paths: {
        "bootstrap": "/lib/bootstrap/dist/js/bootstrap",
        "jquery": "/lib/jquery/dist/jquery",
        "knockout": "/lib/knockout/knockout-3.5.1",
        "knockout-mapping": "/lib/knockout/knockout-mapping",
        "text": "/lib/text.min",
        "httpService": "/js/app/services/httpService",
        //"components": "components",
        //"services": "services",
        //"views":"views"
    },
    waitSeconds: 30,
    config:
    {
        "app": _appConfig,
    }
});

// App entry point
define("app",
    ['require', 'knockout', 'bootstrap', 'jquery', './config', 'module', 'knockout-mapping'],
    function (require, ko, bootstrap, jquery, authService, appConfig, module, koMapping) {
        
        var App = function () {
            return {
                viewModel: ko.observable(), // reference
                isLoading: ko.observable(false),
                loadView: function (viewModel) {
                    var vm = new viewModel(this);

                    this.viewModel(vm);

                    var el = document.getElementById('app');

                    ko.applyBindings(vm, el); // apply ko bindings and set the context to id="app" element

                    // Optional - If vm has Init() function then call it.
                    if (typeof vm.initOnBinding === 'function')
                        vm.initOnBinding();

                    el.style.display = "block";
                    
                },
                displayLoadingScreen: function (show) {
                    show = show || false;
                    
                    var loadingScreen = document.getElementById('loadingScreen');
                    loadingScreen.style.display = show ? "block": "none";
                },
                Watchers: function () {
                    var vm = this;

                    vm.isLoading.subscribe(function (val) {
                        vm.displayLoadingScreen(val);
                    });
                }
            }
        }

        var app = new App();
        app.Watchers();

        return app;
});

// Initialization of the app
function Bootstrap() {
    
    require(["app", "./services/router"], function (app, router) {
        var currentView = router.currentView();

        if (currentView) {
            require([currentView], function (view) {
                app.loadView(view);
            });            
        }
              
    });
};

Bootstrap(); // load the app

