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
import powerbi from "powerbi-visuals-api";
import DataViewCategorical = powerbi.DataViewCategorical;
import DataViewMetadata = powerbi.DataViewMetadata;
import CustomVisualOpaqueIdentity = powerbi.visuals.CustomVisualOpaqueIdentity;
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import MiscellaneousTypeDescriptor = powerbi.MiscellaneousTypeDescriptor;
import DataView = powerbi.DataView;

// powerbi.extensibility.utils.dataview
import {converterHelper} from "../src/converterHelper";
import * as DataViewTransform  from "../src/dataViewTransform";

describe("converterHelper", () => {
    describe("categoryIsAlsoSeriesRole", () => {
        let dataViewBuilder: DataViewBuilder,
            dataView: DataViewCategorical;

        beforeEach(() => {
            dataViewBuilder = new DataViewBuilder(
                ["a", "b"],
                [100, 200]);

            dataView = dataViewBuilder.build();
        });

        it("default", () => {
            expect(converterHelper.categoryIsAlsoSeriesRole(
                dataView,
                "Series",
                "Category")).toBeFalsy();

            // Only a "Series" role prevents us from using the Default strategy
            dataViewBuilder.buildWithUpdateRoles({
                "Category": true
            });

            expect(converterHelper.categoryIsAlsoSeriesRole(
                dataView,
                "Series",
                "Category")).toBeFalsy();

            dataView = dataViewBuilder.buildWithUpdateRoles({
                "E === mc^2": true
            });

            expect(converterHelper.categoryIsAlsoSeriesRole(
                dataView,
                "Series",
                "Category")).toBeFalsy();
        });

        it("series and category", () => {
            dataView = dataViewBuilder.buildWithUpdateRoles({
                "Series": true,
                "Category": true
            });

            expect(converterHelper.categoryIsAlsoSeriesRole(
                dataView,
                "Series",
                "Category")).toBe(true);

            dataView = dataViewBuilder.buildWithUpdateRoles({
                "Series": true,
                "F === ma": true,
                "Category": true
            });

            expect(converterHelper.categoryIsAlsoSeriesRole(
                dataView,
                "Series",
                "Category")).toBe(true);
        });

        it("should return false if categories are empty", () => {
            const categorical: DataViewCategorical = {
                categories: []
            };

            const actualResult: boolean = converterHelper.categoryIsAlsoSeriesRole(
                categorical,
                undefined,
                undefined);

            expect(actualResult).toBeFalsy();
        });
    });

    describe("getSeriesName", () => {
        it("should return the groupName if it's defined", () => {
            const groupName: string = "Power BI",
                metadata: DataViewMetadataColumn = {
                    displayName: undefined,
                    groupName
                };

            const actualSeriesName: string = converterHelper
                .getSeriesName(metadata) as string;

            expect(actualSeriesName).toBe(groupName);
        });

        it("should return the queryName if it's defined", () => {
            const queryName: string = "Power BI",
                metadata: DataViewMetadataColumn = {
                    displayName: undefined,
                    queryName
                };

            const actualSeriesName: string = converterHelper
                .getSeriesName(metadata) as string;

            expect(actualSeriesName).toBe(queryName);
        });
    });

    describe("getMiscellaneousTypeDescriptor", () => {
        it("should return the misc object", () => {
            const misc: MiscellaneousTypeDescriptor = { image: true },
                metadata: DataViewMetadataColumn = {
                    displayName: undefined,
                    type: { misc }
                };

            const actualMisc: MiscellaneousTypeDescriptor = converterHelper
                .getMiscellaneousTypeDescriptor(metadata);

            expect(actualMisc).toBe(misc);
        });
    });

    describe("isImageUrlColumn", () => {
        it("should return false if the misc is undefined", () => {
            const actualImageUrl: boolean = converterHelper.isImageUrlColumn(undefined);

            expect(actualImageUrl).toBeFalsy();
        });

        it("should return true if the imageUrl is defined", () => {
            const misc: MiscellaneousTypeDescriptor = { imageUrl: true },
                metadata: DataViewMetadataColumn = {
                    displayName: undefined,
                    type: { misc }
                };

            const actualImageUrl: boolean = converterHelper.isImageUrlColumn(metadata);

            expect(actualImageUrl).toBe(misc.imageUrl);
        });
    });

    describe("isWebUrlColumn", () => {
        it("should return false if the misc is undefined", () => {
            const actualImageUrl: boolean = converterHelper.isWebUrlColumn(undefined);

            expect(actualImageUrl).toBeFalsy();
        });

        it("should return true if the webUrl  is defined", () => {
            const misc: MiscellaneousTypeDescriptor = { webUrl: true },
                metadata: DataViewMetadataColumn = {
                    displayName: undefined,
                    type: { misc }
                };

            const actualWebUrl: boolean = converterHelper.isWebUrlColumn(metadata);

            expect(actualWebUrl).toBe(misc.webUrl);
        });
    });

    describe("hasImageUrlColumn", () => {
        it("should return false if the dataView is undefined", () => {
            const hasImageUrlColumn: boolean = converterHelper.hasImageUrlColumn(undefined);

            expect(hasImageUrlColumn).toBeFalsy();
        });

        it("should return false if the dataView.metadata is undefined", () => {
            const dataView: DataView = {
                metadata: undefined
            };

            const hasImageUrlColumn: boolean = converterHelper.hasImageUrlColumn(dataView);

            expect(hasImageUrlColumn).toBeFalsy();
        });

        it("should return false if the dataView.metadata.columns is undefined", () => {
            const dataView: DataView = {
                metadata: {
                    columns: undefined
                }
            };

            const hasImageUrlColumn: boolean = converterHelper.hasImageUrlColumn(dataView);

            expect(hasImageUrlColumn).toBeFalsy();
        });

        it("should return false if the imageUrl isn't available in the dataView", () => {
            const dataView: DataView = getDataView();

            const hasImageUrlColumn: boolean = converterHelper.hasImageUrlColumn(dataView);

            expect(hasImageUrlColumn).toBeFalsy();
        });

        it("should return true if the imageUrl is available in the dataView", () => {
            const expectedResult: boolean = true,
                dataView: DataView = getDataView(expectedResult);

            const hasImageUrlColumn: boolean = converterHelper.hasImageUrlColumn(dataView);

            expect(hasImageUrlColumn).toBe(expectedResult);
        });

        function getDataView(imageUrl: boolean = false): DataView {
            return {
                metadata: {
                    columns: [{
                        displayName: "",
                    }, {
                        displayName: "",
                        type: {
                            misc: {
                                imageUrl
                            }
                        }
                    }]
                }
            };
        }
    });
});

class DataViewBuilder {
    private _roles: any;

    public get roles(): any {
        return this._roles;
    }

    public set roles(value) {
        this._roles = value;
        this.createMetadata();
    }

    private categoriesValues: any[];

    private metadata: DataViewMetadata;

    private categoryIdentities: CustomVisualOpaqueIdentity[];

    private values: any[];

    constructor(categoriesValues: any[], values: any[], roles: any = {}) {
        this.categoriesValues = categoriesValues;
        this.values = values;
        this.roles = roles;

        this.createMetadata();
    }

    private createMetadata() {
        this.metadata = {
            columns: [
                { displayName: "col1", roles: this.roles },
                { displayName: "col2", isMeasure: true, roles: { "Y": true } }
            ]
        };
    }

    public buildWithUpdateRoles(roles): DataViewCategorical {
        this.roles = roles;
        return this.build();
    }

    public build(): DataViewCategorical {
        return {
            categories: [{
                source: this.metadata.columns[0],
                values: this.categoriesValues,
                identity: this.categoryIdentities
            }],
            values: DataViewTransform.createValueColumns([
                {
                    source: this.metadata.columns[1],
                    values: this.values
                }])
        };
    }
}
