/// <reference types="powerbi-visuals-tools" />
import DataViewValueColumn = powerbi.DataViewValueColumn;
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import DataViewValueColumns = powerbi.DataViewValueColumns;
import DataViewValueColumnGroup = powerbi.DataViewValueColumnGroup;
import ISQExpr = powerbi.data.ISQExpr;
export declare module DataViewTransform {
    function createValueColumns(values?: DataViewValueColumn[], valueIdentityFields?: ISQExpr[], source?: DataViewMetadataColumn): DataViewValueColumns;
    function setGrouped(values: DataViewValueColumns, groupedResult?: DataViewValueColumnGroup[]): void;
    /** Group together the values with a common identity. */
    function groupValues(values: DataViewValueColumn[]): DataViewValueColumnGroup[];
}
