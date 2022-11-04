"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseExtension = void 0;
const mime_1 = __importDefault(require("mime"));
function parseExtension(extension) {
    return mime_1.default.getType(extension) || extension;
}
exports.parseExtension = parseExtension;
/**
 * Converts user input on `accept` (.mp4, audio/*, etc.) into MIME types we can then use in Browser & in useUpload to filter/accept only those files matching the desired extensions.
 * This is especially handy for extensions where their MIME type doesn't include their extension, such as .m4a -> audio/mp4.
 */
function parseAccept(accept) {
    if (typeof accept === 'string') {
        return parseExtension(accept) || undefined;
    }
    if (Array.isArray(accept)) {
        return accept.map(parseExtension).filter(Boolean);
    }
    return accept;
}
exports.default = parseAccept;
