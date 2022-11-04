"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageBuilder = void 0;
const client_1 = __importDefault(require("part:@sanity/base/client"));
const image_url_1 = __importDefault(require("@sanity/image-url"));
const sanityClient = client_1.default.withConfig({
    apiVersion: '2021-03-25',
});
exports.default = sanityClient;
exports.imageBuilder = (0, image_url_1.default)(sanityClient);
