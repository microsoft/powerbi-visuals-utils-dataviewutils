/// <reference types="powerbi-visuals-tools" />
import powerbi from "powerbi-visuals-tools";
import IDataViewObject = powerbi.DataViewObject;
export declare module DataViewObject {
    function getValue<T>(object: IDataViewObject, propertyName: string, defaultValue?: T): T;
    /** Gets the solid color from a fill property using only a propertyName */
    function getFillColorByPropertyName(object: IDataViewObject, propertyName: string, defaultColor?: string): string;
}
