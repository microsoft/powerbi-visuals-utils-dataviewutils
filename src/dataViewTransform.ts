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
import powerbi from "powerbi-visuals-tools";
import DataViewValueColumn = powerbi.DataViewValueColumn;
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import DataViewValueColumns = powerbi.DataViewValueColumns;
import DataViewValueColumnGroup = powerbi.DataViewValueColumnGroup;

// powerbi.data
import ISQExpr = powerbi.data.ISQExpr;

// TODO: refactor & focus DataViewTransform into a service with well-defined dependencies.
export module DataViewTransform {
    // TODO: refactor this, setGrouped, and groupValues to a test helper to stop using it in the product
    export function createValueColumns(
        values: DataViewValueColumn[] = [],
        valueIdentityFields?: ISQExpr[],
        source?: DataViewMetadataColumn): DataViewValueColumns {
        let result = <DataViewValueColumns>values;
        setGrouped(result);

        if (valueIdentityFields) {
            result.identityFields = valueIdentityFields;
        }

        if (source) {
            result.source = source;
        }

        return result;
    }

    export function setGrouped(values: DataViewValueColumns, groupedResult?: DataViewValueColumnGroup[]): void {
        values.grouped = groupedResult
            ? () => groupedResult
            : () => groupValues(values);
    }

    /** Group together the values with a common identity. */
    export function groupValues(values: DataViewValueColumn[]): DataViewValueColumnGroup[] {
        let groups: DataViewValueColumnGroup[] = [],
            currentGroup: DataViewValueColumnGroup;

        for (let i = 0, len = values.length; i < len; i++) {
            let value: DataViewValueColumn = values[i];

            if (!currentGroup || currentGroup.identity !== value.identity) {
                currentGroup = {
                    values: []
                };

                if (value.identity) {
                    currentGroup.identity = value.identity;

                    let source: DataViewMetadataColumn = value.source;

                    // allow null, which will be formatted as (Blank).
                    if (source.groupName !== undefined) {
                        currentGroup.name = source.groupName;
                    } else if (source.displayName) {
                        currentGroup.name = source.displayName;
                    }
                }

                groups.push(currentGroup);
            }

            currentGroup.values.push(value);
        }

        return groups;
    }
}
