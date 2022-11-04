"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Browser_1 = __importDefault(require("./Browser/Browser"));
const CredentialsProvider_1 = __importDefault(require("./Credentials/CredentialsProvider"));
const StudioTool = (props) => {
    return (react_1.default.createElement(CredentialsProvider_1.default, { vendorConfig: props },
        react_1.default.createElement(Browser_1.default, { vendorConfig: props })));
};
exports.default = StudioTool;
