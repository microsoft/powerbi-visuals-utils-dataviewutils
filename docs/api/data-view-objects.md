# DataViewObjects
> The ```DataViewObjects``` provides functions in order to extract values of the objects.

The ```powerbi.extensibility.utils.dataview.DataViewObjects``` module provides the following functions:

* [getValue](#getvalue)
* [getObject](#getobject)
* [getFillColor](#getfillcolor)

## getValue

This function returns the value of the given object.

```typescript
function getValue<T>(objects: DataViewObjects, propertyId: DataViewObjectPropertyIdentifier, defaultValue?: T): T;
```

### Example

```typescript
import DataViewObjectPropertyIdentifier = powerbi.DataViewObjectPropertyIdentifier;
import DataViewObjects = powerbi.extensibility.utils.dataview.DataViewObjects;

let property: DataViewObjectPropertyIdentifier = {
    objectName: "microsoft",
    propertyName: "bi"
};

// This object is actually a part of the dataView object.
let objects: powerbi.DataViewObjects = {
    "microsoft": {
        "windows": 5,
        "bi": "Power"
    }
};

DataViewObjects.getValue(objects, property);

// returns: Power
```

## getObject

This function returns an object of the given object.

```typescript
function getObject(objects: DataViewObjects, objectName: string, defaultValue?: IDataViewObject): IDataViewObject;
```

### Example

```typescript
import DataViewObjects = powerbi.extensibility.utils.dataview.DataViewObjects;

// This object is actually a part of the dataView object.
let objects: powerbi.DataViewObjects = {
    "microsoft": {
        "windows": 5,
        "bi": "Power"
    }
};

DataViewObjects.getObject(objects, "microsoft");

/* returns: {
    "bi": "Power",
    "windows": 5

}*/
```

## getFillColor

This function returns a solid color of the objects.

```typescript
function getFillColor(objects: DataViewObjects, propertyId: DataViewObjectPropertyIdentifier, defaultColor?: string): string;
```

### Example

```typescript
import DataViewObjectPropertyIdentifier = powerbi.DataViewObjectPropertyIdentifier;
import DataViewObjects = powerbi.extensibility.utils.dataview.DataViewObjects;

let property: DataViewObjectPropertyIdentifier = {
    objectName: "power",
    propertyName: "fillColor"
};

// This object is actually part of the dataView object.
let objects: powerbi.DataViewObjects = {
    "power": {
        "fillColor": {
            "solid": {
                "color": "yellow"
            }
        },
        "bi": "Power"
    }
};

DataViewObjects.getFillColor(objects, property);

// returns: yellow
```