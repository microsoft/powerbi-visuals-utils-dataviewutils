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
import DataView = powerbi.DataView;
import DataViewMetadata = powerbi.DataViewMetadata;
import DataViewValueColumnGroup = powerbi.DataViewValueColumnGroup;
import  DataViewCategoryColumn    = powerbi.DataViewCategoryColumn;
import DataViewValueColumn = powerbi.DataViewValueColumn;

// powerbi.extensibility.utils.dataview
import {DataRoleHelper} from "../src/dataRoleHelper";
import {DataViewTransform}  from "../src/dataViewTransform";

describe("DataRoleHelper", () => {
    describe("getMeasureIndexOfRole", () => {
        let dataViewBuilder: DataViewBuilder;

        beforeEach(() => {
            dataViewBuilder = new DataViewBuilder();

            dataViewBuilder.categoriesValues = ["Montana", "California", "Arizona"];
            dataViewBuilder.values = [
                [-100, 200, 700],
                [1, 2, 3],
                [4, 5, 6]
            ];
        });

        it("getMeasureIndexOfRole with roles validation", () => {
            dataViewBuilder.columns = [
                { displayName: "col1" },
                { displayName: "col2", isMeasure: true, roles: { "Size": true } },
                { displayName: "col3", isMeasure: true, roles: { "X": true } },
                { displayName: "col4", isMeasure: true, roles: { "Y": true } }
            ];

            const dataView: DataView = dataViewBuilder.build();

            const grouped: DataViewValueColumnGroup[] = dataView.categorical.values.grouped();

            let result: number = DataRoleHelper.getMeasureIndexOfRole(grouped, "InvalidRoleName");
            expect(result).toBe(-1);

            result = DataRoleHelper.getMeasureIndexOfRole(grouped, "Size");
            expect(result).toBe(0);

            result = DataRoleHelper.getMeasureIndexOfRole(grouped, "X");
            expect(result).toBe(1);

            result = DataRoleHelper.getMeasureIndexOfRole(grouped, "Y");
            expect(result).toBe(2);
        });

        it("getMeasureIndexOfRole without roles validation", () => {
            dataViewBuilder.columns = [
                { displayName: "col1" },
                { displayName: "col2", isMeasure: true },
                { displayName: "col3", isMeasure: true },
                { displayName: "col4", isMeasure: true }
            ];

            const dataView: DataView = dataViewBuilder.build();

            const grouped = dataView.categorical.values.grouped();

            let result = DataRoleHelper.getMeasureIndexOfRole(grouped, "InvalidRoleName");
            expect(result).toBe(-1);

            result = DataRoleHelper.getMeasureIndexOfRole(grouped, "Size");
            expect(result).toBe(-1);

            result = DataRoleHelper.getMeasureIndexOfRole(grouped, "X");
            expect(result).toBe(-1);

            result = DataRoleHelper.getMeasureIndexOfRole(grouped, "Y");
            expect(result).toBe(-1);
        });

        it("getMeasureIndexOfRole without roles validation with default", () => {
            dataViewBuilder.columns = [
                { displayName: "col1" },
                { displayName: "col2", isMeasure: true },
                { displayName: "col3", isMeasure: true },
                { displayName: "col4", isMeasure: true }
            ];

            const dataView: DataView = dataViewBuilder.build();

            const grouped: DataViewValueColumnGroup[] = dataView.categorical.values.grouped();

            let result: number = DataRoleHelper.getMeasureIndexOfRole(grouped, "Size");
            expect(result).toBe(-1);
        });

        it("getMeasureIndexOfRole without roles validation with default too few measures", () => {
            dataViewBuilder.values = [[-1, 2, 3]];

            dataViewBuilder.columns = [
                { displayName: "col1" },
                { displayName: "col2", isMeasure: true }
            ];

            const dataView: DataView = dataViewBuilder.build();

            const grouped: DataViewValueColumnGroup[] = dataView.categorical.values.grouped();

            let result: number = DataRoleHelper.getMeasureIndexOfRole(grouped, "2nd measure");
            expect(result).toBe(-1);
        });

        it("getMeasureIndexOfRole without any groups", () => {
            dataViewBuilder.values = [];

            dataViewBuilder.columns = [];

            const dataView: DataView = dataViewBuilder.build();

            const grouped: DataViewValueColumnGroup[] = dataView.categorical.values.grouped();

            let result: number = DataRoleHelper.getMeasureIndexOfRole(grouped, "");
            expect(result).toBe(-1);
        });
    });

    describe("hasRoleInDataView", () => {
        it("should return true is the role is available", () => {
            const dataView: DataView = getDataView();
            expect(DataRoleHelper.hasRoleInDataView(dataView, "Series")).toBe(true);
        });

        it("should return false is the role isn't available", () => {
            const dataView: DataView = getDataView();
            expect(DataRoleHelper.hasRoleInDataView(dataView, "Category")).toBe(false);
        });

        function getDataView(): DataView {
            return {
                metadata: {
                    columns: [
                        {
                            displayName: "col1",
                            roles: { "Series": true }
                        },
                        {
                            displayName: "col2",
                            isMeasure: true,
                            roles: { "Size": true }
                        }
                    ]
                }
            };
        }
    });

    describe("getCategoryIndexOfRole", () => {
        const seriesRoleName: string = "Series",
            sizeRoleName: string = "Size";

        it("should return -1 if the categories is empty", () => {
            const expectedIndex: number = -1;

            const actualIndex: number = DataRoleHelper.getCategoryIndexOfRole([], undefined);

            expect(actualIndex).toBe(expectedIndex);
        });

        it("should return -1 if the role isn't available", () => {
            const expectedIndex: number = -1,
                categoryColumns: DataViewCategoryColumn[] = getCategoryColumns(
                    seriesRoleName,
                    sizeRoleName);

            const actualIndex: number = DataRoleHelper.getCategoryIndexOfRole(
                categoryColumns,
                "Power BI");

            expect(actualIndex).toBe(expectedIndex);
        });

        it("should return -1 if the role isn't available", () => {
            const expectedIndex: number = 1,
                categoryColumns: DataViewCategoryColumn[] = getCategoryColumns(
                    seriesRoleName,
                    sizeRoleName);

            const actualIndex: number = DataRoleHelper.getCategoryIndexOfRole(
                categoryColumns,
                sizeRoleName);

            expect(actualIndex).toBe(expectedIndex);
        });

        function getCategoryColumns(
            seriesRoleName: string,
            sizeRoleName: string): DataViewCategoryColumn[] {

            return [{
                source: {
                    displayName: "col1",
                    roles: { [seriesRoleName]: true }
                },
                values: []
            },
            {
                source: {
                    displayName: "col2",
                    isMeasure: true,
                    roles: { [sizeRoleName]: true }
                },
                values: []
            }];
        }
    });

    describe("hasRoleInValueColumn", () => {
        const roleName: string = "Series";

        it("should return false if role name is undefined", () => {
            const valueColumn: DataViewValueColumn = getValueColumn(roleName);

            const hasRole: boolean = DataRoleHelper.hasRoleInValueColumn(
                valueColumn,
                "Power BI");

            expect(hasRole).toBeFalsy();
        });

        it("should return true if role name is available", () => {
            const valueColumn: DataViewValueColumn = getValueColumn(roleName);

            const hasRole: boolean = DataRoleHelper.hasRoleInValueColumn(
                valueColumn,
                roleName);

            expect(hasRole).toBeTruthy();
        });

        function getValueColumn(roleName: string): DataViewValueColumn {
            return {
                source: {
                    displayName: "",
                    roles: {
                        [roleName]: true
                    }
                },
                values: []
            };
        }
    });
});

