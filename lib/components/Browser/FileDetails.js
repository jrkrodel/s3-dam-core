"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const icons_1 = require("@sanity/icons");
const ui_1 = require("@sanity/ui");
const react_1 = require("@xstate/react");
const default_1 = __importDefault(require("part:@sanity/components/formfields/default"));
const react_2 = __importDefault(require("react"));
const formatBytes_1 = __importDefault(require("../../scripts/formatBytes"));
const formatSeconds_1 = __importDefault(require("../../scripts/formatSeconds"));
const sanityClient_1 = __importDefault(require("../../scripts/sanityClient"));
const IconInfo_1 = __importDefault(require("../IconInfo"));
const MediaPreview_1 = __importDefault(require("../MediaPreview"));
const SpinnerBox_1 = __importDefault(require("../SpinnerBox"));
const fileDetailsMachine_1 = __importDefault(require("./fileDetailsMachine"));
const FileReferences_1 = __importDefault(require("./FileReferences"));
const CredentialsProvider_1 = require("../Credentials/CredentialsProvider");
const AssetInput = (props) => (react_2.default.createElement(default_1.default, { label: props.label, description: props.description, level: 0 },
    react_2.default.createElement(ui_1.TextInput, { value: props.value, placeholder: props.placeholder, onInput: props.onInput })));
