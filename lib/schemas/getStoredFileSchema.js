"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getCustomDataSchema_1 = require("./getCustomDataSchema");
const getDimensionsSchema_1 = __importDefault(require("./getDimensionsSchema"));
const getStoredFileSchema = (vendorConfig, schemaConfig = {}) => ({
    name: `${vendorConfig.id}.storedFile`,
    title: schemaConfig.title || 'Media file hosted in external vendor',
    type: 'document',
    fieldsets: [
        {
            name: 'audio',
            title: 'Audio-exclusive fields',
            options: { collapsible: true, collapsed: true },
        },
        {
            name: 'video',
            title: 'Video-exclusive fields',
            options: { collapsible: true, collapsed: true },
        },
    ],
    fields: [
        {
            name: 'title',
            title: 'Title',
            description: 'Mainly for internal reference',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            description: 'Mainly for internal reference',
            type: 'text',
        },
        {
            name: 'fileName',
            title: 'File name',
            type: 'string',
        },
        {
            name: 'fileURL',
            title: 'File URL / download URL',
            type: 'string',
        },
        {
            name: 'contentType',
            title: 'Content Type',
            description: 'MIME type',
            type: 'string',
        },
        {
            name: 'duration',
            title: 'Duration (in seconds)',
            type: 'number',
        },
        {
            name: 'fileSize',
            title: 'Size in bytes',
            type: 'number',
        },
        {
            name: 'screenshot',
            title: 'Video screenshot',
            type: 'image',
            fieldset: 'video',
        },
        {
            name: 'dimensions',
            title: 'Dimensions',
            type: (0, getDimensionsSchema_1.default)(vendorConfig).name,
            fieldset: 'video',
        },
        {
            name: 'waveformData',
            title: 'Waveform peak data',
            description: 'Exclusive to audio files',
            fieldset: 'audio',
            type: 'array',
            of: [{ type: 'number' }],
        },
        ...((schemaConfig === null || schemaConfig === void 0 ? void 0 : schemaConfig.customFields)
            ? [
                {
                    name: (0, getCustomDataSchema_1.getCustomDataFieldKey)(vendorConfig),
                    title: `${vendorConfig.id}-exclusive fields`,
                    options: { collapsible: true, collapsed: false },
                    type: (0, getCustomDataSchema_1.getCustomDataTypeKey)(vendorConfig),
                },
            ]
            : []),
    ],
    preview: {
        select: {
            title: 'title',
            fileName: 'fileName',
            description: 'description',
            assetURL: 'assetURL',
            media: 'screenshot',
        },
        prepare: ({ media, assetURL, fileName, title, description }) => {
            return {
                title: title || fileName || 'Untitled file',
                subtitle: description || assetURL,
                media,
            };
        },
    },
});
exports.default = getStoredFileSchema;
