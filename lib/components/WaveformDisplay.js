"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const color_1 = require("@sanity/color");
const WaveformDisplay = ({ waveformData, colorHue = 'magenta', style = {} }) => {
    if (!Array.isArray(waveformData)) {
        return null;
    }
    return (react_1.default.createElement("div", { style: Object.assign({ display: 'flex', alignItems: 'flex-end', width: '100%', gap: '1px', height: '3.5rem' }, style) }, waveformData.map((bar, i) => {
        var _a, _b;
        return (react_1.default.createElement("div", { key: `${bar}-${i}`, style: {
                flex: '1 0 1px',
                height: `${bar * 100}%`,
                background: ((_b = (_a = color_1.hues[colorHue]) === null || _a === void 0 ? void 0 : _a[400]) === null || _b === void 0 ? void 0 : _b.hex) || color_1.hues.magenta[400].hex,
            } }));
    })));
};
exports.default = WaveformDisplay;
