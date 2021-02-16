define("components/navbar/navbar", ['knockout', 'jquery'], function (ko, $) {
    console.log("navbar loaded")

    var navbarVM = function (params) {
        params = params || {};

        var vmObj = {
            data: {
                _toggleState: ko.observable("right")
            },
            ux: function () {
                var vm = this;

                return {
                    toggleRightSideBar: function () {
                        
                        var pageWrapper = document.getElementById("page-wrapper");

                        if (pageWrapper) {
                            
                            var _toggleState = vm.data._toggleState;

                            if (pageWrapper.classList.contains("slide-left") || _toggleState() == "left") {
                                pageWrapper.classList.add("slide-right");
                                pageWrapper.classList.remove("slide-left");

                                _toggleState("right");
                            }
                            else if (pageWrapper.classList.contains("slide-right") || _toggleState() == "right") {
                                pageWrapper.classList.add("slide-left");
                                pageWrapper.classList.remove("slide-right");

                                _toggleState("left");
                            }

                        }


                    }
                }
                
            },
            Methods: function () {}
        }

        if (params.$parentChild) {
            params.$parentChild(vmObj);
        }

        return vmObj;
    }

    return navbarVM;
});