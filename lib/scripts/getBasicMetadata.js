"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getFileRef_1 = __importDefault(require("./getFileRef"));
const parseAccept_1 = require("./parseAccept");
function getBasicFileMetadata(props) {
    return {
        fileSize: props.file.size,
        contentType: (0, parseAccept_1.parseExtension)(props.file.type),
        fileName: (0, getFileRef_1.default)(props),
    };
}
exports.default = getBasicFileMetadata;
