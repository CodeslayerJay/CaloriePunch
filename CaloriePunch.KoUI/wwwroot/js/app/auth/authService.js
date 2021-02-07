define("auth/authService", ['require', 'module', '../services/httpService', './authConfig', 'knockout'],
function (require, module, httpService, authConfig, ko) {


    var AuthService = function () {
        return {
            __isAuth: ko.observable(true),
            config: authConfig,
            isAuth: function () {
                return this.__isAuth();
            },
            authenticate: function () {
                http.postAsync("Auth", {}).done(function (resp) {

                });
            },
            getUserRoles: function () {
                var _upProfile = this.getUserProfile();

                if (_upProfile && _upProfile.roles)
                    return roles;

                return ["user"];
            },
            getUserProfile: function () {
                var _userProfile = window.localStorage.getItem("userProfile");

                if (_userProfile) { return _userProfile };
            }
        }
    }


    var UserProfile = function (dataObj) {
        var self = this;
        dataObj = dataObj || {};

        self.UserId = dataObj.userId;
        self.Username = dataObj.username;
        self.Roles = dataObj.roles;

    }


    return new AuthService();
});