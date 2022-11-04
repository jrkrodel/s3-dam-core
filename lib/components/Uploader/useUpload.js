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
const react_1 = __importDefault(require("react"));
const react_2 = require("@xstate/react");
const react_dropzone_1 = require("react-dropzone");
const ui_1 = require("@sanity/ui");
const uploadMachine_1 = __importDefault(require("./uploadMachine"));
const parseAccept_1 = __importDefault(require("../../scripts/parseAccept"));
const CredentialsProvider_1 = require("../Credentials/CredentialsProvider");
const getFileRef_1 = __importDefault(require("../../scripts/getFileRef"));
const getBasicMetadata_1 = __importDefault(require("../../scripts/getBasicMetadata"));
const useUpload = ({ accept, vendorConfig, sanityClient, storeOriginalFilename = true, onSuccess, documentType, }) => {
    const toast = (0, ui_1.useToast)();
    const docType = documentType;
    const { credentials } = react_1.default.useContext(CredentialsProvider_1.CredentialsContext);
    const [state, send] = (0, react_2.useMachine)(uploadMachine_1.default, {
        actions: {
            invalidFileToast: () => toast.push({
                title: `Invalid file type uploaded`,
                status: 'error',
            }),
        },
        services: {
            uploadToVendor: (context) => (callback) => {
                var _a;
                if (!((_a = context.file) === null || _a === void 0 ? void 0 : _a.name) || !(vendorConfig === null || vendorConfig === void 0 ? void 0 : vendorConfig.uploadFile) || !credentials) {
                    callback({ type: 'CANCEL_INPUT' });
                    return;
                }
                const cleanUp = vendorConfig.uploadFile({
                    credentials,
                    file: context.file,
                    fileName: (0, getFileRef_1.default)({
                        file: context.file,
                        storeOriginalFilename,
                    }),
                    onError: (error) => callback({
                        type: 'VENDOR_ERROR',
                        error,
                    }),
                    updateProgress: (progress) => callback({ type: 'VENDOR_PROGRESS', data: progress }),
                    onSuccess: (uploadedFile) => callback({
                        type: 'VENDOR_DONE',
                        data: uploadedFile,
                    }),
                    documentType: docType
                });
                return () => {
                    if (typeof cleanUp === "function") {
                        cleanUp();
                    }
                };
            },
            uploadToSanity: (context) => {
                var _a;
                if (!((_a = context === null || context === void 0 ? void 0 : context.vendorUpload) === null || _a === void 0 ? void 0 : _a.fileURL) || !(context === null || context === void 0 ? void 0 : context.file)) {
                    return new Promise((_resolve, reject) => reject('Invalid Vendor upload'));
                }
                return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
                    var _b;
                    let screenshot;
                    if (((_b = context.videoScreenshot) === null || _b === void 0 ? void 0 : _b.type) === 'image/png') {
                        try {
                            screenshot = yield sanityClient.assets.upload('image', context.videoScreenshot, {
                                source: {
                                    id: `${vendorConfig.id}`,
                                    name: `${vendorConfig.id} (external DAM)`,
                                },
                                filename: (0, getFileRef_1.default)({
                                    file: context.file,
                                    storeOriginalFilename,
                                }),
                            });
                        }
                        catch (error) {
                            reject('Failed to save image');
                        }
                    }
                    try {
                        const document = yield sanityClient.create(Object.assign(Object.assign(Object.assign({ _type: `${vendorConfig.id}.storedFile`, screenshot: screenshot
                                ? {
                                    _type: 'image',
                                    asset: {
                                        _type: 'reference',
                                        _ref: screenshot === null || screenshot === void 0 ? void 0 : screenshot._id,
                                    },
                                }
                                : undefined }, (0, getBasicMetadata_1.default)({
                            file: context.file,
                            storeOriginalFilename,
                        })), context.vendorUpload), (context.formatMetadata || {})));
                        resolve(document);
                    }
                    catch (error) {
                        reject('Failed to create document');
                    }
                }));
            },
        },
        devTools: true,
    });
    const dropzone = (0, react_dropzone_1.useDropzone)({
        onDrop: (acceptedFiles) => {
            send({
                type: 'SELECT_FILE',
                file: acceptedFiles === null || acceptedFiles === void 0 ? void 0 : acceptedFiles[0],
            });
        },
        accept: (0, parseAccept_1.default)(accept),
        // Only allow 1 file to be uploaded
        maxFiles: 1,
    });
    function cancelUpload() {
        send({
            type: 'CANCEL_INPUT',
        });
    }
    function retry() {
        send({
            type: 'RETRY',
        });
    }
    function confirm() {
        send({
            type: 'SUCCESS'
        });
    }
    react_1.default.useEffect(() => {
        if (state.value === 'success' && state.context.sanityUpload && onSuccess) {
            onSuccess(state.context.sanityUpload);
            send('RESET_UPLOAD');
        }
    }, [state.value]);
    return {
        dropzone,
        state,
        cancelUpload,
        retry,
        confirm,
    };
};
exports.default = useUpload;