const FileDetails = (props) => {
    var _a, _b, _c;
    const { closeDialog, vendorConfig } = props;
    const toast = (0, ui_1.useToast)();
    const { credentials } = react_2.default.useContext(CredentialsProvider_1.CredentialsContext);
    const [state, send] = (0, react_1.useMachine)(fileDetailsMachine_1.default, {
        actions: {
            closeDialog: () => closeDialog(),
            deletedToast: () => toast.push({
                title: 'File successfully deleted',
                status: 'success',
            }),
            persistFileSave: (_context, event) => { var _a; return ((_a = event.data) === null || _a === void 0 ? void 0 : _a._id) && props.persistFileSave(event.data); },
            persistFileDeletion: (context) => { var _a; return ((_a = context.file) === null || _a === void 0 ? void 0 : _a._id) && props.persistFileDeletion(context.file); },
        },
        services: {
            fetchReferences: (context) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
                var _d;
                if (context.references) {
                    resolve(context.references);
                }
                try {
                    const references = yield sanityClient_1.default.fetch('*[references($id)]', {
                        id: (_d = context.file) === null || _d === void 0 ? void 0 : _d._id,
                    });
                    resolve(references);
                }
                catch (error) {
                    reject(error);
                }
            })),
            deleteFile: (context) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
                var _e;
                try {
                    if (!(context === null || context === void 0 ? void 0 : context.file) || !credentials) {
                        reject('Missing file or credentials');
                        return;
                    }
                    const deletedAtVendor = yield (vendorConfig === null || vendorConfig === void 0 ? void 0 : vendorConfig.deleteFile({
                        storedFile: context.file,
                        credentials,
                    }));
                    if (deletedAtVendor !== true) {
                        reject(deletedAtVendor);
                        return;
                    }
                    yield sanityClient_1.default.delete((_e = context.file) === null || _e === void 0 ? void 0 : _e._id);
                    resolve('Success!');
                }
                catch (error) {
                    reject(error);
                }
            })),
            saveToSanity: (context) => {
                var _a, _b, _c, _d;
                return sanityClient_1.default
                    .patch((_a = context.file) === null || _a === void 0 ? void 0 : _a._id)
                    .set({
                    title: (_b = context.file) === null || _b === void 0 ? void 0 : _b.title,
                    description: (_c = context.file) === null || _c === void 0 ? void 0 : _c.description,
                    fileName: (_d = context.file) === null || _d === void 0 ? void 0 : _d.fileName,
                })
                    .commit();
            },
        },
        context: {
            file: props.file,
            modified: false,
        },
    });
    const file = state.context.file || props.file;
    const isSaving = state.matches('interactions.saving');
    return (react_2.default.createElement(ui_1.Dialog, { header: file.title || file.fileName, zOffset: 600000, id: "file-details-dialog", onClose: () => send('CLOSE'), onClickOutside: () => send('CLOSE'), width: 2, position: "fixed", footer: react_2.default.createElement(ui_1.Card, { padding: 3 },
            react_2.default.createElement(ui_1.Flex, { justify: "space-between", align: "center" },
                react_2.default.createElement(ui_1.Button, { icon: icons_1.TrashIcon, fontSize: 2, padding: 3, mode: "bleed", text: "Delete", tone: "critical", onClick: () => send('DELETE'), disabled: isSaving }),
                state.context.modified && (react_2.default.createElement(ui_1.Button, { icon: icons_1.CheckmarkIcon, fontSize: 2, padding: 3, mode: "ghost", text: "Save and close", tone: "positive", onClick: () => send('SAVE'), iconRight: isSaving && ui_1.Spinner, disabled: isSaving })))) },
        state.matches('interactions.deleting') && (react_2.default.createElement(ui_1.Dialog, { header: 'Delete file', zOffset: 600000, id: "deleting-file-details-dialog", onClose: () => send('CANCEL'), onClickOutside: () => send('CANCEL'), width: 1, position: "fixed", footer: react_2.default.createElement(ui_1.Card, { padding: 3 },
                react_2.default.createElement(ui_1.Flex, { justify: "space-between", align: "center" },
                    react_2.default.createElement(ui_1.Button, { icon: icons_1.TrashIcon, fontSize: 2, padding: 3, text: "Delete file", tone: "critical", onClick: () => send('CONFIRM'), disabled: [
                            'interactions.deleting.processing_deletion',
                            'interactions.deleting.checkingReferences',
                            'interactions.deleting.cantDelete',
                        ].some(state.matches) }))) },
            react_2.default.createElement(ui_1.Card, { padding: 5, style: {
                    minHeight: '150px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                } },
                react_2.default.createElement(ui_1.Stack, { style: { textAlign: 'center' }, space: 3 },
                    state.matches('interactions.deleting.checkingReferences') && (react_2.default.createElement(react_2.default.Fragment, null,
                        react_2.default.createElement(ui_1.Heading, { size: 2 }, "Checking if file can be deleted"),
                        react_2.default.createElement(SpinnerBox_1.default, null))),
                    state.matches('interactions.deleting.cantDelete') && (react_2.default.createElement(react_2.default.Fragment, null,
                        react_2.default.createElement(ui_1.Heading, { size: 2 }, "File can't be deleted"),
                        react_2.default.createElement(ui_1.Text, { size: 2 },
                            "There are ", (_a = state.context.references) === null || _a === void 0 ? void 0 :
                            _a.length,
                            " documents pointing to this file. Edit or delete them before deleting this file."),
                        ((_b = state.context.file) === null || _b === void 0 ? void 0 : _b._id) && (react_2.default.createElement(FileReferences_1.default, { fileId: state.context.file._id, references: state.context.references, isLoaded: state.context.referencesLoaded })))),
                    state.matches('interactions.deleting.confirm') && (react_2.default.createElement(react_2.default.Fragment, null,
                        react_2.default.createElement(ui_1.Heading, { size: 2 }, "Are you sure you want to delete this file?"),
                        react_2.default.createElement(ui_1.Text, { size: 2 }, "This action is irreversible"))),
                    state.matches('interactions.deleting.processing_deletion') && (react_2.default.createElement(react_2.default.Fragment, null,
                        react_2.default.createElement(ui_1.Heading, { size: 2 }, "Deleting file..."),
                        react_2.default.createElement(SpinnerBox_1.default, null))),
                    state.matches('interactions.deleting.error_deleting') && (react_2.default.createElement(react_2.default.Fragment, null,
                        react_2.default.createElement(ui_1.Heading, { size: 2 }, "Something went wrong!"),
                        react_2.default.createElement(ui_1.Text, { size: 2 }, "Try deleting the file again by clicking the button below"))))))),
        state.matches('interactions.closing.confirm') && (react_2.default.createElement(ui_1.Dialog, { header: 'You have unsaved changes', zOffset: 600000, id: "closing-file-details-dialog", onClose: () => send('CANCEL'), onClickOutside: () => send('CANCEL'), width: 1, position: "fixed", footer: react_2.default.createElement(ui_1.Card, { padding: 3 },
                react_2.default.createElement(ui_1.Flex, { justify: "space-between", align: "center" },
                    react_2.default.createElement(ui_1.Button, { icon: icons_1.ErrorOutlineIcon, fontSize: 2, padding: 3, text: "Discard changes", tone: "critical", onClick: () => send('CONFIRM') }),
                    state.context.modified && (react_2.default.createElement(ui_1.Button, { icon: icons_1.RevertIcon, fontSize: 2, padding: 3, mode: "ghost", text: "Keep editing", tone: "primary", onClick: () => send('CANCEL') })))) },
            react_2.default.createElement(ui_1.Card, { padding: 5 },
                react_2.default.createElement(ui_1.Stack, { style: { textAlign: 'center' }, space: 3 },
                    react_2.default.createElement(ui_1.Heading, { size: 2 }, "Unsaved changes will be lost"),
                    react_2.default.createElement(ui_1.Text, { size: 2 }, "Are you sure you want to discard them?"))))),
        react_2.default.createElement(ui_1.Card, { padding: 4, sizing: "border" },
            react_2.default.createElement(ui_1.Flex, { sizing: "border", wrap: "wrap", gap: 4, align: "flex-start" },
                react_2.default.createElement(ui_1.Stack, { space: 4, flex: 1, sizing: "border" },
                    react_2.default.createElement(MediaPreview_1.default, { context: "detailsDialog", file: file }),
                    react_2.default.createElement(ui_1.Stack, { space: 3 },
                        (file === null || file === void 0 ? void 0 : file.duration) && (react_2.default.createElement(IconInfo_1.default, { text: `Duration: ${(0, formatSeconds_1.default)(file.duration)}`, icon: icons_1.ClockIcon, size: 2 })),
                        (file === null || file === void 0 ? void 0 : file.fileSize) && (react_2.default.createElement(IconInfo_1.default, { text: `Size: ${(0, formatBytes_1.default)(file.fileSize, 2)}`, icon: icons_1.DownloadIcon, size: 2 })),
                        react_2.default.createElement(IconInfo_1.default, { text: `Uploaded on: ${new Date(file._createdAt).toISOString().split('T')[0]}`, icon: icons_1.CalendarIcon, size: 2 }))),
                react_2.default.createElement(ui_1.Stack, { space: 4, flex: 1, sizing: "border" },
                    react_2.default.createElement(ui_1.TabList, { space: 2 },
                        react_2.default.createElement(ui_1.Tab, { "aria-controls": "details-panel", icon: icons_1.EditIcon, id: "details-tab", label: "Details", onClick: () => send({ type: 'OPEN_DETAILS' }), selected: state.matches('tab.details_tab'), space: 2 }),
                        react_2.default.createElement(ui_1.Tab, { "aria-controls": "references-panel", icon: icons_1.SearchIcon, id: "references-tab", label: "Used by", onClick: () => send({ type: 'OPEN_REFERENCES' }), selected: state.matches('tab.references_tab'), space: 2 })),
                    react_2.default.createElement(ui_1.TabPanel, { "aria-labelledby": "details-tab", id: "details-panel", hidden: !state.matches('tab.details_tab') },
                        react_2.default.createElement(ui_1.Stack, { space: 3 },
                            react_2.default.createElement(AssetInput, { label: "Internal title", description: "Not visible to users. Useful for finding files later.", value: (file === null || file === void 0 ? void 0 : file.title) || '', placeholder: `Ex: "Customer testimonial ${((_c = file === null || file === void 0 ? void 0 : file.contentType) === null || _c === void 0 ? void 0 : _c.split('/')[0]) || 'video'}"`, onInput: (e) => send({
                                    type: 'MODIFY_FILE',
                                    value: e.currentTarget.value,
                                    field: 'title',
                                }) }),
                            react_2.default.createElement(AssetInput, { label: "Internal description", description: "Not visible to users. Useful for finding files later.", value: (file === null || file === void 0 ? void 0 : file.description) || '', onInput: (e) => send({
                                    type: 'MODIFY_FILE',
                                    value: e.currentTarget.value,
                                    field: 'description',
                                }) }),
                            react_2.default.createElement(AssetInput, { label: "File name", value: (file === null || file === void 0 ? void 0 : file.fileName) || '', onInput: (e) => send({
                                    type: 'MODIFY_FILE',
                                    value: e.currentTarget.value,
                                    field: 'fileName',
                                }) }))),
                    react_2.default.createElement(ui_1.TabPanel, { "aria-labelledby": "references-tab", id: "references-panel", hidden: !state.matches('tab.references_tab') },
                        react_2.default.createElement(FileReferences_1.default, { fileId: file._id, references: state.context.references, isLoaded: state.context.referencesLoaded })))))));
};
exports.default = FileDetails;
