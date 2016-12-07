# DataViewObjectsParser
> The ```DataViewObjectsParser``` provides the simplest way in order to parse properties of the formatting panel.

The ```powerbi.extensibility.utils.dataview.DataViewObjectsParser``` class provides the following methods:

* [getDefault](#getdefault)
* [parse](#parse)
* [enumerateObjectInstances](#enumerateobjectinstances)


## getDefault

This static method returns an instance of DataViewObjectsParser.

```typescript
static getDefault(): DataViewObjectsParser;
```

### Example

```typescript
import DataViewObjectsParser = powerbi.extensibility.utils.dataview.DataViewObjectsParser;

DataViewObjectsParser.getDefault();

// returns: an instance of the DataViewObjectsParser
```

You can take a look at the example code of the custom visual [here](https://github.com/Microsoft/powerbi-visuals-sankey/blob/4d544ea145b4e15006083a3610dfead3da5f61a4/src/visual.ts#L1143).

## parse

This method parses properties of the formatting panel and returns an instance of ```DataViewObjectsParser```.

```typescript
static parse<T extends DataViewObjectsParser>(dataView: DataView): T;
```

### Example

```typescript
import IVisual = powerbi.extensibility.IVisual;
import DataViewObjectsParser = powerbi.extensibility.utils.dataview.DataViewObjectsParser;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;

/**
 * This class describes properties of the formatting panel.
 * Name of the property and name of the property described in the capabilities should be the same.
 */
class DataPointProperties {
    public fillColor: string = "red"; // This value is a default value of the property.
}

class PropertiesParser extends DataViewObjectsParser {
    /**
     * This property describes a group of properties.
     */
    public dataPoint: DataPointProperties = new DataPointProperties();
}

export class YourVisual extends IVisual {
    // implementation of the IVisual.

    private propertiesParser: PropertiesParser;

    public update(options: VisualUpdateOptions): void {
        // Parses properties.
        this.propertiesParser = PropertiesParser.parse<PropertiesParser>(options.dataViews[0]);

        // You can use the properties after parsing
        console.log(this.propertiesParser.dataPoint.fillColor); // returns "red" as default value, it will be updated automatically after any change of the formatting panel.
    }
}
```

You can take a look at the example code of the custom visual [here](https://github.com/Microsoft/powerbi-visuals-sankey/blob/4d544ea145b4e15006083a3610dfead3da5f61a4/src/visual.ts#L607).

## enumerateObjectInstances

This static method enumerates properties and returns an instance of [VisualObjectInstanceEnumeration](https://github.com/Microsoft/PowerBI-visuals-tools/blob/master/templates/visuals/.api/v1.2.0/PowerBI-visuals.d.ts#L1015).
We recommend you execute this method in ```enumerateObjectInstances``` method of the visual.

```typescript
static enumerateObjectInstances(dataViewObjectParser: DataViewObjectsParser, options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration;
```

### Example

```typescript
import IVisual = powerbi.extensibility.IVisual;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstanceEnumeration = powerbi.VisualObjectInstanceEnumeration;
import DataViewObjectsParser = powerbi.extensibility.utils.dataview.DataViewObjectsParser;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;

/**
 * This class describes properties of the formatting panel.
 * Name of the property and name of the property described in the capabilities should be the same.
 */
class DataPointProperties {
    public fillColor: string = "red";
}

class PropertiesParser extends DataViewObjectsParser {
    /**
     * This property describes a group of properties.
     */
    public dataPoint: DataPointProperties = new DataPointProperties();
}

export class YourVisual extends IVisual {
    // implementation of the IVisual.

    private propertiesParser: PropertiesParser;

    public update(options: VisualUpdateOptions): void {
        // Parses properties.
        this.propertiesParser = PropertiesParser.parse<PropertiesParser>(options.dataViews[0]);
    }

    /**
     * This method will be executed if the formatting panel is open.
     */
    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
        return PropertiesParser.enumerateObjectInstances(this.propertiesParser, options);
    }
}
```

You can take a look at the example code of the custom visual [here](https://github.com/Microsoft/powerbi-visuals-sankey/blob/4d544ea145b4e15006083a3610dfead3da5f61a4/src/visual.ts#L1146).
