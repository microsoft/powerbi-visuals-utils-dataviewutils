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
        it("valid URLs supported protocols and extensions", () => {
            expect(validationHelper.isImageUrlAllowed("https://someHost/someTestImage.PnG")).toBe(true);
            expect(validationHelper.isImageUrlAllowed("https://someHost/someTestImage.jPG")).toBe(true);
            expect(validationHelper.isImageUrlAllowed("https://someHost/someTestImage.GIf")).toBe(true);
            expect(validationHelper.isImageUrlAllowed("https://someHost/someTestImage.SVG")).toBe(true);
        });

        it("valid URLs ports are supported", () => {
            expect(validationHelper.isImageUrlAllowed("https://someHost:7777/someTestImage.SVG")).toBe(true);
        });

        it("valid URLs supported base64 encoded images", () => {
            expect(validationHelper.isImageUrlAllowed("data:image/gif;base64,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")).toBe(true);
            expect(validationHelper.isImageUrlAllowed("data:image/jpeg;base64,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")).toBe(true);
            expect(validationHelper.isImageUrlAllowed("data:image/png;base64,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")).toBe(true);
            expect(validationHelper.isImageUrlAllowed("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTYyMHB4IiBoZWlnaHQ9Ijg0MHB4IiB2aWV3Qm94PSIwIDAgIDE2MjAgODQwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiA+PHJlY3QgaWQ9InN2Z0VkaXRvckJhY2tncm91bmQiIHg9IjAiIHk9IjAiIHdpZHRoPSIxNjIwIiBoZWlnaHQ9Ijg0MCIgc3R5bGU9ImZpbGw6IG5vbmU7IHN0cm9rZTogbm9uZTsiLz48bGluZSBpZD0iZTFfbGluZSIgeDE9IjM2NSIgeTE9IjI5NyIgeDI9IjU1MCIgeTI9IjYyOCIgc3R5bGU9InN0cm9rZTpibGFjaztmaWxsOm5vbmU7c3Ryb2tlLXdpZHRoOjFweDsiLz48bGluZSBpZD0iZTJfbGluZSIgeDE9IjU1MCIgeTE9IjYyNyIgeDI9Ijg2OSIgeTI9IjEwNCIgc3R5bGU9InN0cm9rZTpibGFjaztmaWxsOm5vbmU7c3Ryb2tlLXdpZHRoOjFweDsiLz48L3N2Zz4=")).toBe(true);
        });

        it("invalid URLs unsupported base64 encoded images", () => {
            expect(validationHelper.isImageUrlAllowed("data:image/bmp;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTYyMHB4IiBoZWlnaHQ9Ijg0MHB4IiB2aWV3Qm94PSIwIDAgIDE2MjAgODQwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0IiA+PHJlY3QgaWQ9InN2Z0VkaXRvckJhY2tncm91bmQiIHg9IjAiIHk9IjAiIHdpZHRoPSIxNjIwIiBoZWlnaHQ9Ijg0MCIgc3R5bGU9ImZpbGw6IG5vbmU7IHN0cm9rZTogbm9uZTsiLz48bGluZSBpZD0iZTFfbGluZSIgeDE9IjM2NSIgeTE9IjI5NyIgeDI9IjU1MCIgeTI9IjYyOCIgc3R5bGU9InN0cm9rZTpibGFjaztmaWxsOm5vbmU7c3Ryb2tlLXdpZHRoOjFweDsiLz48bGluZSBpZD0iZTJfbGluZSIgeDE9IjU1MCIgeTE9IjYyNyIgeDI9Ijg2OSIgeTI9IjEwNCIgc3R5bGU9InN0cm9rZTpibGFjaztmaWxsOm5vbmU7c3Ryb2tlLXdpZHRoOjFweDsiLz48L3N2Zz4=")).toBe(false);
        });

        it("invalid URL wrong extension", () => {
            expect(validationHelper.isImageUrlAllowed("https://someHostsomeTestImage.exe")).toBe(false);
        });

        it("invalid URL no extension", () => {
            expect(validationHelper.isImageUrlAllowed("https://someHostsomeGeneratedImage")).toBe(false);
        });

        it("invalid URL unsupported protocols", () => {
            expect(validationHelper.isImageUrlAllowed("ftp://someHostsomeGeneratedImage.jpg")).toBe(false);
            expect(validationHelper.isImageUrlAllowed("jAvAscrIpt:alert('XSS');")).toBe(false);
            expect(validationHelper.isImageUrlAllowed("jAvAscrIpt:alert('XSS');.png")).toBe(false);
            expect(validationHelper.isImageUrlAllowed("jaascript:alert('XSS');.png")).toBe(false);
            expect(validationHelper.isImageUrlAllowed("blob:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD.png")).toBe(false);
        });

        it("invalid URL no protocol", () => {
            expect(validationHelper.isImageUrlAllowed("someHostsomeGeneratedImage.jpg")).toBe(false);
        });

        it("invalid URL using of parameters", () => {
            expect(validationHelper.isImageUrlAllowed("https://someHostsomeGeneratedImage.jpg?param1=val1&param2=val2")).toBe(false);
        });

        it("check file is PNG image", (done) => {
            validationHelper.isFileImage("/base/test/images/access.png", (isImage, contentType) => {
                expect(isImage).toBe(true);
                expect(contentType).toBe("image/png");
                done();
            });
        });

        it("check file is JPG image", (done) => {
            validationHelper.isFileImage("/base/test/images/access.jpg", (isImage, contentType) => {
                expect(isImage).toBe(true);
                expect(contentType).toBe("image/jpeg");
                done();
            });
        });

        it("check file is GIF image", (done) => {
            validationHelper.isFileImage("/base/test/images/access.gif", (isImage, contentType) => {
                expect(isImage).toBe(true);
                expect(contentType).toBe("image/gif");
                done();
            });
        });

        it("check file is SVG image", (done) => {
            validationHelper.isFileImage("/base/test/images/justok.svg", (isImage, contentType) => {
                expect(isImage).toBe(true);
                expect(contentType).toBe("image/svg+xml");
                done();
            });
        });

        it("check file is unsupported BMP image", (done) => {
            validationHelper.isFileImage("/base/test/images/access.bmp", (isImage, contentType) => {
                expect(isImage).toBe(false);
                expect(contentType).toMatch(/^image\/(x-ms-)?bmp$/i);
                done();
            });
        });

        it("check file is not image", (done) => {
            validationHelper.isFileImage("/base/test/data/someplaintext.txt", (isImage, contentType) => {
                expect(isImage).toBe(false);
                expect(contentType).toBe("text/plain");
                done();
            });
        });

        it("file doesn't exist", (done) => {
            validationHelper.isFileImage("/base/test/images/notexisitingimage.png", (isImage, contentType) => {
                expect(isImage).toBe(false);
                expect(contentType).toBeNull();
                done();
            });
        });
    });
}
