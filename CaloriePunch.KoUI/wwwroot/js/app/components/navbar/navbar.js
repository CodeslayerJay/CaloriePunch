define("components/navbar/navbar", ['knockout', 'jquery'], function (ko, $) {
    console.log("navbar loaded")

    var navbarVM = function () {
        return {
            data: {
                _toggleState: ko.observable("right")
            },
            UX: {
                toggleRightSideBar: function () {
                    var vm = this;
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
                    

                },
                //toggleRightSideBarJS: function () {
                //    var vm = this;
                //    var pageWrapper = document.getElementById("page-wrapper");
                    
                //    if (pageWrapper) {
                //        var _direction = pageWrapper.classList.contains("slide-left") ? "slide-right" : "slide-left";

                //        var moveAmount = window.innerWidth - 100;
                //        var left = 0;
                //        do {
                //            pageWrapper.style.position.left -= left;
                //            left--
                //        } while (left > moveAmount);
                //    }


                //}
            },
            Methods: function () {}
        }
    }

    return navbarVM;
});