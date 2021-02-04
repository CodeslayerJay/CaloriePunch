// Global Application Config Settings
var _appConfig = {
    AppName: "CaloriePunch",
};

// Require Configuration
require.config({
    baseUrl: "/js",
    paths: {
        "bootstrap": "../lib/bootstrap/dist/js/bootstrap",
        "jquery": "../lib/jquery/dist/jquery",
        "knockout": "../lib/knockout/knockout-3.5.1",
    },
    waitSeconds: 15,
    config: _appConfig
});

// App entry point
define("app", function (require, exports, module) {
    var ko = require("knockout");
    var bootstrap = require("bootstrap");
    var $ = jquery = require("jquery");

    var app = function () {
        return {
            ViewModel: ko.observable(),
            LoadView: function (viewModel) {
                var vm = this;

                this.ViewModel(viewModel);

                ko.applyBindings(viewModel(), document.getElementById('app'));

                if (typeof vm.ViewModel().Init === 'function')
                    vm.ViewModel().Init();
            },
        }
    }

    return new app();
});

function Bootstrap() {
    var pageName = window.location.pathname.split("/")[1];
    pageName = pageName ? pageName.toLowerCase() : null;
    var url = pageName ? "app/views/" + pageName : null;

    require(["app", url], function (app, pageViewModel) {
        if (pageViewModel) {
            app.LoadView(pageViewModel);
        }        
    });
}

Bootstrap();

