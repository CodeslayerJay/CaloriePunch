define(function (require, exports, module) {
    var ko = require("knockout");

    var httpService = function () {
        return {
            Init: function () {
                alert('testing')
            }
        }
    }

    return httpService;
});