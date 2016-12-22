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

/// <reference path="_references.ts"/>

module powerbi.extensibility.utils.dataview.test {
    // powerbi.extensibility.utils.dataview
    import DataViewObjects = powerbi.extensibility.utils.dataview.DataViewObjects;

    describe("DataViewObjects", () => {
        const fillColor: string = "green",
            fontSize: number = 22,
            groupName: string = "general",
            fillColorName: string = "fillColor",
            fontSizeName: string = "fontSize",
            fillColorProperty: DataViewObjectPropertyIdentifier = {
                objectName: groupName,
                propertyName: fillColorName
            },
            fontSizeProperty: DataViewObjectPropertyIdentifier = {
                objectName: groupName,
                propertyName: fontSizeName
            };

        function createDataViewObjects(
            generalFillColor: string = fillColor,
            generalFontSize: any = fontSize): DataViewObjects {

            return {
                [groupName]: {
                    [fillColorName]: { solid: { color: generalFillColor } },
                    [fontSizeName]: generalFontSize
                }
            };
        }

        describe("getCommonValue", () => {
            it("should return the correct color", () => {
                const objects: DataViewObjects = createDataViewObjects();

                const actualValue: string = DataViewObjects.getCommonValue(
                    objects,
                    fillColorProperty);

                expect(actualValue).toBe(fillColor);
            });

            it("should return the default value if property is undefined", () => {
                const objects: DataViewObjects = {};

                const actualValue: string = DataViewObjects.getCommonValue(
                    objects,
                    fillColorProperty,
                    fillColor);

                expect(actualValue).toBe(fillColor);
            });

            it("should return the correct value", () => {
                const objects: DataViewObjects = createDataViewObjects();

                const actualValue: string = DataViewObjects.getCommonValue(
                    objects,
                    fontSizeProperty);

                expect(actualValue).toBe(fontSize);
            });

            it("should return value of the default value if object is an empty object and default value is null", () => {
                const objects: DataViewObjects = {},
                    defaultValue: any = null;

                const actualValue: string = DataViewObjects.getCommonValue(
                    objects,
                    fontSizeProperty,
                    defaultValue);

                expect(actualValue).toBe(defaultValue);
            });

            it("should return false is the property defined as false", () => {
                const expectedValue: boolean = false,
                    objects: DataViewObjects = createDataViewObjects(null, expectedValue);

                const actualValue: string = DataViewObjects.getCommonValue(
                    objects,
                    fontSizeProperty,
                    "Power BI");

                expect(actualValue).toBe(expectedValue);
            });
        });
    });
}
