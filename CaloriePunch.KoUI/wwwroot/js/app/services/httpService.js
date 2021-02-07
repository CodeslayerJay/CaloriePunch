define("app/services/httpService", ['require', 'knockout', 'bootstrap', 'jquery'], function (require, ko, bootstrap, $) {

    var _config = {
        baseUrl: "",
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
                _config.url = baseUrl + "/" + url;
                _config.data = payload;
                _config.method = "GET";

                return $.ajax(_config);
            },
            postAsync: function (url, payload) {
                _config.url = baseUrl + "/" + url;
                _config.data = payload;
                _config.method = "POST";

                return $.ajax(_config);
            }
        }
    }

    return httpService;
});