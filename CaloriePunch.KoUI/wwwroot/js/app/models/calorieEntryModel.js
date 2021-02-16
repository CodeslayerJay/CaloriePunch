define("models/calorieEntryModel", ["knockout"], function (ko) {

    var calorieEntry = function (dataObj) {
        var self = this;
        dataObj = dataObj || {};
        
        self.id = ko.observable(dataObj.id);
        self.calories = ko.observable(dataObj.calories);
        self.fat = ko.observable(dataObj.fat);
        self.carbs = ko.observable(dataObj.carbs);
        self.protein = ko.observable(dataObj.protein);
        self.entryName = ko.observable(dataObj.entryName);
        self.quantity = ko.observable(dataObj.quantity ? dataObj.quantity : 1);
        self.createdAt = ko.observable(dataObj.createdAt);

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
                var _cal = parseFloat(ko.unwrap(self.calories));

                if (_cal > 0 == false)
                    self.validationErrors.push("Calories punched must be greater than 0 kcal.");

                if (_cal > 10000)
                    self.validationErrors.push("Calories entered must be less than 10,000 kcal");
            }
            catch (e) { }

        }
    }

    return calorieEntry;
});