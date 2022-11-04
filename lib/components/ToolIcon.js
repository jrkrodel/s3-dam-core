"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
/**
 * Icon of a monitor with a play button.
 * Credits: material design icons & react-icons
 */
const ToolIcon = () => (react_1.default.createElement("svg", { stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg" },
    react_1.default.createElement("path", { d: "M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12zm-5-6l-7 4V7z" })));
exports.default = ToolIcon;
