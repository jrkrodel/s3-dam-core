"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ui_1 = require("@sanity/ui");
const react_1 = __importDefault(require("react"));
const sanityClient_1 = __importDefault(require("../../scripts/sanityClient"));
const ConfigureCredentials_1 = __importDefault(require("../Credentials/ConfigureCredentials"));
const CredentialsProvider_1 = require("../Credentials/CredentialsProvider");
const Uploader_1 = __importDefault(require("./Uploader"));
const UploaderWithConfig = (props) => {
    const { status } = react_1.default.useContext(CredentialsProvider_1.CredentialsContext);
    if (status === 'missingCredentials') {
        return react_1.default.createElement(ConfigureCredentials_1.default, { vendorConfig: props.vendorConfig });
    }
    if (status === 'loading') {
        return (react_1.default.createElement(ui_1.Card, { border: true, style: {
                paddingBottom: '56.25%',
                position: 'relative',
            } },
            react_1.default.createElement(ui_1.Box, { style: {
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%,-50%)',
                } },
                react_1.default.createElement(ui_1.Spinner, null))));
    }
    return react_1.default.createElement(Uploader_1.default, Object.assign({ sanityClient: sanityClient_1.default }, props));
};
exports.default = UploaderWithConfig;
