"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@sanity/ui");
const icons_1 = require("@sanity/icons");
const useUpload_1 = __importDefault(require("./useUpload"));
const UploadBox_1 = __importDefault(require("./UploadBox"));
const MediaPreview_1 = __importDefault(require("../MediaPreview"));
const Uploader = (props) => {
    const uploadProps = (0, useUpload_1.default)(props);
    const { dropzone: { inputRef }, } = uploadProps;
    const onUploadClick = react_1.default.useCallback(() => {
        if (inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) {
            inputRef.current.click();
        }
    }, [inputRef]);
    return (react_1.default.createElement(ui_1.Container, { width: 2 },
        react_1.default.createElement(ui_1.Stack, { space: 3 },
            props.chosenFile ? (react_1.default.createElement(MediaPreview_1.default, { file: props.chosenFile, context: "input" })) : (react_1.default.createElement(UploadBox_1.default, Object.assign({}, uploadProps, { vendorConfig: props.vendorConfig, onUploadClick: onUploadClick }))),
            react_1.default.createElement("div", { style: {
                    display: 'flex',
                    width: '100%',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    gap: '.5rem',
                } },
                react_1.default.createElement(ui_1.Button, { icon: icons_1.UploadIcon, fontSize: 2, padding: 3, mode: "ghost", text: "Upload", style: { flex: 1 }, onClick: onUploadClick }),
                props.openBrowser && (react_1.default.createElement(ui_1.Button, { icon: icons_1.SearchIcon, fontSize: 2, padding: 3, mode: "ghost", text: "Select", style: { flex: 1 }, onClick: props.openBrowser })),
                props.removeFile && props.chosenFile && (react_1.default.createElement(ui_1.Button, { icon: icons_1.TrashIcon, fontSize: 2, padding: 3, mode: "ghost", tone: "critical", text: "Remove", style: { flex: 1 }, onClick: props.removeFile }))))));
};
exports.default = Uploader;
