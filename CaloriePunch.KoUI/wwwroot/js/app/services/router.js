define("services/router", ["require", "module", "../auth/authService"],
function (require, module, authService) {
        
    var _authService = authService;

    var routes = [
        {
            name: "default",
            path: "",
            requireAuth: false,
        },
        {
            name: "signin",
            path: "views/signin",
            requireAuth: false,
        },
        {
            name: "signup",
            path: "views/signup",
            requireAuth: true,
        },
        {
            name: "dashboard",
            path: "views/dashboard",
            roles: ["user"],
            requireAuth: true,
        }
    ];

    var router = function () {
        return {
            routes: routes,
            find: function (routeName, viewName, roleType) {
                var _matches = routes.filter(function (x) {
                    return x.name == routeName || x.view == viewName || x.role == roleType;
                });

                return _matches;
            },
            currentView: function () {
                var _page = this.__getPageName();
                var _routeObj = routes.firstOrDefault("name", _page);

                this.__GuardView(_routeObj);
                    
                return _routeObj ? _routeObj.path : null;
            },
            __GuardView: function (routeObj) {
                if (!routeObj || !_authService.config.allowAuthRedirects) return false;
                var hasRoleAccess = this.__verifyRoleAccess(routeObj.roles);
                var loggedOutDefault = routes.firstOrDefault("name", _authService.config.redirectPageWhenLoggedOut);
                var loggedInDefault = routes.firstOrDefault("name", _authService.config.redirectPageWhenLoggedIn);
                var redirectTo = null;

                if (routeObj.requireAuth && !_authService.isAuth()) {
                    redirectTo = loggedOutDefault.name;
                }

                if (routeObj.requireAuth == false && _authService.isAuth()) {
                    redirectTo = loggedInDefault.name;
                }

                if ((routeObj.requireAuth && _authService.isAuth()) && (hasRoleAccess == false)) {
                    redirectTo = loggedInDefault.name;
                }

                if ((routeObj.requireAuth == false && !_authService.isAuth()) && (hasRoleAccess == false)) {
                    redirectTo = loggedOutDefault.name;
                }

                if (redirectTo) {
                    this.__redirectPage(redirectTo);
                }

            },
            __verifyRoleAccess: function (roles) {
                var userRoles = _authService.getUserRoles();
                    userRoles.contains(roles);
            },
            __getPageName: function () {
                var pageName = window.location.pathname.split("/")[1];
                return pageName ? pageName.toLowerCase() : null;
            },
            __redirectPage: function (url) {
                window.location.href = url ? url : "/";
            }
        }
    }



    return new router();

});