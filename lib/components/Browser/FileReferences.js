"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ui_1 = require("@sanity/ui");
const preview_1 = __importDefault(require("part:@sanity/base/preview"));
const router_1 = require("part:@sanity/base/router");
const schema_1 = __importDefault(require("part:@sanity/base/schema"));
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const SpinnerBox_1 = __importDefault(require("../SpinnerBox"));
const Container = (0, styled_components_1.default)(ui_1.Box) `
  * {
    color: ${(props) => props.theme.sanity.color.base.fg};
  }
  a {
    text-decoration: none;
  }
  h2 {
    font-size: ${(props) => props.theme.sanity.fonts.text.sizes[1]};
  }
`;
// Code adapted from Robin Pyon's sanity-plugin-media
// https://github.com/robinpyon/sanity-plugin-media/blob/master/src/components/DocumentList/index.tsx
// Thanks for paving the way, Robin!
const FileReferences = (props) => {
    var _a;
    if (!props.isLoaded) {
        return react_1.default.createElement(SpinnerBox_1.default, null);
    }
    if (!((_a = props.references) === null || _a === void 0 ? void 0 : _a.length)) {
        return (react_1.default.createElement(ui_1.Text, { size: 2, weight: "bold", muted: true, style: { marginTop: '1.5rem', textAlign: 'center' } }, "No documents are using this file"));
    }
    const draftIds = props.references.reduce((acc, doc) => doc._id.startsWith('drafts.') ? acc.concat(doc._id.slice(7)) : acc, []);
    const filteredDocuments = props.references.filter((doc) => !draftIds.includes(doc._id));
    return (react_1.default.createElement(Container, null, filteredDocuments === null || filteredDocuments === void 0 ? void 0 : filteredDocuments.map((doc) => {
        const schemaType = schema_1.default.get(doc._type);
        return (react_1.default.createElement(ui_1.Card, { key: doc._id, marginBottom: 2, padding: 2, radius: 2, shadow: 1, style: { overflow: 'hidden' } },
            react_1.default.createElement(ui_1.Box, null, schemaType ? (react_1.default.createElement(router_1.IntentLink, { intent: "edit", params: { id: doc._id }, key: doc._id },
                react_1.default.createElement(preview_1.default, { layout: "default", value: doc, type: schemaType }))) : (react_1.default.createElement(ui_1.Box, { padding: 2 },
                react_1.default.createElement(ui_1.Text, { size: 1 },
                    "A document of the unknown type ",
                    react_1.default.createElement("em", null, doc._type)))))));
    })));
};
exports.default = FileReferences;
