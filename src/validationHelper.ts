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
export function isImageUrlAllowed(url: string): boolean {
    // Excludes all URLs that don't contain .gif .jpg .png or .svg extensions and don't start from "http(s)://".
    // Base64 incoded images are allowable too.
    return (/^https?:\/\/.+\.(gif|jpg|png|svg)$/i).test(url) || (/^data:image\/(gif|jpeg|png|svg\+xml);base64,/i).test(url);
}

export function isFileImage(url: string, imageCheckResultCallBack: (isImage: boolean, contentType: string) => void) {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState !== this.HEADERS_RECEIVED) {
            return;
        }

        const contentType = request.getResponseHeader("Content-Type"),
            supportedTypes = ["image/png", "image/jpeg", "image/gif", "image/svg+xml"];

        if (supportedTypes.indexOf(contentType) > -1) {
            return imageCheckResultCallBack(true, contentType);
        }

        return imageCheckResultCallBack(false, contentType);
    };
    request.open("HEAD", url, true);
    request.send();
}
