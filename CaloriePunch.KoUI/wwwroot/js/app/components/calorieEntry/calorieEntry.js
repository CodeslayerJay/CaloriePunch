define("components/calorieEntry/calorieEntry", ["knockout", "httpService", "knockout-mapping"], function (ko, httpService, koMapping) {
    
    var calorieEntryVM = function ($parentModel, $outputs) {
        $outputs = $outputs || ko.observableArray([]);

        return {
            data: {
                calorieEntryModel: ko.observable(new CalorieEntryForm()),
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
            isProcessing: ko.observable(),
            outputs: $outputs,
            ux: function () {
                var vm = this;

                return {
                    caretClass: ko.computed(function () {
                        return vm.data.displayExtras() == false ? "fas fa-caret-down" : "fas fa-caret-up";
                    }, this)
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

                        vm.http.postCalorieEntryAsync(vm.data.calorieEntryModel().mapToJson()).then(function (calorieEntryDTO) {
                            if (calorieEntryDTO) {
                                vm.data.calorieEntryModel().id(calorieEntryDTO.id);

                                vm.data.calorieEntryModel(new CalorieEntryForm());

                                vm.outputs.push(vm.data.calorieEntryModel().mapToJson());
                            }
                        });
                    }
                }
            },
            http: {
                postCalorieEntryAsync: function (payload) {
                    return new Promise(function (resolve, reject) {

                        httpService.postAsync('Calorie', payload).then(function (response) {
                            return resolve(response);
                        }).catch(function (err) {
                            reject(err);
                        });

                    });
                }
            },
            $parent: $parentModel || {},
            $childModels: {},
            initOnBinding: function () {
                var vm = this;
                
            }
        }
    }

    var CalorieEntryForm = function (dataObj) {
        var self = this;

        self.id = ko.observable();
        self.calories = ko.observable();
        self.fat = ko.observable();
        self.carbs = ko.observable();
        self.protein = ko.observable();
        self.entryName = ko.observable();
        self.quantity = ko.observable(1);

        // setters
        self.calculateCalories = function () {
            var _calories = ko.unwrap(self.calories) || 0,
                _fat = ko.unwrap(self.fat) || 0,
                _carbs = ko.unwrap(self.carbs) || 0,
                _protein = ko.unwrap(self.protein) || 0,
                _qty = ko.unwrap(self.quantity) || 0;

            if (_calories > 0 && (_fat > 0 || _carbs > 0 || _protein > 0))
                _calories = 0;

            if (_fat > 0)
                _calories = _calories + (_fat * 9);

            if (_carbs > 0)
                _calories = _calories + (_carbs * 4);

            if (_protein > 0)
                _calories = _calories + (_protein * 4);

            if (_qty > 0)
                _calories = (_calories * _qty);

            self.calories(_calories);
        }

        self.fat.subscribe(function (val) {
            if (val)
                self.calculateCalories();
        });

        self.carbs.subscribe(function (val) {
            if (val)
                self.calculateCalories();
        });

        self.protein.subscribe(function (val) {
            if (val)
                self.calculateCalories();
        });

        self.quantity.subscribe(function (val) {
            if (val)
                self.calculateCalories();
        })

        // validation, utils
        self.mapToJson = function () {
            var _jsonObj = { ...ko.mapping.toJS(self) };
            debugger
            return _jsonObj;
        }


        self.validationErrors = ko.observableArray([]);
        self.isValid = function () {
            self.validationErrors.removeAll();

            self.validate();
            return self.validationErrors().length == 0;
        }

        self.validate = function () {
            
            try {
                if (parseFloat(ko.unwrap(self.calories)) > 0 == false)
                    self.validationErrors.push("Calories punched must be greater than 0.");
            }
            catch (e) { }
            
        }
    }


    return calorieEntryVM;
});