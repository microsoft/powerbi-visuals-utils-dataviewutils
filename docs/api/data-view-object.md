# DataViewObject
> The ```DataViewObject``` provides functions in order to extract value of the object.

The ```powerbi.extensibility.utils.dataview.DataViewObject``` module provides the following functions:

* [getValue](#getvalue)
* [getFillColorByPropertyName](#getfillcolorbypropertyname)

## getValue

This function returns a value of the object by property name.

```typescript
function getValue<T>(object: IDataViewObject, propertyName: string, defaultValue?: T): T;
```

### Example

```typescript
import DataViewObject = powerbi.extensibility.utils.dataview.DataViewObject;

// This object is actually a part of the dataView object.
let object: powerbi.DataViewObject = {
    "windows": 5,
    "microsoft": "Power BI"
};

DataViewObject.getValue(object, "microsoft");

// returns: Power BI
```

## getFillColorByPropertyName

This function returns a solid color of the object by property name.

```typescript
function getFillColorByPropertyName(object: IDataViewObject, propertyName: string, defaultColor?: string): string;
```

### Example

```typescript
import DataViewObject = powerbi.extensibility.utils.dataview.DataViewObject;

// This object is actually a part of the dataView object.
let object: powerbi.DataViewObject = {
    "windows": 5,
    "fillColor": {
        "solid": {
            "color": "green"
        }
    }
};

DataViewObject.getFillColorByPropertyName(object, "fillColor");

// returns: green
```
