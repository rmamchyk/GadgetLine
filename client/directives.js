app.directive('toggleClass', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function () {
                element.toggleClass(attrs.toggleClass);
            });
        }
    };
});

app.directive('myEnter', function () {
    return function (scope, element, attrs) {

        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
