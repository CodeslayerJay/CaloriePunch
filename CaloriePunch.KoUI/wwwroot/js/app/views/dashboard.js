define("views/dashboard", ['require', 'knockout', 'bootstrap', 'jquery', 'httpService'],
function (require, ko, bootstrap, $, httpService) {

   
    ko.components.register('navbar-component', {
        viewModel: { require: "components/navbar/navbar" },
        template: { require: "text!components/navbar/navbar.html" }
    });

    ko.components.register('calorieEntry-component', {
        viewModel: { require: "components/calorieEntry/calorieEntry" },
        template: { require: "text!components/calorieEntry/calorieEntry.html" }
    });

    ko.components.register('calorieEntryList-component', {
        viewModel: { require: "components/entryList/entryList" },
        template: { require: "text!components/entryList/entryList.html" }
    });
                
    var DashboardVM = function ($parentModel) {
        
        var vmObj = {
            data: {
                dailyCalAllowance: ko.observable(0),
                weeklyCalAllowance: ko.observable(0)
            },
            errors: ko.observableArray([]),
            infoMsg: ko.observable(),
            isProcessing: ko.observable(),
            methods: function () {
                var vm = this;

                return {
                    addToList: function (calorieEntryModel) {
                        if (calorieEntryModel) {
                            vm.$childModels.calorieEntryListVM().methods().addToList(calorieEntryModel);
                        }
                    },
                    editEntry: function (calorieEntryModel) {
                        if (calorieEntryModel) {
                            vm.$childModels.calorieEntryVM().data.calorieEntryModel(calorieEntryModel);
                        }
                    },
                    toggleSidebar: function () {
                        vm.$childModels.navbarVM().ux().toggleRightSideBar();
                    },
                    reloadList: function () {
                        vm.$childModels.calorieEntryListVM().methods().loadData();
                    },
                    subtractFromCalAllowances: function (amount) {
                        amount = amount || 0;
                        var _daily = ko.unwrap(vm.data.dailyCalAllowance()),
                            _weekly = ko.unwrap(vm.data.weeklyCalAllowance());

                        var _dCalc = (_daily - amount);
                        var _wCalc = (_weekly - amount);

                        if (isNaN(_dCalc) == false && isNaN(_wCalc) == false) {
                            vm.data.dailyCalAllowance(_dCalc);
                            vm.data.weeklyCalAllowance(_wCalc);
                        }
                    },
                    addToCalAllowances: function (amount) {
                        amount = amount || 0;

                        var _daily = ko.unwrap(vm.data.dailyCalAllowance()),
                            _weekly = ko.unwrap(vm.data.weeklyCalAllowance());

                        var _dCalc = (_daily + amount);
                        var _wCalc = (_weekly + amount);

                        vm.data.dailyCalAllowance(_dCalc);
                        vm.data.weeklyCalAllowance(_wCalc);
                    },
                    getAllowances: function () {
                        vm.http.getCalorieAllowancesAsync().then(function (x) {
                            if (x) {
                                vm.data.dailyCalAllowance(x.dailyAllowance);
                                vm.data.weeklyCalAllowance(x.weeklyAllowance);
                            }
                        });
                    }
                }
            },
            http: {
                getCalorieAllowancesAsync: function () {
                    return new Promise(function (resolve, reject) {
                        httpService.getAsync('Calorie/Allowances/' + 1).done(function (response) {
                            resolve(response);
                        })
                    });
                }
            },
            $parent: $parentModel || {},
            $childModels: {
                calorieEntryVM: ko.observable(),
                calorieEntryListVM: ko.observable(),
                navbarVM: ko.observable()
            },
            outputs: function (params) {
                var vm = this;
                params = params || {};
                params.data = params.data || null;
                
                if (vm.methods()[params.method]) {
                    vm.methods()[params.method](params.data);
                }
            
            },
            initOnBinding: function () {
                var vm = this;
                vm.$parent.displayLoadingScreen(false);
                vm.methods().getAllowances();
            }
        }

        return vmObj;
    }


    return DashboardVM;
});