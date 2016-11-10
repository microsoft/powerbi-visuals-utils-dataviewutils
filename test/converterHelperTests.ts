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

module powerbi.extensibility.utils.dataview.test {
    // powerbi
    import DataViewCategorical = powerbi.DataViewCategorical;
    import DataViewMetadata = powerbi.DataViewMetadata;
    import DataViewScopeIdentity = powerbi.DataViewScopeIdentity;

    // powerbi.extensibility.utils.dataview
    import converterHelper = powerbi.extensibility.utils.dataview.converterHelper;
    import DataViewTransform = powerbi.extensibility.utils.dataview.DataViewTransform;

    describe("converterHelper tests", () => {
        let dataViewBuilder: DataViewBuilder;
        let dataView: DataViewCategorical;

        beforeEach(() => {
            dataViewBuilder = new DataViewBuilder(["a", "b"], [100, 200]);
            dataView = dataViewBuilder.build();
        });

        it("categoryIsAlsoSeriesRole default", () => {
            expect(converterHelper.categoryIsAlsoSeriesRole(dataView, "Series", "Category")).toBeFalsy();

            // Only a "Series" role prevents us from using the Default strategy
            dataViewBuilder.buildWithUpdateRoles({ "Category": true });
            expect(converterHelper.categoryIsAlsoSeriesRole(dataView, "Series", "Category")).toBeFalsy();

            dataView = dataViewBuilder.buildWithUpdateRoles({ "E === mc^2": true });
            expect(converterHelper.categoryIsAlsoSeriesRole(dataView, "Series", "Category")).toBeFalsy();
        });

        it("categoryIsAlsoSeriesRole series and category", () => {
            dataView = dataViewBuilder.buildWithUpdateRoles({ "Series": true, "Category": true });
            expect(converterHelper.categoryIsAlsoSeriesRole(dataView, "Series", "Category")).toBe(true);

            dataView = dataViewBuilder.buildWithUpdateRoles({ "Series": true, "F === ma": true, "Category": true });
            expect(converterHelper.categoryIsAlsoSeriesRole(dataView, "Series", "Category")).toBe(true);
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

        private categoryIdentities: DataViewScopeIdentity[];

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
}
