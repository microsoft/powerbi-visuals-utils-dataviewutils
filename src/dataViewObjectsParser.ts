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
import DataViewObjectPropertyIdentifier = powerbi.DataViewObjectPropertyIdentifier;
import DataView = powerbi.DataView;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstanceEnumeration = powerbi.VisualObjectInstanceEnumeration;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import * as DataViewObjects from "./dataViewObjects";

export interface DataViewProperty {
    [propertyName: string]: DataViewObjectPropertyIdentifier;
}

export interface DataViewProperties {
    [propertyName: string]: DataViewProperty;
}

export class DataViewObjectsParser {
    private static InnumerablePropertyPrefix: RegExp = /^_/;

    public static getDefault() {
        return new this();
    }

    private static createPropertyIdentifier(
        objectName: string,
        propertyName: string): DataViewObjectPropertyIdentifier {

        return {
            objectName,
            propertyName
        };
    }

    public static parse<T extends DataViewObjectsParser>(dataView: DataView): T {
        const dataViewObjectParser: T = <T>this.getDefault()

        if (!dataView || !dataView.metadata || !dataView.metadata.objects) {
            return dataViewObjectParser;
        }

        const properties: DataViewProperties = dataViewObjectParser.getProperties();

        for (const objectName in properties) {
            for (const propertyName in properties[objectName]) {
                const defaultValue: any = dataViewObjectParser[objectName][propertyName];

                dataViewObjectParser[objectName][propertyName] = DataViewObjects.getCommonValue(
                    dataView.metadata.objects,
                    properties[objectName][propertyName],
                    defaultValue);
            }
        }

        return dataViewObjectParser;
    }

    private static isPropertyEnumerable(propertyName: string): boolean {
        return !DataViewObjectsParser.InnumerablePropertyPrefix.test(propertyName);
    }

    public static enumerateObjectInstances(
        dataViewObjectParser: DataViewObjectsParser,
        options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {

        const dataViewProperties: DataViewProperties = dataViewObjectParser && dataViewObjectParser[options.objectName];

        if (!dataViewProperties) {
            return [];
        }

        const instance: VisualObjectInstance = {
            objectName: options.objectName,
            selector: null,
            properties: {}
        };

        for (const key in dataViewProperties) {
            if (Object.prototype.hasOwnProperty.call(dataViewProperties, key)) {
                instance.properties[key] = dataViewProperties[key];
            }
        }

        return {
            instances: [instance]
        };
    }

    public getProperties(): DataViewProperties {
        const properties: DataViewProperties = {},
            objectNames: string[] = Object.keys(this);

        objectNames.forEach((objectName: string) => {
            if (DataViewObjectsParser.isPropertyEnumerable(objectName)) {
                const propertyNames: string[] = Object.keys(this[objectName]);

                properties[objectName] = {};

                propertyNames.forEach((propertyName: string) => {
                    if (DataViewObjectsParser.isPropertyEnumerable(objectName)) {
                        properties[objectName][propertyName] =
                            DataViewObjectsParser.createPropertyIdentifier(objectName, propertyName);
                    }
                });
            }
        });

        return properties;
    }
}
