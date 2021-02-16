define("components/entryList/entryList", ["knockout", "models/calorieEntryModel", "httpService", "dayjs"], function (ko, calorieEntryModel, httpService, dayjs) {
    
    var entryListVM = function (params) {
        params = params || {};

        var vmObj = {
            data: {
                entries: ko.observableArray([]),
                currentListView: ko.observable("today"),
                totalCalories: ko.observable(0)
            },
            errors: ko.observableArray([]),
            infoMsg: ko.observable(),
            isProcessing: ko.observable(false),
            ux: function () {
                var vm = this;

                //var _totalCalories = ko.unwrap(vm.data.totalCalories());

                return {
                    entryListTemplate: ko.computed(function () {
                        switch (ko.unwrap(vm.data.currentListView())) {
                            case 'today':
                                return 'todayListing-template';
                            case 'week':
                                return 'weekListing-template';
                            case 'month':
                                return 'monthListing-template';
                            default:
                                return 'todayListing-template';
                        }
                    }),
                    displayedEntries: ko.computed(function () { 
                        var _view = ko.unwrap(vm.data.currentListView()),
                            _totalCals = 0,
                            _today = dayjs(),
                            _tomorrow = dayjs().add(1, 'day'),
                            _weekStart = dayjs().day(0),
                            _weekEnd = dayjs().day(6),
                            _month = dayjs().month(),
                            _entries = [];
                            
                        //debugger

                        var _entries = vm.data.entries().filter(function (x) {
                            var _parsedDate = dayjs(x.createdAt());
                            
                            if (_view == 'today' && (_parsedDate.date() >= _today.date() && _parsedDate.date() < _tomorrow.date())) {
                                _totalCals = (_totalCals + x.calories());
                                return x;
                            }
                            else if (_view == 'week' && (dayjs(_parsedDate).date() >= _weekStart.date() && dayjs(_parsedDate).date() < _weekEnd.date())) {
                                _totalCals = (_totalCals + x.calories());
                                return x;
                            }
                            else if (_view == 'month' && (dayjs(_parsedDate).month() == _month)) {
                                _totalCals = (_totalCals + x.calories());
                                return x;
                            }
                        });

                        // Group dates together
                        if (_view == 'month' || _view == 'week') {
                            var _compareDate = dayjs(),
                                _group = [];

                            //debugger
                            _entries.map(function (x) {
                                //debugger
                                var _parsedDate = dayjs(x.createdAt());
                                if (_parsedDate.date() == _compareDate.date()) {
                                    var grp = _group.firstOrDefault('createdAt', _parsedDate.date());

                                    if (grp) {
                                        grp.totalCals = (grp.totalCals + x.calories());
                                        grp.groupedEntries.push(x);
                                    }
                                        
                                    //return;
                                }
                                else {
                                    //debugger
                                    if (x.createdAt()) {
                                        var grpObj = {
                                            createdAt: _parsedDate.date(),
                                            totalCals: x.calories(),
                                            displayDate: _parsedDate.format("ddd") + " " + _parsedDate.format("DD"),
                                            groupedEntries: new Array()
                                        };

                                        grpObj.groupedEntries.push(x);

                                        _group.push(grpObj);
                                        _compareDate = _parsedDate;
                                    }
                                }
                            });

                            vm.data.totalCalories(_totalCals);
                            
                            return _group;
                        }
                        
                        vm.data.totalCalories(_totalCals);
                        //debugger
                        return _entries;
                    }),
                    displayTime: function (val) {
                        val = ko.unwrap(val);
                        
                        if (val) {
                            var _d = dayjs(val);
                            return _d.format("hh:mm a");
                        }
                    }
                };
            },
            methods: function () {
                var vm = this;

                return {
                    loadData: function () {
                        vm.http.getCalorieEntriesAsync(1).then(function (response) {
                            if (response && response.length > 0) {
                                vm.data.entries(response.map(function (x) {
                                    return new calorieEntryModel(x);
                                }));
                            }
                        });
                    },
                    addToList: function (calorieEntryModel) {
s
                        if (calorieEntryModel) {
                            //vm.data.entries.push(calorieEntryModel);
                            vm.methods().loadData();
                        }
                    },
                    nextListTemplate: function () {
                        switch (ko.unwrap(vm.data.currentListView())) {
                            case 'today':
                                vm.data.currentListView('week')
                                break;
                            case 'week':
                                vm.data.currentListView('month')
                                break;
                            case 'month':
                                vm.data.currentListView('today')
                                break;
                            default:
                                vm.data.currentListView('today')
                                break;
                        }
                    },
                    editEntry: function (calorieEntryModel) {
                        
                        if (calorieEntryModel) {
                            vm.$parent.outputs.call(vm.$parent, { method: 'toggleSidebar' });
                            vm.$parent.outputs.call(vm.$parent, { method: 'editEntry', data: calorieEntryModel });
                        }
                            
                    }
                };
            },
            http: {
                getCalorieEntriesAsync: function (userId) {
                    return new Promise(function (resolve, reject) {
                        httpService.getAsync("Calorie/"+userId).done(function (response) {
                            return resolve(response);
                        }).fail(function (err) {  return reject(err); })
                    });
                }
            },
            $parent: params.$parentModel || {},
            $childModels: {}
        }

        if (params.$parentChild) {
            params.$parentChild(vmObj);
            vmObj.methods().loadData();
        }
            

        return vmObj;
    }

    return entryListVM;
});