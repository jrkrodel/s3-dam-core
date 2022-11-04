"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@sanity/ui");
const icons_1 = require("@sanity/icons");
const MediaPreview_1 = __importDefault(require("../MediaPreview"));
const FileMetadata_1 = __importDefault(require("../FileMetadata"));
const FilePreview = ({ onSelect, onEdit, file, }) => {
    const select = react_1.default.useCallback(() => onSelect && onSelect(file), [onSelect, file]);
    const edit = react_1.default.useCallback(() => onEdit && onEdit(file), [onEdit, file]);
    if (!file) {
        return null;
    }
    return (react_1.default.createElement(ui_1.Card, { border: true, padding: 2, sizing: "border-box", radius: 2 },
        react_1.default.createElement(ui_1.Stack, { space: 3, height: "fill", style: {
                gridTemplateRows: 'min-content min-content 1fr',
            } },
            react_1.default.createElement(MediaPreview_1.default, { file: file, context: "browser" }),
            react_1.default.createElement(FileMetadata_1.default, { file: file }),
            react_1.default.createElement("div", { style: {
                    display: 'flex',
                    width: '100%',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    gap: '.35rem',
                } },
                onSelect && (react_1.default.createElement(ui_1.Button, { icon: icons_1.CheckmarkIcon, fontSize: 2, padding: 2, mode: "ghost", text: "Select", style: { flex: 1 }, tone: "positive", onClick: select })),
                react_1.default.createElement(ui_1.Button, { icon: icons_1.EditIcon, fontSize: 2, padding: 2, mode: "ghost", text: "Details", style: { flex: 1 }, onClick: edit })))));
};
exports.default = FilePreview;
