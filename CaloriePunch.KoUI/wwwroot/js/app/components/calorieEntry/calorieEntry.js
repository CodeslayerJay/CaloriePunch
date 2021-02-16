define("components/calorieEntry/calorieEntry", ["knockout", "httpService", "knockout-mapping", "models/calorieEntryModel"],
    function (ko, httpService, koMapping, calorieEntryModel) {
    
        var calorieEntryVM = function (params) {
            params = params || {};

            var vmObj = {
                data: {
                    calorieEntryModel: ko.observable(new calorieEntryModel()),
                    placeholderMsgs: [
                        "I'm eating ### calories...",
                        "Wow! You're looking great!",
                        "Calories In, Calories out...",
                        "Let's Punch! some calories..."
                    ],
                    displayExtras: ko.observable(false),
                },
                errors: ko.observableArray([]),
                infoMsg: ko.observable(),
                isProcessing: ko.observable(false),
                ux: function () {
                    var vm = this;

                    return {
                        caretClass: ko.computed(function () {
                            return vm.data.displayExtras() == false ? "fas fa-caret-down" : "fas fa-caret-up";
                        }, this),
                    }
                },
                methods: function () {
                    var vm = this;

                    return {
                        getPlaceHolderMsg: ko.computed(function () {
                            var items = vm.data.placeholderMsgs;
                            return items[Math.floor(Math.random() * items.length)];
                        }),
                        displayExtras: function () {
                            //var _el = document.getElementById("extras-container");

                            vm.data.displayExtras(!vm.data.displayExtras());

                            //if (_el && vm.data.displayExtras() != false) {
                            //    _el.classList.add("slide-bottom");
                            //}
                            //else {
                            //    _el.classList.remove("slide-bottom");
                            //}

                        
                        },
                        save: function () {

                            if (vm.data.calorieEntryModel().isValid() == false) return false;

                            vm.isProcessing(true);
                            vm.http.postCalorieEntryAsync(vm.data.calorieEntryModel().mapToJson()).then(function (calorieEntryDTO) {
                                vm.isProcessing(false);

                                vm.data.displayExtras(false);
                                if (calorieEntryDTO) {
                                    vm.$parent.outputs.call(vm.$parent, { method: 'getAllowances' });
                                    vm.data.calorieEntryModel(new calorieEntryModel());

                                    if (typeof vm.$parent.outputs === 'function')
                                        vm.$parent.outputs.call(vm.$parent, { method: 'addToList', data: new calorieEntryModel(calorieEntryDTO) });
                                }

                            }).catch(function (err) {
                                vm.isProcessing(false);

                                if (typeof err === 'string')
                                    vm.errors.push(err);
                            });
                        },
                        delete: function (id) {
                            
                            if (id() > 0) {
                                vm.http.deleteEntryAsync(id()).then(function (isDeleted) {
                                    if (isDeleted) {
                                        vm.$parent.outputs.call(vm.$parent, { method: 'reloadList' });
                                        vm.$parent.outputs.call(vm.$parent, { method: 'getAllowances' });
                                        vm.data.calorieEntryModel(new calorieEntryModel());
                                    }
                                });
                            }
                        },
                        cancel: function () {
                            vm.data.calorieEntryModel(new calorieEntryModel());
                        }
                    }
                },
                http: {
                    postCalorieEntryAsync: function (payload) {
                        return new Promise(function (resolve, reject) {

                            httpService.postAsync('Calorie', payload).done(function (response) {
                                return resolve(response);
                            }).fail(function (err) {
                                return reject(err);
                            });

                        });
                    },
                    deleteEntryAsync: function (id) {
                        if (id > 0 == false) return Promise.reject(false);

                        return new Promise(function (resolve, reject) {
                            httpService.deleteAsync('Calorie/'+1+'/'+ id).done(function (response) {
                                return resolve(response);
                            }).fail(function (err) {
                                return reject(err);
                            });
                        });
                    }
                },
                $parent: params.$parentModel || {},
                $childModels: {},
                initOnBinding: function () {
                    var vm = this;
                
                }
            }
            
            if (params.$parentChild) {
                params.$parentChild(vmObj);
            }

            return vmObj;
        }

        return calorieEntryVM;
    }
);