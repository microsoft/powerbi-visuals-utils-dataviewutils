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
            expect(validationHelper.isImageUrlAllowed("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD")).toBe(false);
            expect(validationHelper.isImageUrlAllowed("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD.png")).toBe(false);
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
            validationHelper.isFileImage("/base/test/images/sun.svg", (isImage, contentType) => {
                expect(isImage).toBe(true);
                expect(contentType).toBe("image/svg+xml");
                done();
            });
        });

        it("check file is unsupported BMP image", (done) => {
            validationHelper.isFileImage("/base/test/images/access.bmp", (isImage, contentType) => {
                expect(isImage).toBe(false);
                expect(contentType).toBe("image/x-ms-bmp");
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
