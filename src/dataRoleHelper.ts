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

module powerbi.extensibility.utils.dataview {
    // powerbi
    import DataViewValueColumnGroup = powerbi.DataViewValueColumnGroup;
    import DataViewCategoryColumn = powerbi.DataViewCategoryColumn;
    import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
    import DataView = powerbi.DataView;
    import DataViewValueColumn = powerbi.DataViewValueColumn;

    export module DataRoleHelper {
        export function getMeasureIndexOfRole(grouped: DataViewValueColumnGroup[], roleName: string): number {
            if (!_.isEmpty(grouped)) {
                let firstGroup = grouped[0];

                if (firstGroup.values && firstGroup.values.length > 0) {
                    for (let i = 0, len = firstGroup.values.length; i < len; ++i) {
                        let value = firstGroup.values[i];

                        if (value && value.source) {
                            if (hasRole(value.source, roleName)) {
                                return i;
                            }
                        }
                    }
                }
            }

            return -1;
        }

        export function getCategoryIndexOfRole(categories: DataViewCategoryColumn[], roleName: string): number {
            if (!_.isEmpty(categories)) {
                for (let i = 0, ilen = categories.length; i < ilen; i++) {
                    if (hasRole(categories[i].source, roleName)) {
                        return i;
                    }
                }
            }

            return -1;
        }

        export function hasRole(column: DataViewMetadataColumn, name: string): boolean {
            let roles = column.roles;
            return roles && roles[name];
        }

        export function hasRoleInDataView(dataView: DataView, name: string): boolean {
            return dataView != null
                && dataView.metadata != null
                && dataView.metadata.columns
                && _.some(dataView.metadata.columns, c => c.roles && c.roles[name] !== undefined); // any is an alias of some
        }

        export function hasRoleInValueColumn(valueColumn: DataViewValueColumn, name: string): boolean {
            return valueColumn && valueColumn.source && valueColumn.source.roles && (valueColumn.source.roles[name] === true);
        }
    }
}