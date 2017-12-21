export declare module validationHelper {
    function isImageUrlAllowed(url: string): boolean;
    function isFileImage(url: string, imageCheckResultCallBack: (isImage: boolean, contentType: string) => void): void;
}
