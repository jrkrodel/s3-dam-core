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
const xstate_1 = require("xstate");
const getWaveformData_1 = __importDefault(require("../../scripts/getWaveformData"));
const parseAccept_1 = __importDefault(require("../../scripts/parseAccept"));
const INITIAL_CONTEXT = {
    retries: 0,
    vendorUploadProgress: 0,
};
function getBasicFileMetadata(file) {
    return {
        fileSize: file.size,
        contentType: (0, parseAccept_1.default)(file.type),
    };
}
const uploadMachine = (0, xstate_1.createMachine)({
    id: 'upload',
    initial: 'idle',
    context: INITIAL_CONTEXT,
    states: {
        idle: {},
        confirmFile: {
            on: {
                SUCCESS: {
                    target: 'uploadingToVendor',
                },
            },
        },
        extractingVideoMetadata: {
            invoke: {
                id: 'ExtractVideoMetadata',
                src: (context) => __awaiter(void 0, void 0, void 0, function* () {
                    return new Promise((resolve, reject) => {
                        if (!context.file) {
                            reject('Missing file');
                            return;
                        }
                        const videoEl = document.createElement('video');
                        videoEl.setAttribute('src', URL.createObjectURL(context.file));
                        const canvasEl = document.createElement('canvas');
                        const canvasCtx = canvasEl.getContext('2d');
                        videoEl.addEventListener('loadedmetadata', () => {
                            canvasEl.width = videoEl.videoWidth;
                            canvasEl.height = videoEl.videoHeight;
                            // Go to frame at 1 second
                            videoEl.currentTime = 1;
                        });
                        videoEl.addEventListener('timeupdate', () => {
                            canvasCtx === null || canvasCtx === void 0 ? void 0 : canvasCtx.drawImage(videoEl, 0, 0, videoEl.videoWidth, videoEl.videoHeight);
                            canvasEl.toBlob((blob) => {
                                // Clean up once we have the image
                                canvasEl.remove();
                                videoEl.remove();
                                resolve({
                                    screenshot: blob,
                                    metadata: Object.assign({ duration: videoEl.duration, dimensions: {
                                            width: videoEl.videoWidth,
                                            height: videoEl.videoHeight,
                                        } }, getBasicFileMetadata(context.file)),
                                });
                            }, 'image/png');
                        });
                    });
                }),
                onDone: {
                    target: 'uploadingToVendor',
                    actions: [
                        (0, xstate_1.assign)({
                            videoScreenshot: (_context, event) => event.data.screenshot,
                            formatMetadata: (_context, event) => event.data.metadata,
                        }),
                    ],
                },
                onError: {
                    // If we can't generate a screenshot, that's okay - proceed to uploadingToVendor
                    target: 'uploadingToVendor',
                },
            },
        },
        extractingAudioMetadata: {
            invoke: {
                id: 'ExtractAudioMetadata',
                src: (context) => __awaiter(void 0, void 0, void 0, function* () {
                    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
                        if (!context.file || !context.file.type.includes('audio')) {
                            reject();
                            return;
                        }
                        const originalAudioEl = document.createElement('audio');
                        originalAudioEl.setAttribute('src', URL.createObjectURL(context.file));
                        let metadata = {};
                        originalAudioEl.addEventListener('loadedmetadata', () => {
                            metadata = {
                                duration: originalAudioEl.duration,
                            };
                        });
                        try {
                            console.time('Getting waveform data');
                            const waveformData = yield (0, getWaveformData_1.default)(context.file);
                            console.timeEnd('Getting waveform data');
                            resolve({
                                metadata: Object.assign(Object.assign(Object.assign({}, metadata), { waveformData }), getBasicFileMetadata(context.file)),
                            });
                        }
                        catch (error) {
                            resolve({ metadata });
                        }
                    }));
                }),
                onDone: {
                    target: 'uploadingToVendor',
                    actions: [
                        (0, xstate_1.assign)({
                            formatMetadata: (_context, event) => event.data.metadata,
                        }),
                    ],
                },
                onError: {
                    // If we can't generate a waveform, that's okay - proceed to uploadingToVendor
                    target: 'uploadingToVendor',
                },
            },
        },
        uploadingToVendor: {
            invoke: {
                id: 'VendorUpload',
                src: 'uploadToVendor',
            },
            on: {
                VENDOR_PROGRESS: {
                    actions: [
                        (0, xstate_1.assign)({
                            vendorUploadProgress: (_context, event) => event.data,
                        }),
                    ],
                },
                VENDOR_DONE: [
                    {
                        target: 'uploadingToSanity',
                        actions: [
                            (0, xstate_1.assign)({
                                vendorUpload: (_context, event) => event.data,
                            }),
                        ],
                    },
                ],
                VENDOR_ERROR: {
                    target: 'failure',
                    actions: (0, xstate_1.assign)({
                        error: (context, event) => {
                            var _a;
                            return ({
                                error: event.error,
                                title: 'Failed to upload',
                                subtitle: context.retries > 1
                                    ? "Make sure the right credentials are set in the plugins' settings."
                                    : ((_a = event.error) === null || _a === void 0 ? void 0 : _a.message) || 'Error',
                            });
                        },
                    }),
                },
            },
        },
        uploadingToSanity: {
            invoke: {
                id: 'SanityUpload',
                src: 'uploadToSanity',
                onDone: {
                    target: 'success',
                    actions: [
                        (0, xstate_1.assign)({
                            sanityUpload: (_context, event) => event.data,
                        }),
                    ],
                },
                onError: {
                    target: 'failure',
                    actions: (0, xstate_1.assign)({
                        error: (context, event) => ({
                            error: event.data,
                            title: 'Failed to save to library',
                            subtitle: context.retries > 0
                                ? "Try again in a few minutes, and if this still doesn't work reach a developer for help."
                                : 'This is probably due to a network error, please try again.',
                        }),
                    }),
                },
            },
        },
        success: {
            on: {
                RESET_UPLOAD: {
                    target: 'idle',
                    actions: (0, xstate_1.assign)((_ctx) => (Object.assign({}, INITIAL_CONTEXT))),
                },
            },
        },
        failure: {
            on: {
                RETRY: [
                    {
                        target: 'uploadingToSanity',
                        actions: (0, xstate_1.assign)({
                            retries: (context, event) => context.retries + 1,
                        }),
                        cond: 'hasUploadedToVendor',
                    },
                    {
                        target: 'uploadingToVendor',
                        actions: (0, xstate_1.assign)({
                            retries: (context, event) => context.retries + 1,
                        }),
                    },
                ],
            },
        },
    },
    on: {
        CANCEL_INPUT: {
            target: 'idle',
        },
        SELECT_FILE: [
            {
                target: 'extractingVideoMetadata',
                cond: (_context, event, { state }) => {
                    var _a, _b;
                    return (['idle', 'failure'].some(state.matches) &&
                        ((_b = (_a = event.file) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.includes('video'))) ||
                        false;
                },
                actions: [
                    (0, xstate_1.assign)({
                        file: (_context, event) => event.file,
                    }),
                ],
            },
            {
                target: 'extractingAudioMetadata',
                cond: (_context, event, { state }) => {
                    var _a, _b;
                    return (['idle', 'failure'].some(state.matches) &&
                        ((_b = (_a = event.file) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.includes('audio'))) ||
                        false;
                },
                actions: [
                    (0, xstate_1.assign)({
                        file: (_context, event) => event.file,
                    }),
                ],
            },
            {
                target: 'confirmFile',
                actions: [
                    (0, xstate_1.assign)({
                        file: (_context, event) => event.file,
                    }),
                ],
            },
        ],
    },
}, {
    guards: {
        canRetry: (context) => context.retries <= 3,
        hasUploadedToVendor: (context) => !!context.vendorUpload,
    },
});
exports.default = uploadMachine;
