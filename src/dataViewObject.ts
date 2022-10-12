/*
*  Power BI Visualizations
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
// powerbi
import powerbi from "powerbi-visuals-api";
import IDataViewObject = powerbi.DataViewObject;
import Fill = powerbi.Fill;

export function getValue<T>(object: IDataViewObject, propertyName: string, defaultValue?: T): T {
    if (!object) {
        return defaultValue;
    }

    const propertyValue = <T>object[propertyName];
    if (propertyValue === undefined) {
        return defaultValue;
    }

    return propertyValue;
}

/** Gets the solid color from a fill property using only a propertyName */
export function getFillColorByPropertyName(object: IDataViewObject, propertyName: string, defaultColor?: string): string {
    const value: Fill = getValue(object, propertyName);
    if (!value || !value.solid) {
        return defaultColor;
    }

    return value.solid.color;
}