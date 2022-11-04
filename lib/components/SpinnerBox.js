"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ui_1 = require("@sanity/ui");
const react_1 = __importDefault(require("react"));
const SpinnerBox = () => (react_1.default.createElement(ui_1.Box, { style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '150px',
    } },
    react_1.default.createElement(ui_1.Spinner, null)));
exports.default = SpinnerBox;
