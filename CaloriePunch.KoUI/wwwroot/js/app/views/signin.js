define("views/signin", ['require', 'knockout', 'bootstrap', 'jquery'], function (require, ko, bootstrap, $) {
    
    var signInVM = function (parentModel) {
        return {
            errors: ko.observableArray([]),
            infoMsg: ko.observable(),
            isProcessing: ko.observable(false),
            data: {
                test: ko.observable("testing")
            },
            methods: function () {

            },
            HTTP: {},
            $Parent: parentModel || {},
            $Components: {}
        }
    }


    return signInVM;
});