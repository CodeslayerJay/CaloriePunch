define(function (require, exports, module) {
    var ko = require("knockout");

    var signupVM = function () {
        return {
            test: ko.observable("test")
        }
    }

    return signupVM;
});