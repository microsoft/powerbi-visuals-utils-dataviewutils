/// <reference types="powerbi-visuals-tools" />
import IDataViewObject = powerbi.DataViewObject;
import DataViewObjects = powerbi.DataViewObjects;
import DataViewObjectPropertyIdentifier = powerbi.DataViewObjectPropertyIdentifier;
export declare module DataViewObjects {
    /** Gets the value of the given object/property pair. */
    function getValue<T>(objects: DataViewObjects, propertyId: DataViewObjectPropertyIdentifier, defaultValue?: T): T;
    /** Gets an object from objects. */
    function getObject(objects: DataViewObjects, objectName: string, defaultValue?: IDataViewObject): IDataViewObject;
    /** Gets the solid color from a fill property. */
    function getFillColor(objects: DataViewObjects, propertyId: DataViewObjectPropertyIdentifier, defaultColor?: string): string;
    function getCommonValue(objects: DataViewObjects, propertyId: DataViewObjectPropertyIdentifier, defaultValue?: any): any;
}
