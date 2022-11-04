"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const ui_1 = require("@sanity/ui");
const default_1 = __importDefault(require("part:@sanity/components/formfields/default"));
const ChangeIndicator_1 = require("@sanity/base/lib/change-indicators/ChangeIndicator");
const form_builder_1 = require("part:@sanity/form-builder");
const patch_event_1 = __importStar(require("part:@sanity/form-builder/patch-event"));
const UploaderWithConfig_1 = __importDefault(require("./Uploader/UploaderWithConfig"));
const Browser_1 = __importDefault(require("./Browser/Browser"));
const CredentialsProvider_1 = __importDefault(require("./Credentials/CredentialsProvider"));
const createPatchFrom = (value) => patch_event_1.default.from(value ? (0, patch_event_1.set)(value) : (0, patch_event_1.unset)());
/**
 * Lets editors choose assets from external DAM inside the document editor.
 */
class ExternalDamInput extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.focus = () => {
            if (this.inputRef && this.inputRef.current) {
                this.inputRef.current.focus();
            }
        };
        this.updateValue = (document) => {
            var _a;
            const patchValue = {
                _type: (_a = this.props.type) === null || _a === void 0 ? void 0 : _a.name,
                asset: {
                    _type: 'reference',
                    _ref: document._id,
                },
            };
            this.props.onChange(createPatchFrom(patchValue));
            this.setState({
                uploadedFile: document,
                browserOpen: false,
            });
        };
        this.removeFile = () => {
            this.props.onChange(createPatchFrom());
            this.setState({
                uploadedFile: undefined,
            });
        };
        this.toggleBrowser = () => {
            this.setState({
                browserOpen: !this.state.browserOpen,
            });
        };
        this.inputRef = react_1.default.createRef();
        this.state = {
            browserOpen: false,
        };
    }
    render() {
        var _a, _b, _c;
        const { value, type, vendorConfig } = this.props;
        const { accept = vendorConfig === null || vendorConfig === void 0 ? void 0 : vendorConfig.defaultAccept, storeOriginalFilename = true, documentType = vendorConfig === null || vendorConfig === void 0 ? void 0 : vendorConfig.documentType, } = (type === null || type === void 0 ? void 0 : type.options) || {};
        return (react_1.default.createElement(CredentialsProvider_1.default, { vendorConfig: vendorConfig },
            react_1.default.createElement(ui_1.ThemeProvider, { theme: ui_1.studioTheme },
                react_1.default.createElement(ChangeIndicator_1.ChangeIndicatorCompareValueProvider, { value: (_a = value === null || value === void 0 ? void 0 : value.asset) === null || _a === void 0 ? void 0 : _a._ref, compareValue: (_c = (_b = this.props.compareValue) === null || _b === void 0 ? void 0 : _b.asset) === null || _c === void 0 ? void 0 : _c._ref },
                    react_1.default.createElement(default_1.default, { label: type.title || type.name, description: type.description, level: this.props.level, 
                        // Necessary for validation warnings to show up contextually
                        markers: this.props.markers, 
                        // Necessary for presence indication
                        presence: this.props.presence },
                        react_1.default.createElement(UploaderWithConfig_1.default, { accept: accept, storeOriginalFilename: storeOriginalFilename, onSuccess: this.updateValue, chosenFile: this.state.uploadedFile || value, removeFile: this.removeFile, openBrowser: this.toggleBrowser, vendorConfig: vendorConfig, documentType: documentType }))),
                this.state.browserOpen &&
                    react_dom_1.default.createPortal(react_1.default.createElement(ui_1.Dialog, { header: "Select File", zOffset: 600000, id: "file-browser", onClose: this.toggleBrowser, onClickOutside: this.toggleBrowser, width: 5, position: "fixed", style: {
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                            padding: '0 1rem',
                            boxSizing: 'border-box',
                        } },
                        react_1.default.createElement(Browser_1.default, { vendorConfig: vendorConfig, onSelect: this.updateValue, accept: accept })), document.getElementsByTagName('body')[0]))));
    }
}
// Adapted from Sanity's official withDocument implementation
const withVendorConfig = (ComposedComponent, vendorConfig) => {
    return class WithDocument extends react_1.default.PureComponent {
        constructor(props) {
            super(props);
            this.setInput = (input) => {
                this._input = input;
            };
            this.focus = () => {
                // @TODO: handle input focus
            };
        }
        render() {
            return (react_1.default.createElement(ComposedComponent, Object.assign({ ref: this.setInput }, this.props, { vendorConfig: vendorConfig })));
        }
    };
};
const CreateInput = (vendorConfig) => withVendorConfig((0, form_builder_1.withValuePath)((0, form_builder_1.withDocument)(ExternalDamInput)), vendorConfig);
exports.default = CreateInput;
