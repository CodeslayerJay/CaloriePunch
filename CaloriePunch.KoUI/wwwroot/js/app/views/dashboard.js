define("views/dashboard", ['require', 'knockout', 'bootstrap', 'jquery'],
function (require, ko, bootstrap, $) {
   
    ko.components.register('navbar-component', {
        viewModel: { require: "components/navbar/navbar" },
        template: { require: "text!components/navbar/navbar.html" }
    });

    ko.components.register('calorieEntry-component', {
        viewModel: { require: "components/calorieEntry/calorieEntry" },
        template: { require: "text!components/calorieEntry/calorieEntry.html" }
    });
                
    var DashboardVM = function ($parentModel) {
        
        return {
            data: {},
            errors: ko.observableArray([]),
            infoMsg: ko.observable(),
            isProcessing: ko.observable(),
            methods: function () {
                return {}
            },
            http: {

            },
            $parent: $parentModel || {},
            $childModels: {
                calorieEntryModel: ko.observable()
            },
            initOnBinding: function () {
                var vm = this;
                vm.$parent.displayLoadingScreen(false);
            }
        }
    }


    return DashboardVM;
});