import { DataViewObject } from "./dataViewObject";
export var DataViewObjects;
(function (DataViewObjects) {
    /** Gets the value of the given object/property pair. */
    function getValue(objects, propertyId, defaultValue) {
        if (!objects) {
            return defaultValue;
        }
        return DataViewObject.getValue(objects[propertyId.objectName], propertyId.propertyName, defaultValue);
    }
    DataViewObjects.getValue = getValue;
    /** Gets an object from objects. */
    function getObject(objects, objectName, defaultValue) {
        if (objects && objects[objectName]) {
            return objects[objectName];
        }
        return defaultValue;
    }
    DataViewObjects.getObject = getObject;
    /** Gets the solid color from a fill property. */
    function getFillColor(objects, propertyId, defaultColor) {
        const value = getValue(objects, propertyId);
        if (!value || !value.solid) {
            return defaultColor;
        }
        return value.solid.color;
    }
    DataViewObjects.getFillColor = getFillColor;
    function getCommonValue(objects, propertyId, defaultValue) {
        const value = getValue(objects, propertyId, defaultValue);
        if (value && value.solid) {
            return value.solid.color;
        }
        if (value === undefined
            || value === null
            || (typeof value === "object" && !value.solid)) {
            return defaultValue;
        }
        return value;
    }
    DataViewObjects.getCommonValue = getCommonValue;
})(DataViewObjects || (DataViewObjects = {}));
//# sourceMappingURL=dataViewObjects.js.map