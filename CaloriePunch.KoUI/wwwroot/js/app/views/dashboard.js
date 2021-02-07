define("views/dashboard", ['require', 'knockout', 'bootstrap', 'jquery'],
function (require, ko, bootstrap, $) {

    ko.components.register('navbar-component', {
        viewModel: { require: "components/navbar/navbar" },
        template: { require: "text!components/navbar/navbar.html" }
    });
                
    var DashboardVM = function ($parentModel) {
        
        return {
            data: ko.observable(new EntryForm()),
            errors: ko.observableArray([]),
            infoMsg: ko.observable(),
            isProcessing: ko.observable(),
            methods: function () {
                return {}
            },
            http: {

            },
            $parent: $parentModel || {},
            $childModels: {},
            initOnBinding: function () {
                var vm = this;
                vm.$parent.displayLoadingScreen(false);
            }
        }
    }


    var EntryForm = function (dataObj) {
        var self = this;

        self.calorieEntry = ko.observable("");
    }


    return DashboardVM;
});