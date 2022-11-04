"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xstate_1 = require("xstate");
const fileDetailsMachine = (0, xstate_1.createMachine)({
    id: 'file-details',
    context: {
        modified: false,
        referencesLoaded: false,
    },
    type: 'parallel',
    states: {
        tab: {
            initial: 'details_tab',
            states: {
                details_tab: {
                    on: {
                        OPEN_REFERENCES: 'references_tab',
                        MODIFY_FILE: {
                            actions: [
                                'modifyFile',
                                (0, xstate_1.assign)({
                                    modified: (_context) => true,
                                }),
                            ],
                        },
                    },
                },
                references_tab: {
                    initial: 'loading',
                    states: {
                        loading: {
                            invoke: {
                                id: 'FetchReferences',
                                src: 'fetchReferences',
                                onDone: {
                                    target: 'loaded',
                                    actions: (0, xstate_1.assign)({
                                        references: (_context, event) => event.data,
                                        referencesLoaded: (_context) => true,
                                    }),
                                },
                            },
                        },
                        loaded: {},
                    },
                    on: {
                        OPEN_DETAILS: 'details_tab',
                    },
                },
            },
        },
        interactions: {
            initial: 'idle',
            states: {
                idle: {},
                deleting: {
                    initial: 'checkingReferences',
                    states: {
                        checkingReferences: {
                            invoke: {
                                id: 'FetchReferences',
                                src: 'fetchReferences',
                                onDone: {
                                    target: 'canDelete',
                                    actions: (0, xstate_1.assign)({
                                        references: (_context, event) => event.data,
                                        referencesLoaded: (_context) => true,
                                    }),
                                },
                            },
                        },
                        canDelete: {
                            on: {
                                '': [
                                    {
                                        target: 'confirm',
                                        cond: (context) => { var _a; return !((_a = context.references) === null || _a === void 0 ? void 0 : _a.length); },
                                    },
                                    {
                                        target: 'cantDelete',
                                    },
                                ],
                            },
                        },
                        cantDelete: {},
                        confirm: {
                            on: {
                                CONFIRM: 'processing_deletion',
                            },
                        },
                        processing_deletion: {
                            invoke: {
                                id: 'DeleteFile',
                                src: 'deleteFile',
                                onDone: {
                                    target: 'deleted',
                                    actions: 'persistFileDeletion',
                                },
                                onError: {
                                    target: 'error_deleting',
                                },
                            },
                        },
                        deleted: {
                            type: 'final',
                        },
                        error_deleting: {
                            on: {
                                CONFIRM: 'processing_deletion',
                            },
                        },
                    },
                    on: {
                        CANCEL: {
                            target: 'idle',
                            cond: (_context, _event, { state }) => !state.matches('interactions.deleting.processing_deletion'),
                        },
                    },
                    onDone: {
                        actions: ['deletedToast', 'closeDialog'],
                    },
                },
                saving: {
                    invoke: {
                        id: 'SaveToSanity',
                        src: 'saveToSanity',
                        onDone: {
                            target: 'closing.closed',
                            actions: 'persistFileSave',
                        },
                    },
                },
                closing: {
                    initial: 'confirm',
                    states: {
                        confirm: {
                            on: {
                                '': [
                                    {
                                        target: 'closed',
                                        cond: (context) => !context.modified,
                                    },
                                ],
                                CONFIRM: 'closed',
                            },
                        },
                        closed: {
                            type: 'final',
                        },
                    },
                    on: {
                        CANCEL: 'idle',
                    },
                    onDone: {
                        actions: 'closeDialog',
                    },
                },
            },
            on: {
                DELETE: 'interactions.deleting',
                CLOSE: {
                    target: 'interactions.closing',
                    cond: (_context, _event, { state }) => !state.matches('interactions.saving') &&
                        !state.matches('interactions.deleting'),
                },
                SAVE: [
                    {
                        target: 'interactions.saving',
                        // Needs to be modified to be saved
                        cond: (context) => context.modified,
                    },
                ],
            },
        },
    },
}, {
    actions: {
        modifyFile: (0, xstate_1.assign)({
            file: (context, event) => {
                if (event.type !== 'MODIFY_FILE' || !context.file) {
                    return context.file;
                }
                const newFile = JSON.parse(JSON.stringify(context.file));
                if (event.field === 'title') {
                    newFile.title = event.value;
                }
                if (event.field === 'description') {
                    newFile.description = event.value;
                }
                if (event.field === 'fileName') {
                    newFile.fileName = event.value;
                }
                return newFile;
            },
        }),
    },
});
exports.default = fileDetailsMachine;
