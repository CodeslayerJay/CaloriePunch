define("httpService", ['require', 'knockout', 'bootstrap', 'jquery'], function (require, ko, bootstrap, $) {

    var _local = "https://localhost:44352";

    var _config = {
        baseUrl: _local + "/api",
        headers: {},
        crossDomain: true,
        data: null,
        dataType: "json",
        method: "GET",
        contentType: "application/json"
    };


    var httpService = function () {
        return {
            getAsync: function (url, payload) {
                _config.url = _config.baseUrl + "/" + url;
                _config.data = payload;
                _config.method = "GET";

                return $.ajax(_config);
            },
            postAsync: function (url, payload) {
                
                _config.url = _config.baseUrl + "/" + url;
                _config.data = ko.toJSON(payload)
                _config.method = "POST";
               
                return $.ajax(_config);
            }
        }
    }

    return new httpService();
});