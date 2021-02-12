define("config", ['knockout', 'knockout-mapping'], function (ko, koMapping) {
    
    Array.prototype.firstOrDefault = function (key, match) {
        var _matchedObj = this[this.map(function (x) { return x[key]; }).indexOf(match)];
        return _matchedObj ? _matchedObj : null;
    }

    Array.prototype.match = function (match) {
        var _match = null;

        if (this.length > 0 && this.indexOf(match) >= 0) {
            _match = this[this.indexOf(match)];
        }

        return _match;
    }

    Array.prototype.contains = function (match) {
        var _match = false;

        if (!match)
            return _match;

        if (match.length > 0) {
            for (var i = 0; i < match.length; i++) {
                if (this.indexOf(match[i]) >= 0) {
                    _match = true;
                }

            }
        }
        else {
            _match = this.indexOf(match) >= 0;
        }

        return _match;
    }


    ko.bindingHandlers.cpNumeric = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            // This will be called when the binding is first applied to an element
            // Set up any initial state, event handlers, etc. here
            var bindings = allBindings(),
                el = element,
                koValue = valueAccessor(),
                context = bindingContext;

            koValue.subscribe(function (val) {
                if (val) {
                    val = koValue.replace(/\D/g, '');
                }
            });
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            // This will be called once when the binding is first applied to an element,
            // and again whenever any observables/computeds that are accessed change
            // Update the DOM element based on the supplied values here.
            var bindings = allBindings(),
                el = element,
                koValue = valueAccessor(),
                context = bindingContext;
        }
    };

    var ErrorHandlingBindingProvider = function () {
        var original = new ko.bindingProvider();

        //determine if an element has any bindings
        this.nodeHasBindings = original.nodeHasBindings;

        //return the bindings given a node and the bindingContext
        this.getBindings = function (node, bindingContext) {
            var result;
            try {
                result = original.getBindings(node, bindingContext);
            }
            catch (e) {
                if (console && console.error) {
                    console.error("Knockout Error in binding: " + e.message, node, bindingContext);
                }
            }

            return result;
        };
    }
    
    ko.bindingProvider.instance = new ErrorHandlingBindingProvider();

    ko.mapping = koMapping;

});