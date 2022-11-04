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
Object.defineProperty(exports, "__esModule", { value: true });
const filterData = (audioBuffer) => {
    // We only need to work with one channel of data
    const rawData = audioBuffer.getChannelData(0);
    // Number of samples we want to have in our final data set
    const samples = 70;
    // the number of samples in each subdivision
    const blockSize = Math.floor(rawData.length / samples);
    const filteredData = [];
    for (let i = 0; i < samples; i++) {
        let blockStart = blockSize * i; // the location of the first sample in the block
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
            sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
        }
        filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
    }
    return filteredData;
};
// Normalizes all data points on a 0-1 scale for proper visualization
const normalizeData = (filteredData) => {
    const multiplier = Math.pow(Math.max(...filteredData), -1);
    return filteredData.map((n) => Number((n * multiplier).toFixed(4)));
};
function getWaveformData(file) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!file) {
            return;
        }
        const audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
        const arrayBuffer = yield file.arrayBuffer();
        const audioBuffer = yield audioContext.decodeAudioData(arrayBuffer);
        const normalizedData = normalizeData(filterData(audioBuffer));
        return normalizedData;
    });
}
exports.default = getWaveformData;
