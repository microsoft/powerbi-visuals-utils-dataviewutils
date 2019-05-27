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

// powerbi.extensibility.utils.dataview
import * as DataViewObject  from "../src/dataViewObject";

describe("DataViewObject", () => {
    const fontSizePropertyName: string = "fontSize",
        fillColorPropertyName: string = "fillColor",
        fontSize: string = "11em",
        fillColor: string = "green";

    function getDataViewObject(
        fontSize: any,
        fillColor: string): IDataViewObject {

        return {
            [fontSizePropertyName]: fontSize,
            [fillColorPropertyName]: { solid: { color: fillColor } }
        };
    }

    describe("getValue", () => {
        it("should return the default value if the object is undefined", () => {
            const actualFontSize: string = DataViewObject.getValue(
                undefined,
                undefined,
                fontSize);

            expect(actualFontSize).toBe(fontSize);
        });

        it("should return the default value if the property isn't available in the object", () => {
            const object: IDataViewObject = getDataViewObject(fontSize, fontSize);

            const actualFontSize: string = DataViewObject.getValue(
                object,
                "Power BI",
                fontSize);

            expect(actualFontSize).toBe(fontSize);
        });
    });

    describe("getFillColorByPropertyName", () => {
        it("should return a default color if the object is undefined", () => {
            const actualFillColor: string = DataViewObject.getFillColorByPropertyName(
                undefined,
                undefined,
                fillColor);

            expect(actualFillColor).toBe(fillColor);
        });

        it("should return a default color if property isn't available in the object", () => {
            const object: IDataViewObject = getDataViewObject(fontSize, fillColor);

            const actualFillColor: string = DataViewObject.getFillColorByPropertyName(
                object,
                "Power BI",
                fillColor);

            expect(actualFillColor).toBe(fillColor);
        });

        it("should return a default color if the solid is undefined", () => {
            const object: IDataViewObject = getDataViewObject(fontSize, fillColor);

            object[fillColorPropertyName]["solid"] = undefined;

            const actualFillColor: string = DataViewObject.getFillColorByPropertyName(
                object,
                fillColorPropertyName,
                fillColor);

            expect(actualFillColor).toBe(fillColor);
        });

        it("should return the color", () => {
            const object: IDataViewObject = getDataViewObject(fontSize, fillColor);

            const actualFillColor: string = DataViewObject.getFillColorByPropertyName(
                object,
                fillColorPropertyName);

            expect(actualFillColor).toBe(fillColor);
        });
    });
});