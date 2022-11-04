"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstate_1 = require("xstate");
const browserMachine = (0, xstate_1.createMachine)({
    id: 'browser-machine',
    initial: 'loading',
    states: {
        loading: {
            invoke: {
                id: 'FetchFiles',
                src: 'fetchFiles',
                onDone: {
                    target: 'browsing',
                    actions: [
                        // console.log,
                        (0, xstate_1.assign)({
                            allFiles: (_context, event) => event.data,
                            filteredFiles: (_context, event) => event.data,
                        }),
                    ],
                },
            },
        },
        browsing: {
            on: {
                SEARCH_TERM: {
                    actions: [
                        (0, xstate_1.assign)({
                            searchTerm: (_context, event) => event.term,
                        }),
                        'filterFiles',
                    ],
                },
                EDIT_FILE: {
                    target: 'editingFile',
                    actions: (0, xstate_1.assign)({
                        fileToEdit: (_context, event) => event.file,
                    }),
                },
                OPEN_UPLOAD: 'uploading',
                OPEN_SETTINGS: 'editingSettings',
            },
        },
        uploading: {
            on: {
                CLOSE_UPLOAD: 'browsing',
                UPLOADED: {
                    target: 'editingFile',
                    actions: [
                        (0, xstate_1.assign)((context, event) => {
                            const newFiles = [event.file, ...(context.allFiles || [])];
                            return {
                                // After upload is done:
                                // 1. open the file selection dialog for this entry
                                fileToEdit: event.file,
                                // 2. Reset search
                                searchTerm: '',
                                // 3. Default to allFiles & filteredFiles
                                allFiles: newFiles,
                                filteredFiles: newFiles,
                            };
                        }),
                    ],
                },
            },
        },
        editingFile: {
            on: {
                CLEAR_FILE: {
                    target: 'browsing',
                    actions: (0, xstate_1.assign)({
                        fileToEdit: (_context) => undefined,
                    }),
                },
            },
        },
        editingSettings: {
            on: {
                CLOSE_SETTINGS: {
                    target: 'browsing',
                },
            },
        },
    },
    on: {
        PERSIST_FILE_SAVE: {
            actions: (0, xstate_1.assign)({
                allFiles: (context, event) => {
                    var _a;
                    return (_a = context.allFiles) === null || _a === void 0 ? void 0 : _a.map((file) => {
                        var _a;
                        if (file._id === ((_a = event.file) === null || _a === void 0 ? void 0 : _a._id)) {
                            return event.file;
                        }
                        return file;
                    });
                },
                filteredFiles: (context, event) => {
                    var _a;
                    return (_a = context.filteredFiles) === null || _a === void 0 ? void 0 : _a.map((file) => {
                        var _a;
                        if (file._id === ((_a = event.file) === null || _a === void 0 ? void 0 : _a._id)) {
                            return event.file;
                        }
                        return file;
                    });
                },
            }),
        },
        PERSIST_FILE_DELETION: {
            actions: (0, xstate_1.assign)({
                allFiles: (context, event) => {
                    var _a;
                    return (_a = context.allFiles) === null || _a === void 0 ? void 0 : _a.filter((file) => {
                        var _a;
                        if (file._id === ((_a = event.file) === null || _a === void 0 ? void 0 : _a._id)) {
                            return false;
                        }
                        return true;
                    });
                },
                filteredFiles: (context, event) => {
                    var _a;
                    return (_a = context.filteredFiles) === null || _a === void 0 ? void 0 : _a.filter((file) => {
                        var _a;
                        if (file._id === ((_a = event.file) === null || _a === void 0 ? void 0 : _a._id)) {
                            return false;
                        }
                        return true;
                    });
                },
            }),
        },
    },
}, {
    actions: {
        filterFiles: (0, xstate_1.assign)({
            filteredFiles: (context, event) => {
                if (event.type !== 'SEARCH_TERM' || typeof event.term !== 'string') {
                    return context.filteredFiles;
                }
                const filtered = (context.allFiles || []).filter((file) => {
                    var _a, _b, _c;
                    return ((_a = file.fileName) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(event.term)) ||
                        ((_b = file.description) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(event.term)) ||
                        ((_c = file.title) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(event.term));
                });
                return filtered;
            },
        }),
    },
});
exports.default = browserMachine;
