"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ui_1 = require("@sanity/ui");
const IconInfo = (props) => {
    const Icon = props.icon;
    return (react_1.default.createElement(ui_1.Inline, { space: 1 },
        react_1.default.createElement(Icon, null),
        react_1.default.createElement(ui_1.Text, { size: props.size || 1 }, props.text)));
};
exports.default = IconInfo;
