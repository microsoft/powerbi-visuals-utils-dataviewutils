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
    import validationHelper = powerbi.extensibility.utils.dataview.validationHelper;

    describe("validationHelper", () => {
        it("valid URLs supported extensions", () => {
            expect(validationHelper.checkIsImageUrlAllowable("https://someHost/someTestImage.PnG")).toBe(true);
            expect(validationHelper.checkIsImageUrlAllowable("https://someHost/someTestImage.jPG")).toBe(true);
            expect(validationHelper.checkIsImageUrlAllowable("https://someHost/someTestImage.GIf")).toBe(true);
            expect(validationHelper.checkIsImageUrlAllowable("https://someHost/someTestImage.SVG")).toBe(true);
        });

        it("invalid URL wrong extension", () => {
            expect(validationHelper.checkIsImageUrlAllowable("https://someHostsomeTestImage.exe")).toBe(false);
        });

        it("invalid URL no extension", () => {
            expect(validationHelper.checkIsImageUrlAllowable("https://someHostsomeGeneratedImage")).toBe(false);
        });

        it("URL javascript: directive checking", () => {
            expect(validationHelper.checkIsImageUrlAllowable("jAvAscrIpt:alert('XSS');")).toBe(false);
            expect(validationHelper.checkIsImageUrlAllowable("jAvAscrIpt:alert('XSS');.png")).toBe(false);
            expect(validationHelper.checkIsImageUrlAllowable("jaascript:alert('XSS');.png")).toBe(true);
        });

        it("URL data: directive checking", () => {
            expect(validationHelper.checkIsImageUrlAllowable("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD")).toBe(false);
            expect(validationHelper.checkIsImageUrlAllowable("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD.png")).toBe(false);
            expect(validationHelper.checkIsImageUrlAllowable("dat:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD.png")).toBe(true);
        });
    });
}
