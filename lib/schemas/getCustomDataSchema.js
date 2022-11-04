"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomDataTypeKey = exports.getCustomDataFieldKey = void 0;
const getCustomDataFieldKey = (vendorConfig) => vendorConfig.customDataFieldName || vendorConfig.id.replace(/-/g, '_');
exports.getCustomDataFieldKey = getCustomDataFieldKey;
const getCustomDataTypeKey = (vendorConfig) => `${vendorConfig.id}.custom-data`;
exports.getCustomDataTypeKey = getCustomDataTypeKey;
const getCustomDataSchema = (vendorConfig, schemaConfig = {}) => ({
    name: (0, exports.getCustomDataTypeKey)(vendorConfig),
    title: `${vendorConfig.id}-exclusive fields`,
    options: { collapsible: true, collapsed: false },
    type: 'object',
    fields: ((schemaConfig === null || schemaConfig === void 0 ? void 0 : schemaConfig.customFields) || []).map((field) => {
        if (typeof field === 'string') {
            return {
                name: field,
                type: 'string',
            };
        }
        return field;
    }),
});
exports.default = getCustomDataSchema;
