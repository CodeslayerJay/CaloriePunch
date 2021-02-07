define("views/signup", ['require', 'knockout', 'bootstrap', 'jquery', 'module', 'exports'],
function (require, ko, bootstrap, $, module, exports) {
    
    
    var signupVM = function () {
        return {
            test: ko.observable("Yo!!! This Is Awesome! Muahahah")
        }
    }

    return signupVM;
});