# converterHelper
> The ```converterHelper``` provides functions in order to check properties of the dataView.

The ```powerbi.extensibility.utils.dataview.converterHelper``` module provides the following functions:

* [categoryIsAlsoSeriesRole](#categoryisalsoseriesrole)
* [getSeriesName](#getseriesname)
* [isImageUrlColumn](#isimageurlcolumn)
* [isWebUrlColumn](#isweburlcolumn)
* [hasImageUrlColumn](#hasimageurlcolumn)

## categoryIsAlsoSeriesRole

This function checks if the category is also series.

```typescript
function categoryIsAlsoSeriesRole(dataView: DataViewCategorical, seriesRoleName: string, categoryRoleName: string): boolean;
```

### Example

```typescript
import DataViewCategorical = powerbi.DataViewCategorical;
import converterHelper = powerbi.extensibility.utils.dataview.converterHelper;

// This object is actually part of the dataView object.
let categorical: DataViewCategorical = {
    categories: [{
        source: {
            displayName: "Microsoft",
            roles: {
                "power": true,
                "bi": true
            }
        },
        values: []
    }]
};

converterHelper.categoryIsAlsoSeriesRole(categorical, "power", "bi");

// returns: true
```

## getSeriesName

This function returns a name of the series.

```typescript
function getSeriesName(source: DataViewMetadataColumn): PrimitiveValue;
```

### Example

```typescript
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import converterHelper = powerbi.extensibility.utils.dataview.converterHelper;

// This object is actually a part of the dataView object.
let metadata: DataViewMetadataColumn = {
    displayName: "Microsoft",
    roles: {
        "power": true,
        "bi": true
    },
    groupName: "Power BI"
};

converterHelper.getSeriesName(metadata);

// returns: Power BI
```

## isImageUrlColumn

This function checks if the column contains an image url.

```typescript
function isImageUrlColumn(column: DataViewMetadataColumn): boolean;
```

### Example

```typescript
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import converterHelper = powerbi.extensibility.utils.dataview.converterHelper;

// This object is actually a part of the dataView object.
let metadata: DataViewMetadataColumn = {
    displayName: "Microsoft",
    type: {
        misc: {
            imageUrl: true
        }
    }
};

converterHelper.isImageUrlColumn(metadata);

// returns: true
```

## isWebUrlColumn

This function checks if the column contains a web url.

```typescript
function isWebUrlColumn(column: DataViewMetadataColumn): boolean;
```

### Example

```typescript
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import converterHelper = powerbi.extensibility.utils.dataview.converterHelper;

// This object is actually a part of the dataView object.
let metadata: DataViewMetadataColumn = {
    displayName: "Microsoft",
    type: {
        misc: {
            webUrl: true
        }
    }
};

converterHelper.isWebUrlColumn(metadata);

// returns: true
```

## hasImageUrlColumn

This function checks if the dataView has a column with image url.

```typescript
function hasImageUrlColumn(dataView: DataView): boolean;
```

### Example

```typescript
import DataView = powerbi.DataView;
import converterHelper = powerbi.extensibility.utils.dataview.converterHelper;

// This object is actually part of the dataView object.
let dataView: DataView = {
    metadata: {
        columns: [
            {
                displayName: "Microsoft"
            },
            {
                displayName: "Power BI",
                type: {
                    misc: {
                        imageUrl: true
                    }
                }
            }
        ]
    }
};

converterHelper.hasImageUrlColumn(dataView);

// returns: true
```
