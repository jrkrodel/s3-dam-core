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
const color_1 = require("@sanity/color");
const icons_1 = require("@sanity/icons");
const ui_1 = require("@sanity/ui");
const react_1 = __importDefault(require("react"));
const sanityClient_1 = __importStar(require("../scripts/sanityClient"));
const AudioIcon_1 = __importDefault(require("./AudioIcon"));
const FileMetadata_1 = __importDefault(require("./FileMetadata"));
const VideoIcon_1 = __importDefault(require("./VideoIcon"));
const WaveformDisplay_1 = __importDefault(require("./WaveformDisplay"));
const Player = (props) => {
    var _a, _b;
    if (!props.fileURL) {
        return null;
    }
    if ((_a = props.contentType) === null || _a === void 0 ? void 0 : _a.includes('audio')) {
        return (react_1.default.createElement("audio", { src: props.fileURL, controls: true, autoPlay: true, style: {
                width: '100%',
                height: '100%',
                objectFit: 'contain',
            } }));
    }
    else if ((_b = props.contentType) === null || _b === void 0 ? void 0 : _b.includes('pdf')) {
        return (react_1.default.createElement("iframe", { src: props.fileURL, width: '100%', height: '100%' }));
    }
    else
        return (react_1.default.createElement("video", { style: {
                width: '100%',
                height: '100%',
                objectFit: 'contain',
            }, src: props.fileURL, controls: true, autoPlay: true }));
};
const WrappingCard = ({ children, context, 
// 16:9 aspect ratio
paddingBottom = '56.25%', }) => {
    return (react_1.default.createElement(ui_1.Card, { padding: context === 'input' ? 4 : 0, border: context === 'input', display: "flex", style: {
            textAlign: 'center',
            width: '100%',
            position: 'relative',
            paddingBottom,
        }, sizing: "border" },
        react_1.default.createElement("div", { style: {
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%,-50%)',
                width: '100%',
                height: '100%',
            } }, children)));
};
const MediaPreview = (props) => {
    var _a, _b, _c;
    const [playing, setPlaying] = react_1.default.useState(false);
    const [fullFile, setFullFile] = react_1.default.useState();
    const expandReference = react_1.default.useCallback((_ref) => __awaiter(void 0, void 0, void 0, function* () {
        const doc = yield sanityClient_1.default.fetch(`*[_id == $id][0]`, {
            id: _ref,
        });
        setFullFile(doc);
    }), []);
    react_1.default.useEffect(() => {
        var _a, _b, _c;
        if ((_a = props.file) === null || _a === void 0 ? void 0 : _a.fileURL) {
            setFullFile(props.file);
        }
        else if (props.file && 'asset' in props.file && ((_c = (_b = props.file) === null || _b === void 0 ? void 0 : _b.asset) === null || _c === void 0 ? void 0 : _c._ref)) {
            expandReference(props.file.asset._ref);
        }
    }, [props.file]);
    if (!props.file || (fullFile && !fullFile.fileURL)) {
        return null;
    }
    if (!fullFile) {
        return (react_1.default.createElement(WrappingCard, { context: props.context },
            react_1.default.createElement(ui_1.Box, { style: {
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%,-50%)',
                } },
                react_1.default.createElement(ui_1.Spinner, null))));
    }
    const imgUrl = fullFile.screenshot &&
        sanityClient_1.imageBuilder
            .image(fullFile.screenshot)
            .width(props.context === 'browser' ? 300 : 600)
            .url();
    let mediaType = null;
    if ((_a = fullFile.contentType) === null || _a === void 0 ? void 0 : _a.includes('audio')) {
        mediaType = 'audio';
    }
    else if ((_b = fullFile.contentType) === null || _b === void 0 ? void 0 : _b.includes('video')) {
        mediaType = 'video';
    }
    else if ((_c = fullFile.contentType) === null || _c === void 0 ? void 0 : _c.includes('pdf')) {
        mediaType = 'pdf';
    }
    const allowPlayback = props.context !== 'browser';
    if (mediaType != 'pdf') {
        return (react_1.default.createElement(WrappingCard, { context: props.context, paddingBottom: fullFile.dimensions
                ? `${(fullFile.dimensions.height / fullFile.dimensions.width) * 100}%`
                : undefined }, playing ? (react_1.default.createElement(Player, Object.assign({}, fullFile))) : (react_1.default.createElement(react_1.default.Fragment, null,
            imgUrl ? (react_1.default.createElement("img", { style: {
                    width: '100%',
                    borderRadius: '.3rem',
                    height: '100%',
                    objectFit: 'contain',
                    color: 'transparent',
                }, src: imgUrl, alt: `Video's thumbnail` })) : (react_1.default.createElement(ui_1.Card, { padding: 0, sizing: "border", style: {
                    position: 'relative',
                    height: '100%',
                }, tone: "primary" },
                react_1.default.createElement(ui_1.Box, { style: {
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%,-50%)',
                        color: color_1.blue[800].hex,
                        height: mediaType === 'audio' && '60%',
                        width: mediaType === 'audio' && '90%',
                    } }, mediaType === 'audio' ? (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(AudioIcon_1.default, { style: {
                            width: '50%',
                            maxHeight: '70%',
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%,-50%)',
                            zIndex: 0,
                            color: fullFile && 'waveformData' in fullFile
                                ? color_1.blue[100].hex
                                : color_1.blue[800].hex,
                        } }),
                    fullFile.waveformData && (react_1.default.createElement(WaveformDisplay_1.default, { waveformData: fullFile.waveformData, style: {
                            zIndex: 1,
                            position: 'relative',
                            height: '100%',
                        }, colorHue: "blue" })))) : (react_1.default.createElement(VideoIcon_1.default, { style: { width: '50%', maxHeight: '70%' } }))))),
            allowPlayback && (react_1.default.createElement("button", { style: {
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%,-50%)',
                    fontSize: '3rem',
                    width: '1.5em',
                    height: '1.5em',
                    display: 'flex',
                    borderRadius: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'white',
                    border: '1px solid #ced2d9',
                    boxShadow: '1px 1px 6px rgba(134,144,160,0.2)',
                    cursor: 'pointer',
                }, onClick: () => setPlaying(true), "aria-label": `Play ${mediaType}` },
                react_1.default.createElement(icons_1.PlayIcon, null))),
            props.context === 'input' && (react_1.default.createElement(ui_1.Card, { padding: 4, style: {
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    boxSizing: 'border-box',
                } },
                react_1.default.createElement(FileMetadata_1.default, { file: fullFile })))))));
    }
    else {
        return (react_1.default.createElement(WrappingCard, { context: props.context, paddingBottom: fullFile.dimensions
                ? `${(fullFile.dimensions.height / fullFile.dimensions.width) * 100}%`
                : undefined }, allowPlayback ? (react_1.default.createElement(Player, Object.assign({}, fullFile))) : react_1.default.createElement("h1", { style: {
                position: 'absolute',
                left: '50%',
                top: '50%',
                margin: '0',
                transform: 'translate(-50%,-50%)'
            } }, "PDF")));
    }
};
exports.default = MediaPreview;
