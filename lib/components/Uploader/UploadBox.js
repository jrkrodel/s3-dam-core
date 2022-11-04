"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@sanity/ui");
const color_1 = require("@sanity/color");
const icons_1 = require("@sanity/icons");
const ui_2 = require("@sanity/ui");
const UploadBox = (props) => {
    var _a, _b;
    const { dropzone, state, cancelUpload, retry, onUploadClick, confirm } = props;
    const { inputRef, getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept, } = dropzone;
    const metadataStates = ['extractingVideoMetadata', 'extractingAudioMetadata'];
    const uploadingStates = ['uploadingToVendor', 'uploadingToSanity', "confirmFile"];
    const loadingStates = [...metadataStates, ...uploadingStates];
    return (react_1.default.createElement(ui_1.Card, Object.assign({ padding: 4, border: true, display: "flex" }, getRootProps(), { style: {
            minHeight: '300px',
            borderStyle: isDragActive ? 'dashed' : 'solid',
            background: isDragReject
                ? color_1.red[50].hex
                : isDragAccept
                    ? color_1.green[50].hex
                    : color_1.gray[100].hex,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
        } }),
        react_1.default.createElement("input", Object.assign({ ref: inputRef, id: "drop-file" }, getInputProps(), { disabled: !['idle', 'retry', 'failure'].includes(state.value) })),
        react_1.default.createElement(ui_1.Stack, { space: 3 },
            state.value === 'failure' && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_2.Heading, { size: 2 }, ((_a = state.context.error) === null || _a === void 0 ? void 0 : _a.title) || 'Failed to upload'),
                ((_b = state.context.error) === null || _b === void 0 ? void 0 : _b.subtitle) && (react_1.default.createElement(ui_1.Text, null, state.context.error.subtitle)),
                react_1.default.createElement(ui_1.Inline, { space: 2, style: { marginTop: '0.75rem' } },
                    react_1.default.createElement(ui_1.Button, { icon: icons_1.RestoreIcon, fontSize: 2, padding: 3, mode: "ghost", text: "Retry", tone: "primary", onClick: (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            retry();
                        }, style: { position: 'relative', zIndex: 20 } }),
                    react_1.default.createElement(ui_1.Button, { icon: icons_1.UploadIcon, fontSize: 2, padding: 3, mode: "ghost", text: "Upload another file", onClick: onUploadClick })))),
            state.value === 'success' && (react_1.default.createElement(ui_1.Text, { weight: "bold", muted: true }, "Success!")),
            state.value === 'idle' && (react_1.default.createElement(react_1.default.Fragment, null,
                !isDragActive && (react_1.default.createElement(icons_1.UploadIcon, { style: { margin: '0 auto' }, fontSize: 40 })),
                react_1.default.createElement(ui_1.Text, { weight: "bold", muted: isDragActive }, isDragActive ? 'Drop to upload' : 'Drag file or click here'))),
            loadingStates.find(state.matches) && (react_1.default.createElement(react_1.default.Fragment, null,
                state.value === 'confirmFile' && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(ui_1.Text, { weight: "bold" }, "Are you sure you wish to upload:"),
                    react_1.default.createElement(ui_1.Text, null,
                        "\"",
                        state.context.file.path,
                        "\""),
                    react_1.default.createElement(ui_1.Button, { icon: icons_1.UploadIcon, fontSize: 2, padding: 3, mode: "ghost", tone: "primary", text: "Confirm", style: { flex: 1 }, onClick: confirm }),
                    react_1.default.createElement(ui_1.Button, { icon: icons_1.CloseIcon, fontSize: 2, padding: 3, mode: "ghost", text: "Cancel", tone: "critical", style: { flex: 1 }, onClick: cancelUpload }))),
                state.value !== 'confirmFile' && react_1.default.createElement(ui_1.Spinner, null),
                react_1.default.createElement(ui_1.Text, { weight: "bold", muted: true },
                    state.matches('extractingVideoMetadata') &&
                        'Extracting video thumbnails',
                    state.matches('extractingAudioMetadata') && (react_1.default.createElement(react_1.default.Fragment, null,
                        "Extracting audio's waveform",
                        react_1.default.createElement("div", { style: {
                                fontWeight: 400,
                            } }, "(may take up to 2 minutes)"))),
                    state.value === 'uploadingToVendor' && 'Uploading...',
                    state.value === 'uploadingToSanity' &&
                        'Saving to the library...'),
                state.value === 'uploadingToVendor' && (react_1.default.createElement(react_1.default.Fragment, null,
                    props.vendorConfig.supportsProgress && (react_1.default.createElement(ui_1.Text, null,
                        state.context.vendorUploadProgress,
                        "%")),
                    react_1.default.createElement(ui_1.Button, { icon: icons_1.CloseIcon, fontSize: 2, padding: 3, mode: "ghost", text: "Cancel", tone: "critical", style: { flex: 1 }, onClick: cancelUpload }))))))));
};
exports.default = UploadBox;