class DataViewBuilder {
    private _categoriesValues: any[] = [];

    public get categoriesValues(): any[] {
        return this._categoriesValues;
    }

    public set categoriesValues(value: any[]) {
        this._categoriesValues = value;
    }

    private _values: any[] = [];

    public get values(): any[] {
        return this._values;
    }

    public set values(value: any[]) {
        this._values = value;
    }

    private _dataViewMetadata;

    public get dataViewMetadata() {
        return this._dataViewMetadata;
    }

    private _columns: any[] = [];

    public get columns(): any[] {
        return this._columns;
    }

    public set columns(value: any[]) {
        this._columns = value;
        this.updateCategoricalValues();
        this.createDataViewMetadata();
    }

    private createDataViewMetadata() {
        this._dataViewMetadata = {
            columns: this.columns
        };
    }

    private categoricalValues: any[] = [];

    private updateCategoricalValues() {
        let categoricalValues: any[] = [];

        for (let i = 1; i < this.columns.length && (i - 1) < this.values.length; i++) {
            let categoricalValue = this.values[i - 1];
            categoricalValue.source = this.columns[i];

            categoricalValues.push(categoricalValue);
        }

        this.categoricalValues = categoricalValues;
    }

    public build(): DataView {
        return {
            metadata: this.dataViewMetadata,
            categorical: {
                categories: [{
                    source: this.dataViewMetadata.columns[0],
                    values: this.categoriesValues
                }],
                values: DataViewTransform.createValueColumns(this.categoricalValues)
            }
        };
    }
}
