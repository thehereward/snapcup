export default class FileUploadError extends Error {
    constructor(m: string) {
        super(m);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, FileUploadError.prototype);
    }
}
