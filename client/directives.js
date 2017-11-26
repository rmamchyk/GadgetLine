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

app.directive("fileModel", function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = scope[attrs.fileModel]
                model.photos = [];
                model.images = [];
                element.bind("change", function(event) {
                    var reader = new FileReader();
                    reader.onload = function(loadEvent){
                        scope.$apply(function() {
                            model.images.push({src: loadEvent.target.result});
                            model.photos.push(event.target.files[0]);
                        });
                    };
                    reader.readAsDataURL(event.target.files[0]);
                });
            }
        }
    }
);