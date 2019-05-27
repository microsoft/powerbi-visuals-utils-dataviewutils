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
// data
import powerbi from "powerbi-visuals-api";
import ISQExpr = powerbi.data.ISQExpr;
import DataViewValueColumn = powerbi.DataViewValueColumn;
import DataViewValueColumns = powerbi.DataViewValueColumns;
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import DataViewValueColumnGroup = powerbi.DataViewValueColumnGroup;
import CustomVisualOpaqueIdentity = powerbi.visuals.CustomVisualOpaqueIdentity;

// powerbi.extensibility.utils.dataview
import * as DataViewTransform  from "../src/dataViewTransform";

describe("DataViewTransform", () => {
    describe("createValueColumns", () => {
        it("the grouped function should be defined", () => {
            const valueColumn: DataViewValueColumn = getDataViewValueColumn();

            const valueColumns: DataViewValueColumns = DataViewTransform.createValueColumns([valueColumn]);

            expect(valueColumns.grouped).toBeDefined();
        });

        it("the identityFields should be set correctly", () => {
            const valueColumn: DataViewValueColumn = getDataViewValueColumn(),
                valueIdentityFields: ISQExpr[] = [{}, {}];

            const valueColumns: DataViewValueColumns = DataViewTransform.createValueColumns(
                [valueColumn],
                valueIdentityFields);

            expect(valueColumns.identityFields).toBe(valueIdentityFields);
        });

        it("the source should be set correctly", () => {
            const valueColumn: DataViewValueColumn = getDataViewValueColumn(),
                source: DataViewMetadataColumn = {
                    displayName: "Test DataView Column"
                };

            const valueColumns: DataViewValueColumns = DataViewTransform.createValueColumns(
                [valueColumn],
                undefined,
                source);

            expect(valueColumns.source).toBe(source);
        });
    });

    describe("setGrouped", () => {
        it("the grouped should be set correctly", () => {
            const valueColumn: DataViewValueColumn[] = [getDataViewValueColumn()],
                groupedResult: DataViewValueColumnGroup[] = [];

            DataViewTransform.setGrouped(
                valueColumn as DataViewValueColumns,
                groupedResult);

            expect((valueColumn as DataViewValueColumns).grouped()).toBe(groupedResult);
        });
    });

    describe("groupValues", () => {
        it("the identity should be set correctly", () => {
            const identity: CustomVisualOpaqueIdentity = getIdentity(),
                valueColumn: DataViewValueColumn[] = [getDataViewValueColumn(identity)];

            const columnGroups: DataViewValueColumnGroup[] = DataViewTransform.groupValues(valueColumn);

            expect(columnGroups[0].identity).toBe(identity);
        });

        it("group name and the groupName of source should be the same", () => {
            const identity: CustomVisualOpaqueIdentity = getIdentity(),
                groupName: string = "TestGroupName",
                valueColumn: DataViewValueColumn[] = [getDataViewValueColumn(identity, groupName)];

            const columnGroups: DataViewValueColumnGroup[] = DataViewTransform.groupValues(valueColumn);

            expect(columnGroups[0].name).toBe(groupName);
        });

        it("group name and the displayName of source should be the same", () => {
            const identity: CustomVisualOpaqueIdentity = getIdentity(),
                valueColumn: DataViewValueColumn[] = [getDataViewValueColumn(identity)],
                displayName: string = valueColumn[0].source.displayName as string;

            const columnGroups: DataViewValueColumnGroup[] = DataViewTransform.groupValues(valueColumn);

            expect(columnGroups[0].name).toBe(displayName);
        });
    });
});

function getDataViewValueColumn(identity?: CustomVisualOpaqueIdentity, groupName?: string): DataViewValueColumn {
    return {
        identity,
        source: {
            groupName,
            displayName: "TestColumn"
        },
        values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
}

function getIdentity(): CustomVisualOpaqueIdentity {
    return {
        expr: {},
        key: "TestKey",
        kind: null
    };
}