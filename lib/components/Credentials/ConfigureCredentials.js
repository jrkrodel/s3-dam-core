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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const icons_1 = require("@sanity/icons");
const ui_1 = require("@sanity/ui");
const default_1 = __importDefault(require("part:@sanity/components/formfields/default"));
const validation_1 = require("@sanity/validation");
const schema_1 = __importDefault(require("@sanity/schema"));
const react_1 = __importDefault(require("react"));
const CredentialsProvider_1 = require("./CredentialsProvider");
const ConfigureCredentials = (props) => {
    var _a;
    const { saveCredentials, credentials } = react_1.default.useContext(CredentialsProvider_1.CredentialsContext);
    const [isLoading, setIsLoading] = react_1.default.useState(false);
    const [markers, setMarkers] = react_1.default.useState([]);
    // Form values:
    const [formValues, setFormValues] = react_1.default.useState({});
    function submitCredentials(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            setIsLoading(true);
            const success = yield saveCredentials(formValues);
            setIsLoading(false);
            if (props.onCredentialsSaved) {
                props.onCredentialsSaved(success);
            }
        });
    }
    react_1.default.useEffect(() => {
        if (credentials) {
            setFormValues(credentials);
        }
    }, []);
    function resolveFieldHandler(field) {
        return (e) => {
            e.preventDefault();
            setFormValues(Object.assign(Object.assign({}, formValues), { [field.name]: e.currentTarget.value !== "" ? e.currentTarget.value : undefined }));
        };
    }
    const schema = react_1.default.useMemo(() => new schema_1.default({
        name: 'vendorSchema',
        types: [
            {
                name: 'vendorCredentials',
                type: 'document',
                fields: props.vendorConfig.credentialsFields,
            },
        ],
    }), [props.vendorConfig.credentialsFields]);
    function validateForm(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const newMarkers = yield (0, validation_1.validateDocument)(Object.assign(Object.assign({}, values), { _type: 'vendorCredentials' }), schema);
            setMarkers(newMarkers);
        });
    }
    react_1.default.useEffect(() => {
        if (Object.keys(formValues).length > 0) {
            validateForm(formValues);
        }
    }, [formValues]);
    return (react_1.default.createElement(ui_1.Card, { padding: 4, border: true },
        react_1.default.createElement(ui_1.Stack, { space: 3 },
            credentials ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Heading, { size: 3 }, "Edit settings"),
                react_1.default.createElement(ui_1.Text, { size: 2 }, "Be careful when editing these changes as they can be destructive."))) : (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Label, { size: 2, muted: true }, "External media library"),
                react_1.default.createElement(ui_1.Heading, { size: 3 }, "First time set-up"),
                react_1.default.createElement(ui_1.Text, { size: 2 }, "In order to communicate with external vendor to upload videos & audio, you\u2019ll have to set-up credentials below:"))),
            ((_a = props.vendorConfig.credentialsFields) === null || _a === void 0 ? void 0 : _a.length) ? (react_1.default.createElement("form", { style: { marginTop: '1.5rem' }, onSubmit: submitCredentials },
                react_1.default.createElement(ui_1.Stack, { space: 4 },
                    props.vendorConfig.credentialsFields.map((field) => (react_1.default.createElement(default_1.default, { label: field.title || field.name, description: field.description, markers: markers.filter((marker) => marker.path[0] === field.name), level: 0 },
                        react_1.default.createElement(ui_1.TextInput, { icon: field.icon, onInput: resolveFieldHandler(field), value: formValues[field.name] || '', type: field.type === 'number' ? 'number' : 'text', disabled: isLoading })))),
                    react_1.default.createElement(ui_1.Button, { text: (credentials === null || credentials === void 0 ? void 0 : credentials.apiKey)
                            ? 'Update credentials'
                            : 'Set-up credentials', icon: icons_1.UploadIcon, iconRight: isLoading && ui_1.Spinner, tone: "positive", fontSize: 2, padding: 3, type: "submit", disabled: isLoading ||
                            markers.filter((marker) => marker.level === 'error').length >
                                0 })))) : (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(ui_1.Heading, { size: 3 }, "Plugin configured incorrectly"),
                react_1.default.createElement(ui_1.Text, { size: 3 }, "Missing the credentialsField configuration property"))))));
};
exports.default = ConfigureCredentials;
