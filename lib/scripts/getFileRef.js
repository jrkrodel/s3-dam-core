"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
/**
 * Creates unique file names for uploads if storeOriginalFilename is set to false
 */
function getFileRef({ storeOriginalFilename, file, }) {
    if (storeOriginalFilename) {
        // Even when using the original file name, we need to provide a unique identifier for it.
        // Else most vendors' storage offering will re-utilize the same file for 2 different uploads with the same file name, replacing the previous upload.
        return `${new Date().toISOString().replace(/\:/g, '-')}-${file.name}`;
    }
    return `${new Date().toISOString().replace(/\:/g, '-')}-${(0, nanoid_1.nanoid)(6)}.${file.name.split('.').slice(-1)[0]}`;
}
exports.default = getFileRef;
