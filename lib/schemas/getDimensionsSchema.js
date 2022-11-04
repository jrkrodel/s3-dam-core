"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getDimensionsSchema = (vendorConfig) => ({
    name: `${vendorConfig.id}.dimensions`,
    title: `${vendorConfig.toolTitle || vendorConfig.id} dimensions`,
    type: 'object',
    fields: [
        {
            name: 'width',
            type: 'number',
        },
        {
            name: 'height',
            type: 'number',
        },
    ],
});
exports.default = getDimensionsSchema;
