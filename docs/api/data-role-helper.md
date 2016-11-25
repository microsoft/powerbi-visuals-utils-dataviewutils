# DataRoleHelper
> The ```DataRoleHelper``` provides functions in order to check roles of the dataView object.

The ```powerbi.extensibility.utils.dataview.DataRoleHelper``` module provides the following functions:

* [getMeasureIndexOfRole](#getmeasureindexofrole)
* [getCategoryIndexOfRole](#getcategoryindexofrole)
* [hasRole](#hasrole)
* [hasRoleInDataView](#hasroleindataview)
* [hasRoleInValueColumn](#hasroleinvaluecolumn)

## getMeasureIndexOfRole

This function finds the measure by role name and returns an index of it.

```typescript
function getMeasureIndexOfRole(grouped: DataViewValueColumnGroup[], roleName: string): number;
```

### Example

```typescript
import DataViewValueColumnGroup = powerbi.DataViewValueColumnGroup;
import DataRoleHelper = powerbi.extensibility.utils.dataview.DataRoleHelper;

// This object is actually part of the dataView object.
let columnGroup: DataViewValueColumnGroup[] = [{
    values: [
        {
            source: {
                displayName: "Microsoft",
                roles: {
                    "company": true
                }
            },
            values: []
        },
        {
            source: {
                displayName: "Power BI",
                roles: {
                    "product": true
                }
            },
            values: []
        }
    ]
}];

DataRoleHelper.getMeasureIndexOfRole(columnGroup, "product");

// returns: 1
```

## getCategoryIndexOfRole

This function finds the category by role name and returns an index of it.

```typescript
function getCategoryIndexOfRole(categories: DataViewCategoryColumn[], roleName: string): number;
```

### Example

```typescript
import DataViewCategoryColumn = powerbi.DataViewCategoryColumn;
import DataRoleHelper = powerbi.extensibility.utils.dataview.DataRoleHelper;

// This object is actually part of the dataView object.
let categoryGroup: DataViewCategoryColumn[] = [
    {
        source: {
            displayName: "Microsoft",
            roles: {
                "company": true
            }
        },
        values: []
    },
    {
        source: {
            displayName: "Power BI",
            roles: {
                "product": true
            }
        },
        values: []
    }
];

DataRoleHelper.getCategoryIndexOfRole(categoryGroup, "product");

// returns: 1
```

## hasRole

This function checks if the provided role is defined in the metadata.

```typescript
function hasRole(column: DataViewMetadataColumn, name: string): boolean;
```

### Example

```typescript
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import DataRoleHelper = powerbi.extensibility.utils.dataview.DataRoleHelper;

// This object is actually part of the dataView object.
let metadata: DataViewMetadataColumn = {
    displayName: "Microsoft",
    roles: {
        "company": true
    }
};

DataRoleHelper.hasRole(metadata, "company");

// returns: true
```

## hasRoleInDataView

This function checks if the provided role is defined in the dataView.

```typescript
function hasRoleInDataView(dataView: DataView, name: string): boolean;
```

### Example

```typescript
import DataView = powerbi.DataView;
import DataRoleHelper = powerbi.extensibility.utils.dataview.DataRoleHelper;

// This object is actually part of the dataView object.
let dataView: DataView = {
    metadata: {
        columns: [
            {
                displayName: "Microsoft",
                roles: {
                    "company": true
                }
            },
            {
                displayName: "Power BI",
                roles: {
                    "product": true
                }
            }
        ]
    }
};

DataRoleHelper.hasRoleInDataView(dataView, "product");

// returns: true
```

## hasRoleInValueColumn

This function checks if the provided role is defined in the value column.

```typescript
function hasRoleInValueColumn(valueColumn: DataViewValueColumn, name: string): boolean;
```

### Example

```typescript
import DataViewValueColumn = powerbi.DataViewValueColumn;
import DataRoleHelper = powerbi.extensibility.utils.dataview.DataRoleHelper;

// This object is actually part of the dataView object.
let valueColumn: DataViewValueColumn = {
    source: {
        displayName: "Microsoft",
        roles: {
            "company": true
        }
    },
    values: []
};

DataRoleHelper.hasRoleInValueColumn(valueColumn, "company");

// returns: true
```
