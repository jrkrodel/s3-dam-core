"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@sanity/ui");
const icons_1 = require("@sanity/icons");
const formatSeconds_1 = __importDefault(require("../scripts/formatSeconds"));
const formatBytes_1 = __importDefault(require("../scripts/formatBytes"));
const IconInfo_1 = __importDefault(require("./IconInfo"));
const FileMetadata = ({ file }) => {
    if (!file) {
        return null;
    }
    return (react_1.default.createElement(ui_1.Stack, { space: 2 },
        react_1.default.createElement(ui_1.Stack, { space: 2 },
            react_1.default.createElement(ui_1.Text, { size: 1, weight: "bold", muted: true, style: {
                    wordWrap: 'break-word',
                } }, file.title || file.fileName),
            file.description && (react_1.default.createElement("p", { style: {
                    fontFamily: 'inherit',
                    margin: 0,
                    fontSize: '0.8125rem',
                    lineHeight: '1.0625rem',
                    color: 'var(--card-muted-fg-color)',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    overflow: 'hidden',
                } }, file.description))),
        react_1.default.createElement(ui_1.Inline, { space: 3 },
            file.duration && (react_1.default.createElement(IconInfo_1.default, { text: (0, formatSeconds_1.default)(file.duration), icon: icons_1.ClockIcon })),
            file.fileSize && (react_1.default.createElement(IconInfo_1.default, { text: (0, formatBytes_1.default)(file.fileSize), icon: icons_1.DownloadIcon })),
            react_1.default.createElement(IconInfo_1.default, { text: new Date(file._createdAt).toISOString().split('T')[0], icon: icons_1.CalendarIcon }))));
};
exports.default = FileMetadata;
