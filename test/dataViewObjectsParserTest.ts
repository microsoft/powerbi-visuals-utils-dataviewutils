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
import powerbi from "powerbi-visuals-tools";
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;

import {DataViewObjectsParser, DataViewProperties}  from "../src/dataViewObjectsParser";

const fillColor: string = "red",
    precision: number = 3.14;

function createDataView(
    generalFillColor: string = fillColor,
    generalPrecision: number = precision): DataView {
    return {
        metadata: {
            columns: [],
            objects: {
                general: {
                    fillColor: { solid: { color: generalFillColor } },
                    precision: generalPrecision
                }
            }
        }
    };
}

describe("DataViewObjectsParser", () => {
    describe("getDefault", () => {
        it("should return an instance of DataViewObjectsParser", () => {
            let instance: DataViewObjectsParser = DataViewObjectsParser.getDefault();

            expect(instance instanceof DataViewObjectsParser).toBeTruthy();
        });
    });

    describe("getProperties", () => {
        it("should return an object w/o any properties", () => {
            let properties: DataViewProperties = DataViewObjectsParserWithHiddenProperty
                .getDefault()
                .getProperties();

            expect(Object.keys(properties).length).toBe(0);
        });

        it("should return an object with a property", () => {
            let properties: DataViewProperties = DataViewObjectsParserWithAProperty
                .getDefault()
                .getProperties();

            expect(Object.keys(properties).length).toBe(1);
        });
    });

    describe("parse", () => {
        it("should return the correct color value", () => {
            const properties: DataViewObjectsParserWithProperties = DataViewObjectsParserWithProperties
                .parse<DataViewObjectsParserWithProperties>(createDataView());

            expect(properties.general.fillColor).toBe(fillColor);
        });

        it("should return the correct value", () => {
            const properties: DataViewObjectsParserWithProperties = DataViewObjectsParserWithProperties
                .parse<DataViewObjectsParserWithProperties>(createDataView());

            expect(properties.general.precision).toBe(precision);
        });

        it("should return default settings if the dataView is undefined", () => {
            const properties: DataViewObjectsParserWithProperties = DataViewObjectsParserWithProperties
                .parse<DataViewObjectsParserWithProperties>(null);

            expect(properties).toBeDefined();
        });
    });

    describe("enumerateObjectInstances", () => {
        let instancesOptions: EnumerateVisualObjectInstancesOptions,
            dataViewObjectParser: DataViewObjectsParserWithProperties;

        beforeEach(() => {
            instancesOptions = { objectName: "general" };

            dataViewObjectParser = DataViewObjectsParserWithProperties
                .parse<DataViewObjectsParserWithProperties>(createDataView());
        });

        it("shoud return an empty array if DataViewObjectParser is undefined", () => {
            let enumeration: VisualObjectInstance[] =
                DataViewObjectsParserWithProperties.enumerateObjectInstances(
                    undefined,
                    instancesOptions) as VisualObjectInstance[];

            expect(enumeration.length).toBe(0);
        });

        it("the objectName should be correct", () => {
            let enumeration: VisualObjectInstanceEnumerationObject =
                DataViewObjectsParserWithProperties.enumerateObjectInstances(
                    dataViewObjectParser,
                    instancesOptions) as VisualObjectInstanceEnumerationObject;

            expect(enumeration.instances[0].objectName).toBe("general");
        });

        it("the fillColor should be correct", () => {
            let enumeration: VisualObjectInstanceEnumerationObject =
                DataViewObjectsParserWithProperties.enumerateObjectInstances(
                    dataViewObjectParser,
                    instancesOptions) as VisualObjectInstanceEnumerationObject;

            expect(enumeration.instances[0].properties["fillColor"]).toBe(fillColor);
        });
    });
});

class DataViewObjectsParserWithHiddenProperty extends DataViewObjectsParser {
    public _hiddenProperty: string = "Power BI";
}

class DataViewObjectsParserWithAProperty extends DataViewObjectsParser {
    public testProperty: string = "Power BI";
}

class GeneralProperties {
    public fillColor: string = "blue";
    public precision: number = 5;
}

class DataViewObjectsParserWithProperties extends DataViewObjectsParser {
    public general: GeneralProperties = new GeneralProperties();
}
