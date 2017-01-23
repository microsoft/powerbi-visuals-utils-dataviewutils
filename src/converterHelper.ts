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
    import DataViewCategorical = powerbi.DataViewCategorical;
    import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
    import PrimitiveValue = powerbi.PrimitiveValue;
    import MiscellaneousTypeDescriptor = powerbi.MiscellaneousTypeDescriptor;
    import DataView = powerbi.DataView;

    // powerbi.extensibility.utils.dataview
    import DataRoleHelper = powerbi.extensibility.utils.dataview.DataRoleHelper;

    export module converterHelper {
        export function categoryIsAlsoSeriesRole(dataView: DataViewCategorical, seriesRoleName: string, categoryRoleName: string): boolean {
            if (dataView.categories && dataView.categories.length > 0) {
                // Need to pivot data if our category soure is a series role
                let category = dataView.categories[0];
                return category.source &&
                    DataRoleHelper.hasRole(category.source, seriesRoleName) &&
                    DataRoleHelper.hasRole(category.source, categoryRoleName);
            }

            return false;
        }

        export function getSeriesName(source: DataViewMetadataColumn): PrimitiveValue {
            return (source.groupName !== undefined)
                ? source.groupName
                : source.queryName;
        }

        export function isImageUrlColumn(column: DataViewMetadataColumn): boolean {
            let misc = getMiscellaneousTypeDescriptor(column);
            return misc != null && misc.imageUrl === true;
        }

        export function isWebUrlColumn(column: DataViewMetadataColumn): boolean {
            let misc = getMiscellaneousTypeDescriptor(column);
            return misc != null && misc.webUrl === true;
        }

        export function getMiscellaneousTypeDescriptor(column: DataViewMetadataColumn): MiscellaneousTypeDescriptor {
            return column
                && column.type
                && column.type.misc;
        }

        export function hasImageUrlColumn(dataView: DataView): boolean {
            if (!dataView || !dataView.metadata || _.isEmpty(dataView.metadata.columns))
                return false;

            return _.some(dataView.metadata.columns, column => isImageUrlColumn(column) === true);
        }
    }
}
