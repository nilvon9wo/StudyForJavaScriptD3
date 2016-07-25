window.showModalDialog = window.showModalDialog || function (url, arg, feature) {
    function buildFeaturesArray(feature, equator, propertyFunc, valueFunc) {
        var opFeature = feature.split(';');
        var featuresArray = [];
        for (var index = 0; index < opFeature.length - 1; index++) {
            var feature = opFeature[index].split(equator);
            var property = propertyFunc(feature[0]);
            var value = valueFunc(feature[1]);
            featuresArray[property] = value;
        }
        return featuresArray;
    }

    var featuresArray = (document.all) ?
            buildFeaturesArray(feature, '=', function (property) {
                return property;
            }, function (value) {
                return value;
            }) :
            buildFeaturesArray(feature, ':', function (property) {
                return property.toString().trim().toLowerCase();
            }, function (value) {
                return value.toString().trim();
            });

    var featureObject = {
        height: featuresArray['dialogheight'] || '200px',
        width: featuresArray['dialogwidth'] || '400px',
        left: featuresArray['dialogleft'] || '100px',
        top: featuresArray['dialogtop'] || '100px',
        resizable: featuresArray['resizable'] || 'yes',
        center: featuresArray['center'] || 'yes',
        status: featuresArray['status'] || 'no'
    };

    var modalFeature = '';
    featureObject.forEachOwnProperty(function(property){
        modalFeature += ', ' + property + ' = '+ featureObject[property];
    });
    modalFeature = modalFeature.substring(2);
    
    var modal = window.open(url, '', modalFeature, null);
    modal.dailogArguments = arg;
};

window.setModalDialogReturn = window.setModalDialogReturn || function(returnValue) {
    window.returnValue = returnValue;
    localStorage.setItem('ModalDialogReturn', returnValue);
    this.close();
};

window.getModalDialogReturn = window.getModalDialogReturn || function() {
    return window.returnValue || localStorage.getItem('ModalDialogReturn');
};