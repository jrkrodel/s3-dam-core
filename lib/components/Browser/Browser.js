"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const icons_1 = require("@sanity/icons");
const ui_1 = require("@sanity/ui");
const react_1 = require("@xstate/react");
const react_2 = __importDefault(require("react"));
const parseAccept_1 = __importDefault(require("../../scripts/parseAccept"));
const sanityClient_1 = __importDefault(require("../../scripts/sanityClient"));
const ConfigureCredentials_1 = __importDefault(require("../Credentials/ConfigureCredentials"));
const CredentialsProvider_1 = require("../Credentials/CredentialsProvider");
const Uploader_1 = __importDefault(require("../Uploader/Uploader"));
const browserMachine_1 = __importDefault(require("./browserMachine"));
const FileDetails_1 = __importDefault(require("./FileDetails"));
const FilePreview_1 = __importDefault(require("./FilePreview"));
function getFilterForExtension(extension) {
    if (!extension) {
        return true;
    }
    return `contentType match "*${extension.replace(/[\.]/g, '')}*"`;
}
const Browser = (props) => {
    var _a, _b, _c, _d, _e, _f;
    const { onSelect, accept = (_a = props.vendorConfig) === null || _a === void 0 ? void 0 : _a.defaultAccept } = props;
    const [state, send] = (0, react_1.useMachine)(browserMachine_1.default, {
        services: {
            fetchFiles: () => {
                var _a;
                const parsedAccept = (0, parseAccept_1.default)(props.accept);
                let extensionFilter = '';
                if (typeof parsedAccept === 'string') {
                    extensionFilter = `&& ${getFilterForExtension(parsedAccept)}`;
                }
                else if (Array.isArray(parsedAccept)) {
                    extensionFilter = `&& (
            ${parsedAccept.map(getFilterForExtension).join(' || ')}
            
          )`;
                }
                return sanityClient_1.default.fetch(/* groq */ `
        *[
          _type == "${(_a = props.vendorConfig) === null || _a === void 0 ? void 0 : _a.id}.storedFile" &&
          defined(fileURL)
          ${extensionFilter}
        ] | order(_createdAt desc)
        `);
            },
        },
    });
    const { status } = react_2.default.useContext(CredentialsProvider_1.CredentialsContext);
    return (react_2.default.createElement(ui_1.ThemeProvider, { theme: ui_1.studioTheme },
        react_2.default.createElement(ui_1.Flex, { direction: "column", gap: 2, style: {
                background: 'white',
                padding: '2rem',
                minHeight: onSelect ? '300px' : '100%',
                boxSizing: 'border-box',
            } }, state.matches('loading') ? (react_2.default.createElement(ui_1.Flex, { flex: 1, justify: "center", align: "center" },
            react_2.default.createElement(ui_1.Spinner, null))) : status === 'missingCredentials' ? (react_2.default.createElement(ui_1.Container, { width: 1 },
            react_2.default.createElement(ConfigureCredentials_1.default, { vendorConfig: props.vendorConfig }))) : (react_2.default.createElement(ui_1.Container, { padding: 2, width: 3, sizing: "border-box", flex: 1 },
            react_2.default.createElement(ui_1.Flex, { justify: "space-between", align: "center" },
                react_2.default.createElement(ui_1.TextInput, { value: state.context.searchTerm || '', icon: icons_1.SearchIcon, onInput: (e) => send({
                        type: 'SEARCH_TERM',
                        term: e.currentTarget.value,
                    }), placeholder: "Search files" }),
                react_2.default.createElement(ui_1.Inline, { space: 2 },
                    status === 'success' && (react_2.default.createElement(ui_1.Button, { icon: icons_1.UploadIcon, mode: "ghost", tone: "primary", text: "Upload new file", fontSize: 2, onClick: () => send('OPEN_UPLOAD') })),
                    react_2.default.createElement(ui_1.Tooltip, { content: react_2.default.createElement(ui_1.Box, { padding: 3 },
                            react_2.default.createElement(ui_1.Text, null, "Plugin settings")) },
                        react_2.default.createElement(ui_1.Button, { icon: icons_1.CogIcon, mode: "ghost", tone: "default", fontSize: 2, onClick: () => send('OPEN_SETTINGS') })))),
            state.context.searchTerm ? (react_2.default.createElement(ui_1.Stack, { space: 3, style: { margin: '2rem 0 -1rem' } },
                react_2.default.createElement(ui_1.Text, { size: 3, weight: "bold" }, ((_b = state.context.filteredFiles) === null || _b === void 0 ? void 0 : _b.length)
                    ? `${(_c = state.context.filteredFiles) === null || _c === void 0 ? void 0 : _c.length} results for "${state.context.searchTerm}"`
                    : 'No results found'),
                ((_d = state.context.filteredFiles) === null || _d === void 0 ? void 0 : _d.length) ? null : (react_2.default.createElement(ui_1.Text, { size: 2 }, "If you can't find what you're looking for, consider uploading a new file by clicking on the button on the top-right.")))) : !((_e = state.context.allFiles) === null || _e === void 0 ? void 0 : _e.length) ? (react_2.default.createElement(ui_1.Stack, { space: 3, style: { margin: '2rem 0 -1rem' } },
                react_2.default.createElement(ui_1.Text, { size: 3, weight: "bold" }, "No files uploaded yet"))) : null,
            react_2.default.createElement(ui_1.Grid, { gap: 4, style: {
                    marginTop: '2rem',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr)',
                } }, ((_f = state.context.filteredFiles) === null || _f === void 0 ? void 0 : _f.length)
                ? state.context.filteredFiles.map((file) => (react_2.default.createElement(FilePreview_1.default, { key: file._id, file: file, onEdit: (chosen) => send({
                        type: 'EDIT_FILE',
                        file: chosen,
                    }), onSelect: onSelect })))
                : null),
            state.matches('uploading') && status === 'success' && (react_2.default.createElement(ui_1.Dialog, { header: "Upload new file", zOffset: 600000, id: "upload-dialog", onClose: () => send('CLOSE_UPLOAD'), onClickOutside: () => send('CLOSE_UPLOAD'), width: 1 },
                react_2.default.createElement(ui_1.Card, { padding: 3 },
                    react_2.default.createElement(Uploader_1.default, { sanityClient: sanityClient_1.default, accept: accept, onSuccess: (document) => send({
                            type: 'UPLOADED',
                            file: document,
                        }), storeOriginalFilename: true, vendorConfig: props.vendorConfig })))),
            state.matches('editingFile') && state.context.fileToEdit && (react_2.default.createElement(FileDetails_1.default, { closeDialog: () => send('CLEAR_FILE'), file: state.context.fileToEdit, onSelect: onSelect, persistFileSave: (file) => send({
                    type: 'PERSIST_FILE_SAVE',
                    file,
                }), persistFileDeletion: (file) => send({
                    type: 'PERSIST_FILE_DELETION',
                    file,
                }), vendorConfig: props.vendorConfig })),
            state.matches('editingSettings') && (react_2.default.createElement(ui_1.Dialog, { header: "Edit settings", zOffset: 600000, id: "settings-dialog", onClose: () => send('CLOSE_SETTINGS'), onClickOutside: () => send('CLOSE_SETTINGS'), width: 1 },
                react_2.default.createElement(ConfigureCredentials_1.default, { onCredentialsSaved: (success) => success && send('CLOSE_SETTINGS'), vendorConfig: props.vendorConfig }))))))));
};
exports.default = Browser;
