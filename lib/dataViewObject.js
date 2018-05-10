export var DataViewObject;
(function (DataViewObject) {
    function getValue(object, propertyName, defaultValue) {
        if (!object) {
            return defaultValue;
        }
        let propertyValue = object[propertyName];
        if (propertyValue === undefined) {
            return defaultValue;
        }
        return propertyValue;
    }
    DataViewObject.getValue = getValue;
    /** Gets the solid color from a fill property using only a propertyName */
    function getFillColorByPropertyName(object, propertyName, defaultColor) {
        let value = getValue(object, propertyName);
        if (!value || !value.solid) {
            return defaultColor;
        }
        return value.solid.color;
    }
    DataViewObject.getFillColorByPropertyName = getFillColorByPropertyName;
})(DataViewObject || (DataViewObject = {}));
//# sourceMappingURL=dataViewObject.js.map