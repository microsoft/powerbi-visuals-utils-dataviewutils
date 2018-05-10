/// <reference types="powerbi-visuals-tools" />
import DataViewValueColumnGroup = powerbi.DataViewValueColumnGroup;
import DataViewCategoryColumn = powerbi.DataViewCategoryColumn;
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import DataView = powerbi.DataView;
import DataViewValueColumn = powerbi.DataViewValueColumn;
export declare module DataRoleHelper {
    function getMeasureIndexOfRole(grouped: DataViewValueColumnGroup[], roleName: string): number;
    function getCategoryIndexOfRole(categories: DataViewCategoryColumn[], roleName: string): number;
    function hasRole(column: DataViewMetadataColumn, name: string): boolean;
    function hasRoleInDataView(dataView: DataView, name: string): boolean;
    function hasRoleInValueColumn(valueColumn: DataViewValueColumn, name: string): boolean;
}
