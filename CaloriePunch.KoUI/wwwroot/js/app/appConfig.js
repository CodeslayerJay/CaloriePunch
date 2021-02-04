var _appConfig = {
    AppName: "CaloriePunch",

};

require.config({
    baseUrl: "/js",
    paths: {
        "app": "/app/app",
        "bootstrap": "../lib/bootstrap/dist/js/bootstrap.js",
        "jquery": "../lib/jquery/dist/jquery.js",
        "knockout": "../lib/knockout.js"
    },
    waitSeconds: 15,
    config: _appConfig
});