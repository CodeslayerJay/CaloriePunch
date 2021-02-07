define("auth/authConfig", function () {
    return {
        roles: ["admin", "user", "guest"],
        redirectPageWhenLoggedOut: "signin",
        redirectPageWhenLoggedIn: "dashboard",
        allowAuthRedirects: true
    }
});