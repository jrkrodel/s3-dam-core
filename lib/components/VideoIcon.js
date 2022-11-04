"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const VideoIcon = (props) => (react_1.default.createElement("svg", Object.assign({ stroke: "currentColor", fill: "none", strokeWidth: "2", viewBox: "0 0 24 24", strokeLinecap: "round", strokeLinejoin: "round", xmlns: "http://www.w3.org/2000/svg" }, props),
    react_1.default.createElement("polygon", { points: "23 7 16 12 23 17 23 7" }),
    react_1.default.createElement("rect", { x: "1", y: "5", width: "15", height: "14", rx: "2", ry: "2" })));
exports.default = VideoIcon;
