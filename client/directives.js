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
                model.previews = [];
                element.bind("change", function(event) {
                    var selectedFile = event.target.files[0];
                    model.photos.push(selectedFile);

                    var reader = new FileReader();
                    reader.onload = function(loadEvent){
                        scope.$apply(function() {
                            model.previews.push({src: loadEvent.target.result});

                        });
                    };
                    reader.readAsDataURL(event.target.files[0]);
                });
            }
        }
    }
);