"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const AudioIcon = (props) => (react_1.default.createElement("svg", Object.assign({ stroke: "currentColor", fill: "none", strokeWidth: "2", viewBox: "0 0 24 24", strokeLinecap: "round", strokeLinejoin: "round", xmlns: "http://www.w3.org/2000/svg" }, props),
    react_1.default.createElement("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }),
    react_1.default.createElement("path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" })));
exports.default = AudioIcon;
