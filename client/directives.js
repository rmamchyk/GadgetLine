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

                function getFileExtension(filename) {
                    var r = /.+\.(.+)$/.exec(filename);
                    return r ? r[1] : null;
                }

                function arrayBufferToBase64( buffer ) {
                    var binary = '';
                    var bytes = new Uint8Array( buffer );
                    var len = bytes.byteLength;
                    for (var i = 0; i < len; i++) {
                        binary += String.fromCharCode( bytes[ i ] );
                    }
                    return window.btoa( binary );
                }

                function base64ToArrayBuffer(base64) {
                    var binary_string =  window.atob(base64);
                    var len = binary_string.length;
                    var bytes = new Uint8Array( len );
                    for (var i = 0; i < len; i++)        {
                        bytes[i] = binary_string.charCodeAt(i);
                    }
                    return bytes.buffer;
                }

                element.bind("change", function(event) {
                    var selectedFile = event.target.files[0];
                    var reader = new FileReader();
                    reader.onload = function(loadEvent){
                        var fileName = model.product.code + '-' + Math.random().toString(36).substr(2, 9) + '.' + getFileExtension(selectedFile.name);
                        var fileDataURL = 'data:' + selectedFile.type +';base64,' + arrayBufferToBase64(loadEvent.target.result);
                        scope.$apply(function() {
                            model.previews.push({name: fileName, src: fileDataURL});
                            model.mainImage = fileDataURL;
                            model.photos.push(new File([loadEvent.target.result], fileName, {type: selectedFile.type}));
                        });
                    };
                    reader.readAsArrayBuffer(selectedFile);
                });
            }
        }
    }
);