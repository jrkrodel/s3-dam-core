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
exports.CredentialsContext = void 0;
const react_1 = __importDefault(require("react"));
const ui_1 = require("@sanity/ui");
const sanityClient_1 = __importDefault(require("../../scripts/sanityClient"));
exports.CredentialsContext = react_1.default.createContext({
    saveCredentials: () => __awaiter(void 0, void 0, void 0, function* () { return false; }),
    status: 'loading',
});
const CredentialsProvider = (props) => {
    const { vendorConfig } = props;
    const cacheKey = `_${(vendorConfig === null || vendorConfig === void 0 ? void 0 : vendorConfig.id) || 'external'}DamSavedCredentials`;
    const documentId = `${vendorConfig.id}.credentials`;
    const toast = (0, ui_1.useToast)();
    const [credentials, setCredentials] = react_1.default.useState();
    const [status, setStatus] = react_1.default.useState('loading');
    function saveCredentials(newCredentials) {
        return __awaiter(this, void 0, void 0, function* () {
            ;
            window[cacheKey] = undefined;
            // If one credential is missing in newCredentials, error out
            if (vendorConfig.credentialsFields.some((field) => !(field.name in newCredentials))) {
                toast.push({
                    title: 'Missing credentials',
                    status: 'error',
                });
                return false;
            }
            try {
                yield sanityClient_1.default.createOrReplace(Object.assign({ _id: documentId, _type: documentId }, newCredentials));
                toast.push({
                    title: 'Credentials successfully saved!',
                    status: 'success',
                });
                setCredentials(newCredentials);
                setStatus("success");
                return true;
            }
            catch (error) {
                toast.push({
                    title: "Couldn't create credentials",
                    status: 'error',
                });
                return false;
            }
        });
    }
    react_1.default.useEffect(() => {
        if ((credentials === null || credentials === void 0 ? void 0 : credentials.apiKey) && (credentials === null || credentials === void 0 ? void 0 : credentials.storageBucket)) {
            ;
            window[cacheKey] = credentials;
            setStatus('success');
        }
    }, [credentials]);
    react_1.default.useEffect(() => {
        // Credentials stored in the window object to spare extra API calls
        const savedCredentials = window[cacheKey];
        if (savedCredentials &&
            vendorConfig.credentialsFields.every((field) => field.name in savedCredentials)) {
            setCredentials(savedCredentials);
            setStatus("success");
            return;
        }
        sanityClient_1.default
            .fetch(`*[_id == "${documentId}"][0]`)
            .then((doc) => {
            if (!doc) {
                setStatus('missingCredentials');
                return;
            }
            setCredentials(doc);
            setStatus("success");
        })
            .catch(() => setStatus('missingCredentials'));
    }, [vendorConfig]);
    return (react_1.default.createElement(exports.CredentialsContext.Provider, { value: { credentials, saveCredentials, status } }, props.children));
};
exports.default = CredentialsProvider;
